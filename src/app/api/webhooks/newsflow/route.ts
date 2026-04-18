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

    // --- PARSER DE FORMATO ---
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

    // Slug EXACTO al título
    const slug = generateSlug(title);

    // 1. Crear el objeto básico del post
    const newPost: any = {
      _type: 'post',
      title: title,
      slug: { _type: 'slug', current: slug },
      publishedAt: new Date().toISOString(),
      excerpt: excerpt || '',
      // Limitamos a 3 etiquetas
      tags: (Array.isArray(tags) ? tags : (tags ? tags.toString().split(',') : []))
            .map((t: string) => t.trim())
            .filter((t: string) => t !== '')
            .slice(0, 3),
      body: bodyBlocks,
    };

    // 1.5 Manejar Categorías (TOP 3)
    const catInput = Array.isArray(category) ? category : (category ? category.toString().split(',') : []);
    const catList = catInput.map((c: string) => c.trim()).filter((c: string) => c !== '').slice(0, 3);
    
    if (catList.length > 0) {
      body_en: bodyEn,
      categories: categoryRefs,
      mainImage: imageAsset ? { _type: 'image', asset: { _type: 'reference', _ref: imageAsset._id } } : undefined
    };

    const result = await sanity.create(newPost);

    return NextResponse.json({ 
      success: true, 
      id: result._id,
      url: `https://jmg-tc.com/blog/${slug}`,
      translated: true
    }, { headers: corsHeaders });

  } catch (error: any) {
    console.error('Error NewsFlow Webhook:', error);
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
}
