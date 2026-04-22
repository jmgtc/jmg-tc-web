import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

const DEEPL_KEY = process.env.DEEPL_API_KEY;

async function translate(text) {
  if (!text?.trim()) return '';
  console.log(`Translating: ${text.substring(0, 50)}...`);
  try {
    const res = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: [text],
        source_lang: 'ES',
        target_lang: 'EN-US',
      }),
    });
    const data = await res.json();
    return data.translations?.[0]?.text ?? text;
  } catch (err) {
    console.error('DeepL Error:', err);
    return text;
  }
}

async function translatePortableText(blocks) {
  if (!Array.isArray(blocks)) return blocks;
  const translated = [];
  for (const block of blocks) {
    if (block._type === 'block' && Array.isArray(block.children)) {
      const children = [];
      for (const child of block.children) {
        if (child._type === 'span' && child.text?.trim()) {
          children.push({ ...child, text: await translate(child.text) });
        } else {
          children.push(child);
        }
      }
      translated.push({ ...block, children });
    } else {
      translated.push(block);
    }
  }
  return translated;
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function run() {
  const query = `*[_type == "post"] | order(_createdAt desc)[0...2]`;
  const posts = await sanity.fetch(query);
  
  for (const post of posts) {
    console.log(`Processing: ${post.title}`);
    const updates = {};
    
    if (post.title) {
      updates.title_en = await translate(post.title);
      await sleep(300);
    }
    
    if (post.excerpt) {
      updates.excerpt_en = await translate(post.excerpt);
      await sleep(300);
    }
    
    if (Array.isArray(post.body)) {
      updates.body_en = await translatePortableText(post.body);
    }
    
    if (Object.keys(updates).length > 0) {
      await sanity.patch(post._id).set(updates).commit();
      console.log(`✅ Translated: ${post.title}`);
    }
  }
}

run().catch(console.error);
