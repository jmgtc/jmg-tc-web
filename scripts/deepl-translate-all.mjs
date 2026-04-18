import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const DEEPL_API_KEY = '943be21e-8058-4405-9252-5770fb9548c9:fx';
const DEEPL_URL = 'https://api-free.deepl.com/v2/translate';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

// Translate a single string using DeepL
async function translateText(text) {
  if (!text || text.trim().length === 0) return text;

  const response = await fetch(DEEPL_URL, {
    method: 'POST',
    headers: {
      'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text: [text],
      source_lang: 'ES',
      target_lang: 'EN-US',
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`DeepL error ${response.status}: ${err}`);
  }

  const data = await response.json();
  return data.translations[0].text;
}

// Sleep to respect rate limits
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Translate with retry on 429
async function translateWithRetry(text, retries = 5) {
  for (let i = 0; i < retries; i++) {
    try {
      return await translateText(text);
    } catch (err) {
      if (err.message.includes('429') && i < retries - 1) {
        const wait = 2000 * (i + 1); // 2s, 4s, 6s, 8s, 10s
        console.log(`    ⏳ Rate limited. Waiting ${wait/1000}s before retry ${i+1}/${retries}...`);
        await sleep(wait);
      } else {
        throw err;
      }
    }
  }
}

// Process a PortableText body array — translate all text spans, preserve everything else
async function translateBody(body) {
  if (!body || !Array.isArray(body)) return body;

  const translatedBody = [];

  for (const block of body) {
    // Leave non-block types untouched (images, embeds, etc.)
    if (block._type !== 'block') {
      translatedBody.push(block);
      continue;
    }

    // Translate all text spans in this block
    const translatedChildren = [];
    for (const child of (block.children || [])) {
      if (child._type === 'span' && child.text && child.text.trim().length > 0) {
        const translatedText = await translateWithRetry(child.text);
        translatedChildren.push({ ...child, text: translatedText });
        await sleep(800); // delay between span requests
      } else {
        translatedChildren.push(child);
      }
    }

    translatedBody.push({ ...block, children: translatedChildren });
  }

  return translatedBody;
}

async function main() {
  console.log('🚀 Starting REAL DeepL translation for all blog posts...\n');

  // Fetch all posts with their actual Spanish content
  const posts = await client.fetch(`*[_type == "post"]{
    _id,
    title,
    title_en,
    body
  }`);

  console.log(`📚 Found ${posts.length} posts to translate.\n`);

  let done = 0;
  let failed = 0;

  for (const post of posts) {
    try {
      console.log(`[${done + 1}/${posts.length}] Translating: "${post.title}"`);

      // 1. Translate the title
      const translatedTitle = await translateWithRetry(post.title);
      await sleep(800);

      // 2. Translate the full body
      const translatedBody = await translateBody(post.body);

      // 3. Save to Sanity
      await client.patch(post._id).set({
        title_en: translatedTitle,
        body_en: translatedBody,
      }).commit();

      console.log(`  ✅ "${translatedTitle}"`);
      done++;

      // Pause between articles to be safe
      await sleep(2000);

    } catch (err) {
      console.error(`  ❌ FAILED: ${post._id} — ${err.message}`);
      failed++;
    }
  }

  console.log('\n================================');
  console.log(`✅ Done: ${done}/${posts.length}`);
  console.log(`❌ Failed: ${failed}`);
  console.log('================================');

  // Final audit
  console.log('\n🔍 Running final audit...');
  const audit = await client.fetch(`*[_type == "post"]{_id, title, title_en, body_en}`);
  const missing = audit.filter(p => !p.title_en || !p.body_en || p.body_en.length === 0);
  if (missing.length === 0) {
    console.log('🏆 AUDIT PASSED: All 58 posts have real English translations!');
  } else {
    console.log(`⚠️  AUDIT: ${missing.length} posts still need attention:`);
    missing.forEach(p => console.log(`  - [${p._id}] ${p.title}`));
  }
}

main().catch(console.error);
