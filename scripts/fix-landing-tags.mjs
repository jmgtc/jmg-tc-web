import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const DEEPL_KEY = '943be21e-8058-4405-9252-5770fb9548c9:fx';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function translateText(text) {
  const r = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: { 'Authorization': `DeepL-Auth-Key ${DEEPL_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: [text], source_lang: 'ES', target_lang: 'EN-US' })
  });
  const d = await r.json();
  return d.translations[0].text;
}

async function main() {
  console.log('🔍 Auditing and fixing all landing page tag/badge/title EN fields...\n');

  // Define all the correct ES and EN values for every tag/badge/title in the landing
  const updates = {
    // hero
    'hero.tag': 'The Digital Guide // Innovation',  // already good, keeping clean ES label
    'hero.tag_en': 'The Digital Guide // Innovation',

    // services_highlights  
    'services_highlights.badge': 'Servicios',
    'services_highlights.tag': 'Sección 02 // Arquitectura Estratégica',
    'services_highlights.tag_en': 'Section 02 // Strategic Architecture',

    // podcast_section
    'podcast_section.badge': 'Podcasts',
    'podcast_section.tag': 'Descubrimiento // Crónicas Tech',
    'podcast_section.tag_en': 'Discovery // Tech Chronicles',

    // blog_highlights — THE MISSING ONE
    'blog_highlights.badge': 'Blog',
    'blog_highlights.tag': 'Blog // Artículos Recientes',
    'blog_highlights.tag_en': 'Blog // Recent Articles',

    // clients_section
    'clients_section.badge': 'Confianza',
    'clients_section.tag': 'Clientes // Éxito Compartido',
    'clients_section.tag_en': 'Partners // Shared Success',

    // consultoria_ia
    'consultoria_ia.badge': 'ConsultorIA',
    'consultoria_ia.tag': 'ConsultorIA // Automatización',
    'consultoria_ia.tag_en': 'Optimization // 24/7 Efficiency',

    // cta_section
    'cta_section.badge': 'Acción',
    'cta_section.tag': 'Futuro // Empieza Hoy',
    'cta_section.tag_en': 'Future // Start Today',
  };

  await client.patch('landingPage').set(updates).commit();
  console.log('✅ All landing page tags/badges updated successfully!\n');

  // Verify
  const doc = await client.fetch('*[_type == "landingPage"][0]');
  const sections = ['hero', 'services_highlights', 'podcast_section', 'blog_highlights', 'clients_section', 'consultoria_ia', 'cta_section'];
  console.log('📊 FINAL AUDIT:\n');
  for (const s of sections) {
    const sec = doc[s];
    if (sec) {
      const tagOk = sec.tag_en ? '✅' : '❌';
      const badgeOk = sec.badge_en ? '✅' : '⚠️';
      console.log(`${s}:`);
      console.log(`  ${badgeOk} badge EN: ${sec.badge_en || '(none)'}`);
      console.log(`  ${tagOk} tag ES : ${sec.tag}`);
      console.log(`  ${tagOk} tag EN : ${sec.tag_en || 'MISSING'}`);
    }
  }
}

main().catch(console.error);
