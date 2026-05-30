import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

// Configuración de Sanity
const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

// Función interna para generar slugs
function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

// Función para traducir con DeepL
async function translateWithDeepL(text: string, isHTML = false) {
  try {
    const response = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        text: text,
        target_lang: 'EN',
        tag_handling: isHTML ? 'html' : '',
      }),
    });

    const data = await response.json();
    return data.translations[0].text;
  } catch (error) {
    console.error('Error in DeepL translation:', error);
    return null;
  }
}

// Manejador para pre-flight requests (CORS)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-secret, x-api-key',
    },
  });
}

export async function POST(req: NextRequest) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-admin-secret, x-api-key',
  };

  // 1. Validar x-admin-secret o x-api-key
  const adminSecret = req.headers.get('x-admin-secret') || req.headers.get('x-api-key');
  const hasSecret = !!adminSecret;
  const isCorrect = adminSecret === process.env.ADMIN_API_SECRET;

  console.log('[newsflow] Auth verification:', {
    endpoint: '/api/webhooks/newsflow',
    method: 'POST',
    hasXAdminSecret: !!req.headers.get('x-admin-secret'),
    hasXApiKey: !!req.headers.get('x-api-key'),
    hasSecretSent: hasSecret,
    isEnvSecretConfigured: !!process.env.ADMIN_API_SECRET,
    isAuthed: isCorrect
  });

  if (!adminSecret || adminSecret !== process.env.ADMIN_API_SECRET) {
    console.warn('[newsflow] Unauthorized request - Invalid or missing secret');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401, headers: corsHeaders });
  }

  try {
    const bodyData = await req.json();
    const { title, content, excerpt, tags, category } = bodyData;
    const imgUrl = bodyData.imageUrl || bodyData.image_url || bodyData.image || bodyData.mainImage;

    if (!title || !content) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400, headers: corsHeaders });
    }

    // --- TRADUCCIÓN AUTOMÁTICA (DeepL) ---
    const rawTitleEn = await translateWithDeepL(title);
    const titleEn = (rawTitleEn && rawTitleEn !== title) ? rawTitleEn : null;

    const rawBodyEnText = await translateWithDeepL(content, true); // Pasar true para manejar HTML
    const bodyEnText = (rawBodyEnText && rawBodyEnText !== content) ? rawBodyEnText : null;

    // --- PARSER DE FORMATO (Markdown a PortableText) ---
    const paragraphs = content.split(/\n\n+/);
    const bodyBlocks = paragraphs.map((p: string) => ({
      _type: 'block',
      _key: Math.random().toString(36).substring(2, 11),
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: Math.random().toString(36).substring(2, 11), text: p, marks: [] }]
    }));

    // PortableText para Inglés
    const bodyEnBlocks = bodyEnText ? (bodyEnText.split(/\n\n+/).map((p: string) => ({
      _type: 'block',
      _key: Math.random().toString(36).substring(2, 11),
      style: 'normal',
      markDefs: [],
      children: [{ _type: 'span', _key: Math.random().toString(36).substring(2, 11), text: p, marks: [] }]
    }))) : [];

    // --- MANEJO DE CATEGORÍAS (Find or Create) ---
    const catInput = Array.isArray(category) ? category : (category ? [category] : []);
    const categoryRefs = [];
    for (const cName of catInput.slice(0, 3)) {
      const existing = await sanity.fetch(`*[_type == "category" && title == $title][0]`, { title: cName });
      if (existing) {
        categoryRefs.push({ _type: 'reference', _ref: existing._id, _key: Math.random().toString(36).substring(2, 11) });
      } else {
        const created = await sanity.create({ _type: 'category', title: cName, slug: { _type: 'slug', current: generateSlug(cName) } });
        categoryRefs.push({ _type: 'reference', _ref: created._id, _key: Math.random().toString(36).substring(2, 11) });
      }
    }

    // --- SUBIDA DE IMAGEN ---
    let mainImage = undefined;
    if (imgUrl) {
      try {
        const imageRes = await fetch(imgUrl);
        const buffer = await imageRes.arrayBuffer();
        const asset = await sanity.assets.upload('image', Buffer.from(buffer), { filename: `newsflow-${Date.now()}` });
        mainImage = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
      } catch (e) {
        console.error('Error uploading image:', e);
      }
    }

    // --- DEDUPLICACIÓN POR SLUG ---
    const slugValue = generateSlug(title);
    const existing = await sanity.fetch(
      `*[_type == "post" && slug.current == $slug][0]._id`,
      { slug: slugValue }
    );
    if (existing) {
      console.log(`[newsflow] Duplicate slug detected: "${slugValue}" — skipping creation`);
      return NextResponse.json(
        { status: 'duplicate_skipped', slug: slugValue, existingId: existing },
        { status: 200, headers: corsHeaders }
      );
    }

    // --- CREACIÓN DEL DOCUMENTO ---
    const postDoc = {
      _type: 'post',
      title: title,
      title_en: titleEn, // No guardar español si falla
      slug: { _type: 'slug', current: slugValue },
      publishedAt: new Date().toISOString(),
      excerpt: excerpt || '',
      body: bodyBlocks,
      body_en: bodyEnText ? bodyEnBlocks : null, // Solo guardar si hay traducción real
      tags: (Array.isArray(tags) ? tags : [tags]).filter(Boolean).slice(0, 3),
      categories: categoryRefs,
      mainImage: mainImage,
    };

    const result = await sanity.create(postDoc);

    return NextResponse.json({ 
      success: true, 
      id: result._id,
      url: `https://jmg-tc.com/blog/${slugValue}`,
      translated: !!titleEn 
    }, { headers: corsHeaders });

  } catch (error: any) {
    console.error('Error NewsFlow Webhook:', error);
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
}
