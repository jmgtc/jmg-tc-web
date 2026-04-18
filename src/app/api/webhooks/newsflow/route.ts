import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
// Función interna para generar slugs sin dependencias externas
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

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

// Manejador para pre-flight requests (CORS)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(req: NextRequest) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  try {
    const bodyData = await req.json();
    
    // Extraemos los datos que envía JMG-TC NewsFlow AI
    const { title, content, excerpt, tags, category } = bodyData;
    const imgUrl = bodyData.imageUrl || bodyData.image_url || bodyData.image || bodyData.mainImage;

    if (!title || !content) {
      return NextResponse.json({ error: 'Faltan campos obligatorios (title/content)' }, { status: 400, headers: corsHeaders });
    }

    // --- PARSER DE FORMATO (Markdown a PortableText) ---
    // Dividimos por párrafos para crear bloques individuales
    const paragraphs = content.split(/\n\n+/);
    const bodyBlocks = paragraphs.map((p: string) => {
      const isShort = p.length < 100;
      const hasBoldStart = p.trim().startsWith('**') && p.trim().endsWith('**');
      
      const block: any = {
        _type: 'block',
        _key: Math.random().toString(36).substring(2, 11),
        style: (isShort || hasBoldStart) ? 'h3' : 'normal',
        markDefs: [],
        children: []
      };

      // Procesar negritas básicas (**texto**)
      const parts = p.split(/(\*\*.*?\*\*)/g);
      block.children = parts.map(part => {
        const isBold = part.startsWith('**') && part.endsWith('**');
        return {
          _type: 'span',
          _key: Math.random().toString(36).substring(2, 11),
          text: isBold ? part.replace(/\*\*/g, '') : part,
          marks: isBold ? ['strong'] : []
        };
      }).filter(span => span.text !== '');

      if (block.children.length === 0) {
        block.children = [{ _type: 'span', _key: Math.random().toString(36).substring(2, 11), text: p, marks: [] }];
      }

      return block;
    });

    // Generar slug único
    const uniqueId = Math.random().toString(36).substring(2, 7);
    const slug = generateSlug(title) + '-' + uniqueId;

    // 1. Crear el objeto básico del post
    const newPost: any = {
      _type: 'post',
      title: title,
      slug: { _type: 'slug', current: slug },
      publishedAt: new Date().toISOString(),
      excerpt: excerpt || '',
      tags: Array.isArray(tags) ? tags : (tags ? [tags.toString().replace(/\s/g, '').split(',')] : []),
      body: bodyBlocks,
    };

    // 1.5 Manejar Categoría (Referencia)
    let confirmedCategory = 'Sin categoría';
    if (category) {
      try {
        const existingCat = await sanity.fetch(`*[_type == "category" && title match $title][0]`, { title: category });
        let categoryId;
        if (existingCat) {
          categoryId = existingCat._id;
          confirmedCategory = existingCat.title;
        } else {
          const newCat = await sanity.create({
            _type: 'category',
            title: category,
            slug: { _type: 'slug', current: generateSlug(category) }
          });
          categoryId = newCat._id;
          confirmedCategory = category + ' (Nueva)';
        }
        newPost.categories = [{ _type: 'reference', _ref: categoryId, _key: Math.random().toString(36).substring(2, 11) }];
      } catch (catErr) {
        console.error('[NewsFlow] Error categoría:', catErr);
      }
    }

    // 2. Si hay imagen, intentamos subirla
    let hasImage = false;
    if (imgUrl && typeof imgUrl === 'string' && imgUrl.startsWith('http')) {
      try {
        const imageRes = await fetch(imgUrl);
        if (imageRes.ok) {
          const arrayBuffer = await imageRes.arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const asset = await sanity.assets.upload('image', buffer, { filename: `nf-${slug}.png` });
          newPost.mainImage = { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
          hasImage = true;
        }
      } catch (imgErr) {
        console.error('[NewsFlow] ❌ Error subiendo imagen:', imgErr);
      }
    }

    // 3. Crear el documento en Sanity
    const result = await sanity.create(newPost);

    return NextResponse.json({ 
      success: true, 
      id: result._id,
      url: `https://jmg-tc.com/blog/${slug}`,
      debug: {
        categoria: confirmedCategory,
        tags_recibidos: newPost.tags.length,
        imagen: hasImage ? 'OK' : 'No encontrada',
        formato: 'Párrafos y Negritas procesados'
      }
    }, { headers: corsHeaders });

  } catch (error: any) {
    console.error('Error NewsFlow Webhook:', error);
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
}
