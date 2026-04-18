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

async function translate(text) {
  if (!text || text.trim() === '') return null;
  const r = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: { 'Authorization': `DeepL-Auth-Key ${DEEPL_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: [text], source_lang: 'ES', target_lang: 'EN-US' })
  });
  const d = await r.json();
  return d.translations[0].text;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  console.log('📖 Reading YOUR Spanish values from Sanity...\n');

  const doc = await client.fetch('*[_type == "landingPage"][0]');
  const updates = {};

  // ─── Helper: translate a field only if ES exists ──────────────────────────
  async function translateField(path, esValue) {
    if (!esValue) return;
    console.log(`  Translating [${path}]: "${esValue}"`);
    const en = await translate(esValue);
    console.log(`  → EN: "${en}"`);
    updates[path] = en;
    await sleep(600);
  }

  // ─── HERO ─────────────────────────────────────────────────────────────────
  console.log('\n── hero ──');
  await translateField('hero.badge_en',          doc.hero?.badge);
  await translateField('hero.tag_en',            doc.hero?.tag);
  await translateField('hero.title_en',          doc.hero?.title);
  await translateField('hero.title_highlight_en',doc.hero?.title_highlight);
  await translateField('hero.subtitle_en',       doc.hero?.subtitle);
  await translateField('hero.cta_en',            doc.hero?.cta);

  // ─── SERVICES HIGHLIGHTS ──────────────────────────────────────────────────
  console.log('\n── services_highlights ──');
  await translateField('services_highlights.badge_en',       doc.services_highlights?.badge);
  await translateField('services_highlights.tag_en',         doc.services_highlights?.tag);
  await translateField('services_highlights.title_en',       doc.services_highlights?.title);
  await translateField('services_highlights.description_en', doc.services_highlights?.description);

  // ─── PODCAST SECTION ──────────────────────────────────────────────────────
  console.log('\n── podcast_section ──');
  await translateField('podcast_section.badge_en',       doc.podcast_section?.badge);
  await translateField('podcast_section.tag_en',         doc.podcast_section?.tag);
  await translateField('podcast_section.title_en',       doc.podcast_section?.title);
  await translateField('podcast_section.description_en', doc.podcast_section?.description);

  // ─── BLOG HIGHLIGHTS ──────────────────────────────────────────────────────
  console.log('\n── blog_highlights ──');
  await translateField('blog_highlights.badge_en',    doc.blog_highlights?.badge);
  await translateField('blog_highlights.tag_en',      doc.blog_highlights?.tag);
  await translateField('blog_highlights.title_en',    doc.blog_highlights?.title);
  await translateField('blog_highlights.view_all_en', doc.blog_highlights?.view_all);

  // ─── CLIENTS SECTION ──────────────────────────────────────────────────────
  console.log('\n── clients_section ──');
  await translateField('clients_section.badge_en', doc.clients_section?.badge);
  await translateField('clients_section.tag_en',   doc.clients_section?.tag);
  await translateField('clients_section.title_en', doc.clients_section?.title);

  // ─── CONSULTORIA IA ───────────────────────────────────────────────────────
  console.log('\n── consultoria_ia ──');
  await translateField('consultoria_ia.badge_en',       doc.consultoria_ia?.badge);
  await translateField('consultoria_ia.tag_en',         doc.consultoria_ia?.tag);
  await translateField('consultoria_ia.title_en',       doc.consultoria_ia?.title);
  await translateField('consultoria_ia.highlight_en',   doc.consultoria_ia?.highlight);
  await translateField('consultoria_ia.description_en', doc.consultoria_ia?.description);

  // Phases
  if (doc.consultoria_ia?.phases) {
    for (const phase of doc.consultoria_ia.phases) {
      await translateField(`consultoria_ia.phases[_key=="${phase._key}"].label_en`, phase.label);
      await translateField(`consultoria_ia.phases[_key=="${phase._key}"].desc_en`,  phase.desc);
    }
  }

  // ─── CTA SECTION ──────────────────────────────────────────────────────────
  console.log('\n── cta_section ──');
  await translateField('cta_section.badge_en',       doc.cta_section?.badge);
  await translateField('cta_section.tag_en',         doc.cta_section?.tag);
  await translateField('cta_section.title_en',       doc.cta_section?.title);
  await translateField('cta_section.button_text_en', doc.cta_section?.button_text);

  // ─── ABOUT / NOSOTROS ─────────────────────────────────────────────────────
  console.log('\n── about ──');
  await translateField('about.tag_en',         doc.about?.tag);
  await translateField('about.title_main_en',  doc.about?.title_main);
  await translateField('about.title_accent_en',doc.about?.title_accent);
  await translateField('about.intro_en',       doc.about?.intro);

  // Profile
  await translateField('about.profile.tag_en',  doc.about?.profile?.tag);
  await translateField('about.profile.role_en', doc.about?.profile?.role);
  await translateField('about.profile.bio_en',  doc.about?.profile?.bio);

  // Values  
  if (doc.about?.values) {
    await translateField('about.values.tag_en',   doc.about.values.tag);
    await translateField('about.values.title_en', doc.about.values.title);
    if (doc.about.values.items) {
      for (const item of doc.about.values.items) {
        await translateField(`about.values.items[_key=="${item._key}"].label_en`, item.label);
        await translateField(`about.values.items[_key=="${item._key}"].desc_en`,  item.desc);
      }
    }
  }

  // ─── WRITE ALL TO SANITY ──────────────────────────────────────────────────
  console.log(`\n💾 Writing ${Object.keys(updates).length} translated fields to Sanity...`);
  await client.patch('landingPage').set(updates).commit();
  console.log('🏆 DONE — All _en fields updated from YOUR Spanish originals. Spanish untouched.');
}

main().catch(console.error);
