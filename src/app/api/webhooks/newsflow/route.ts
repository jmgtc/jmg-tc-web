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
    // Intentamos pillar la imagen de varios campos posibles
    const imgUrl = bodyData.imageUrl || bodyData.image_url || bodyData.image || bodyData.mainImage;

    if (!title || !content) {
      return NextResponse.json({ error: 'Faltan campos obligatorios (title/content)' }, { status: 400, headers: corsHeaders });
    }

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
      tags: Array.isArray(tags) ? tags : (tags ? [tags] : []), // Soporta array o string único
      // Convertimos el contenido a PortableText (formato Sanity)
      body: [
        {
          _type: 'block',
          _key: Math.random().toString(36).substring(2, 11),
          children: [
            { 
              _type: 'span', 
              _key: Math.random().toString(36).substring(2, 11),
              text: content 
            }
          ],
          markDefs: [],
          style: 'normal',
        },
      ],
    };

    // 1.5 Manejar Categoría (Referencia)
    if (category) {
      try {
        // Buscamos si la categoría existe por título
        const existingCat = await sanity.fetch(`*[_type == "category" && title match $title][0]`, { title: category });
        
        let categoryId;
        if (existingCat) {
          categoryId = existingCat._id;
        } else {
          // Si no existe, la creamos (opcional, pero recomendado para NewsFlow)
          const newCat = await sanity.create({
            _type: 'category',
            title: category,
            slug: { _type: 'slug', current: generateSlug(category) }
          });
          categoryId = newCat._id;
        }
        
        newPost.categories = [{
          _type: 'reference',
          _ref: categoryId,
          _key: Math.random().toString(36).substring(2, 11)
        }];
      } catch (catErr) {
        console.error('[NewsFlow] Error procesando categoría:', catErr);
      }
    }

    // 2. Si hay imagen, intentamos subirla
    if (imgUrl && typeof imgUrl === 'string' && imgUrl.startsWith('http')) {
      try {
        console.log('[NewsFlow] Intentando procesar imagen de:', imgUrl);
        const imageRes = await fetch(imgUrl);
        if (!imageRes.ok) throw new Error(`Fallo al descargar imagen: ${imageRes.statusText}`);
        
        const arrayBuffer = await imageRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        const asset = await sanity.assets.upload('image', buffer, {
          filename: `newsflow-${slug}.png`,
          contentType: imageRes.headers.get('content-type') || 'image/png'
        });
        
        newPost.mainImage = {
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id },
        };
        console.log('[NewsFlow] ✅ Imagen subida con éxito:', asset._id);
      } catch (imgErr) {
        console.error('[NewsFlow] ❌ Error subiendo imagen:', imgErr);
      }
    }

    // 3. Crear el documento en Sanity
    const result = await sanity.create(newPost);

    console.log(`[NewsFlow] ✅ Artículo publicado con éxito: ${result._id}`);

    return NextResponse.json({ 
      success: true, 
      id: result._id,
      slug: slug,
      url: `https://jmg-tc.com/blog/${slug}`,
      status: 'publicado'
    }, { headers: corsHeaders });

  } catch (error: any) {
    console.error('Error NewsFlow Webhook:', error);
    return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
  }
}
