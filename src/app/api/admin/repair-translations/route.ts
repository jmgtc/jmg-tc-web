import { createClient } from '@sanity/client';
import { GoogleGenerativeAI } from '@google/generative-ai';


const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

const DEEPL_KEY = process.env.DEEPL_API_KEY || process.env.DEEPL_KEY;
const GEMINI_KEY = process.env.GEMINI_API_KEY;
const genAI = GEMINI_KEY ? new GoogleGenerativeAI(GEMINI_KEY) : null;


async function translate(text: string, isHTML = false): Promise<string> {
  if (!text?.trim()) return '';
  if (!DEEPL_KEY) throw new Error('DEEPL_API_KEY is missing');

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

    const data = await res.json();
    const result = data.translations?.[0]?.text;
    
    // If DeepL returns same text or empty, try Gemini
    if (!result || result.trim() === text.trim()) {
      console.warn('[Auto-Repair] DeepL returned identical or empty text. Trying Gemini...');
      return await translateWithGemini(text, isHTML);
    }

    return result;
  } catch (err: any) {
    console.error('[Auto-Repair DeepL Error]', err.message);
    console.warn('[Auto-Repair] Falling back to Gemini as safety net...');
    return await translateWithGemini(text, isHTML);
  }
}

// ─── Gemini Fallback Translator ───────────────────────────────────────────
async function translateWithGemini(text: string, isHTML = false): Promise<string> {
  if (!genAI) {
    console.error('[Gemini] Missing GEMINI_API_KEY. Cannot fallback.');
    return text;
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = isHTML 
      ? `Translate the following HTML content from Spanish to English. Preserve all HTML tags and structure exactly: \n\n${text}`
      : `Translate the following text from Spanish to English. Return only the translated text: \n\n${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text().trim();
  } catch (err: any) {
    console.error('[Gemini Exception Repair]', err.message);
    return text;
  }
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
          children.push({ ...child, text: await translate(child.text, containsHtml) });
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

export async function GET() {
  console.log('[auto-repair] Starting translation health check...');
  
  try {
    // 1. Find untranslated posts (missing, empty, or same as Spanish)
    const untranslated = await sanity.fetch(`*[_type == "post" && (!defined(title_en) || title_en == "" || title_en == title)] {
      _id, title, excerpt, body
    }`);

    console.log(`[auto-repair] Found ${untranslated.length} untranslated posts:`, untranslated.map((p: any) => p._id));

    if (untranslated.length === 0) {
      return new Response(JSON.stringify({ message: 'All posts are already translated' }), { status: 200 });
    }

    console.log(`[auto-repair] Found ${untranslated.length} untranslated posts. Repairing...`);

    const results = [];
    const debug = [];
    const errors = [];

    for (const post of untranslated) {
      try {
        const translatedTitle = await translate(post.title);
        
        // Check if translation actually happened
        if (translatedTitle === post.title && post.title.length > 5) {
          throw new Error(`DeepL returned the same text. Possible Auth/Config issue. Key present: ${!!DEEPL_KEY}`);
        }

        const updates: any = { title_en: translatedTitle };
        if (post.excerpt) updates.excerpt_en = await translate(post.excerpt);
        if (Array.isArray(post.body)) {
          updates.body_en = await translatePortableText(post.body);
        }

        await sanity.patch(post._id).set(updates).commit();
        results.push(post._id);
        debug.push({ id: post._id, original: post.title, translated: translatedTitle });
      } catch (err: any) {
        errors.push({ id: post._id, error: err.message });
      }
    }

    return new Response(JSON.stringify({ 
      success: true, 
      repairedCount: results.length, 
      ids: results,
      debug,
      errors: errors.length > 0 ? errors : undefined
    }), { status: 200 });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
