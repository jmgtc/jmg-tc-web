import { createClient } from '@sanity/client';
import { GoogleGenerativeAI } from '@google/generative-ai';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_WRITE_TOKEN = process.env.SANITY_WRITE_TOKEN;
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const DEEPL_KEY = process.env.DEEPL_API_KEY || process.env.DEEPL_KEY;

if (!SANITY_PROJECT_ID || !SANITY_WRITE_TOKEN) {
  console.error('Missing Sanity configuration in .env.local');
  process.exit(1);
}

const sanity = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: 'production',
  token: SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

const genAI = GEMINI_KEY ? new GoogleGenerativeAI(GEMINI_KEY) : null;

// ─── Translator Logic ──────────────────────────────────────────────────────

async function translateWithDeepL(text: string, isHTML = false): Promise<string | null> {
  if (!DEEPL_KEY || !text?.trim()) return null;

  const endpoint = DEEPL_KEY.endsWith(':fx') 
    ? 'https://api-free.deepl.com/v2/translate' 
    : 'https://api.deepl.com/v2/translate';

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${DEEPL_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: [text],
        source_lang: 'ES',
        target_lang: 'EN-US',
        tag_handling: isHTML ? 'html' : undefined,
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    const result = data.translations?.[0]?.text;
    
    // Si DeepL devuelve lo mismo, lo consideramos fallo de traducción
    if (result === text.trim()) return null;
    return result;
  } catch {
    return null;
  }
}

async function translateWithGemini(text: string, isHTML = false): Promise<string | null> {
  if (!genAI || !text?.trim()) return null;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = isHTML 
      ? `Translate this HTML from Spanish to English. Preserve tags. ONLY the translation: \n\n${text}`
      : `Translate this text from Spanish to English. ONLY the translation: \n\n${text}`;

    const result = await model.generateContent(prompt);
    const translated = result.response.text().trim();
    
    if (translated === text.trim()) return null;
    return translated;
  } catch {
    return null;
  }
}

async function translate(text: string, isHTML = false): Promise<string | null> {
  // Intentar DeepL
  let result = await translateWithDeepL(text, isHTML);
  if (result) return result;

  // Fallback Gemini
  console.log(`  [Fallback] DeepL failed for "${text.substring(0, 30)}...", trying Gemini...`);
  result = await translateWithGemini(text, isHTML);
  return result;
}

async function translatePortableText(blocks: any[]): Promise<any[]> {
  if (!Array.isArray(blocks)) return blocks;
  const translated = [];
  for (const block of blocks) {
    if (block._type === 'block' && Array.isArray(block.children)) {
      const children = [];
      for (const child of block.children) {
        if (child._type === 'span' && child.text?.trim()) {
          const containsHtml = /<[a-z][\s\S]*>/i.test(child.text);
          const t = await translate(child.text, containsHtml);
          children.push({ ...child, text: t || child.text }); // Si falla, mantenemos original para no romper bloque, pero esto es un riesgo
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

// ─── Main Execution ────────────────────────────────────────────────────────

async function runRepair() {
  console.log('--- STARTING CONTROLLED TRANSLATION REPAIR ---');

  // Query posts that need repair according to user conditions
  // 1. title_en missing or identical
  // 2. body_en missing or identical (simplified as missing/empty for the query)
  const query = `*[_type == "post" && (
    !defined(title_en) || title_en == "" || title_en == title ||
    !defined(body_en) || count(body_en) == 0
  )] {
    _id, title, title_en, excerpt, excerpt_en, body, body_en
  }`;

  const posts = await sanity.fetch(query);
  console.log(`Found ${posts.length} posts potentially needing repair.`);

  let repairedCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const post of posts) {
    console.log(`\nProcessing Post: ${post._id} ("${post.title}")`);
    
    const needsTitleRepair = !post.title_en || post.title_en === "" || post.title_en === post.title;
    // Para el body, comparamos si body_en existe o si es sospechoso
    const needsBodyRepair = !post.body_en || post.body_en.length === 0;

    if (!needsTitleRepair && !needsBodyRepair) {
      console.log('  [Skip] Title and Body already look translated.');
      skippedCount++;
      continue;
    }

    try {
      const updates: any = {};

      if (needsTitleRepair) {
        const tTitle = await translate(post.title);
        if (tTitle && tTitle !== post.title) {
          updates.title_en = tTitle;
          console.log(`  [Repair] Title -> ${tTitle}`);
        } else {
          console.warn('  [Failed] Could not translate Title.');
        }
      }

      if (post.excerpt && (!post.excerpt_en || post.excerpt_en === post.excerpt)) {
        const tExcerpt = await translate(post.excerpt);
        if (tExcerpt) updates.excerpt_en = tExcerpt;
      }

      if (needsBodyRepair && post.body) {
        updates.body_en = await translatePortableText(post.body);
        console.log('  [Repair] Body translated.');
      }

      if (Object.keys(updates).length > 0) {
        await sanity.patch(post._id).set(updates).commit();
        console.log(`  [Success] Post ${post._id} updated.`);
        repairedCount++;
      } else {
        console.log(`  [No Change] No valid translations generated for ${post._id}`);
        skippedCount++;
      }
    } catch (err: any) {
      console.error(`  [Error] Post ${post._id}: ${err.message}`);
      errorCount++;
    }
  }

  console.log('\n--- REPAIR SUMMARY ---');
  console.log(`Revised: ${posts.length}`);
  console.log(`Repaired: ${repairedCount}`);
  console.log(`Skipped/No Change: ${skippedCount}`);
  console.log(`Errors: ${errorCount}`);
}

runRepair().catch(console.error);
