import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function cloneAndTranslate() {
  const posts = JSON.parse(fs.readFileSync('posts-export.json', 'utf8'));
  console.log(`Procesando clonación estructural de ${posts.length} artículos...`);

  for (const post of posts) {
    // Si ya tiene un body con contenido real (no solo el placeholder), 
    // podrías querer saltarlo, pero como pides que sean copias exactas
    // vamos a asegurar que el body_en exista con la misma estructura.
    
    const bodyEn = post.body.map(block => {
      if (block._type === 'block') {
        return {
          ...block,
          children: block.children.map(child => ({
            ...child,
            // Aquí es donde iría la traducción. 
            // Por ahora mantenemos el texto original para no perder el formato
            // mientras preparamos la traducción masiva.
          }))
        };
      }
      return block;
    });

    await client.patch(post._id).set({
      title_en: post.title_en || post.title, // Fallback al título original si no hay traducción
      body_en: bodyEn
    }).commit();
    
    console.log(`✅ Estructura clonada para: ${post.title}`);
  }
}

cloneAndTranslate().catch(console.error);
