import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

const client = createClient({
  projectId: 'mfth4gqi',
  dataset: 'production',
  useCdn: false,
  token: 'skBlJNtcZMeJc15ksKU4vxdYvXFFi55m1LI1r3zoqx2Bnh6OVsi8bxQZMf7RMAh7e0Dwy8PCckuB9cZoHh9Y5B19K1Eged7WxjTHeQpv3Qn18h1JuVHav8oMN7txmT1liugK4cjHL5OQmg1VHmOQ8BDbhHKEa0xyjYxWEknfcjoi9zarLXgk',
  apiVersion: '2023-01-01',
});

const posts = JSON.parse(fs.readFileSync('./contents/blog/posts.json', 'utf8'));

async function migrate() {
  console.log(`Iniciando migración de ${posts.length} artículos...`);

  for (const post of posts) {
    try {
      const doc = {
        _type: 'post',
        _id: `wp-${post.id}`,
        title: post.title,
        slug: {
          _type: 'slug',
          current: post.slug,
        },
        publishedAt: post.date,
        // Almacenamos el contenido HTML en un bloque simple por ahora
        // Lo ideal es convertirlo a Portable Text, pero para la demo inicial
        // esto nos permite ver los datos en el panel.
        body: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: post.content.replace(/<[^>]*>?/gm, '') }],
          }
        ]
      };

      await client.createOrReplace(doc);
      console.log(`✅ Migrado: ${post.title}`);
    } catch (err) {
      console.error(`❌ Error en post ${post.id}:`, err.message);
    }
  }

  console.log('Migración completada.');
}

migrate();
