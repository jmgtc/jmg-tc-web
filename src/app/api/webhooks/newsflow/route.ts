import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
// Función interna para generar slugs sin dependencias externas
function generateSlug(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // Normaliza caracteres especiales (acentos)
    .replace(/[\u0300-\u036f]/g, '') // Elimina los acentos
    .trim()
    .replace(/\s+/g, '-') // Reemplaza espacios por -
    .replace(/[^\w-]+/g, '') // Elimina caracteres no permitidos
    .replace(/--+/g, '-'); // Elimina guiones dobles
}

export async function POST(req: NextRequest) {
  try {
    const bodyData = await req.json();
    
    // Extraemos los datos que envía JMG-TC NewsFlow AI
    const { title, content, excerpt, imageUrl } = bodyData;

    if (!title || !content) {
      return NextResponse.json({ error: 'Faltan campos obligatorios (title/content)' }, { status: 400 });
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

    // 2. Si hay imagen, intentamos descargarla y subirla a Sanity
    if (imageUrl && imageUrl.startsWith('http')) {
      try {
        const imageRes = await fetch(imageUrl);
        const arrayBuffer = await imageRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        const asset = await sanity.assets.upload('image', buffer, {
          filename: `newsflow-${slug}.png`,
        });
        
        newPost.mainImage = {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        };
      } catch (imgErr) {
        console.error('[NewsFlow] Error subiendo imagen:', imgErr);
        // Continuamos sin imagen si falla el upload
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
    });

  } catch (error: any) {
    console.error('Error NewsFlow Webhook:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
