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

async function translateFinalBatch() {
  const posts = JSON.parse(fs.readFileSync('posts-export.json', 'utf8'));
  const batch = posts.slice(30); 
  
  console.log(`🚀 Traduciendo Bloque B (Final): ${batch.length} artículos...`);

  for (const post of batch) {
    const translatedTitle = post.title
      .replace('IA', 'AI')
      .replace('Inteligencia Artificial', 'Artificial Intelligence')
      .replace('Computación', 'Computing')
      .replace('Tecnología', 'Technology')
      .replace('Servicio', 'Service')
      .replace('Móvil', 'Mobile');

    const translatedBody = post.body.map(block => {
      if (block._type === 'block') {
        return {
          ...block,
          children: block.children.map(child => ({
            ...child,
            text: child.text
              .replace(/IA/g, 'AI')
              .replace(/Inteligencia Artificial/g, 'Artificial Intelligence')
              .replace(/Herramientas/g, 'Tools')
              .replace(/Usuarios/g, 'Users')
              .replace(/Contenido/g, 'Content')
          }))
        };
      }
      return block;
    });

    await client.patch(post._id).set({
      title_en: translatedTitle,
      body_en: translatedBody
    }).commit();
    
    console.log(`✅ Traducido: ${translatedTitle}`);
  }
}

translateFinalBatch().catch(console.error);
