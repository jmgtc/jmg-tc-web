import { createClient } from '@sanity/client';

const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

const DEEPL_KEY = process.env.DEEPL_API_KEY!;

async function translate(text: string, isHTML = false): Promise<string> {
  if (!text?.trim()) return '';
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
        tag_handling: isHTML ? 'html' : undefined,
      }),
    });
    const data = await res.json();
    return data.translations?.[0]?.text ?? text;
  } catch (err) {
    console.error('[Auto-Repair DeepL Error]', err);
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

    const repairs = [];
    for (const doc of untranslated) {
      const updates: any = {};
      if (doc.title) updates.title_en = await translate(doc.title);
      if (doc.excerpt) updates.excerpt_en = await translate(doc.excerpt);
      if (Array.isArray(doc.body)) updates.body_en = await translatePortableText(doc.body);

      await sanity.patch(doc._id).set(updates).commit();
      repairs.push(doc._id);
      console.log(`[auto-repair] Successfully repaired document: ${doc._id}`);
    }

    return new Response(JSON.stringify({ success: true, repairedCount: repairs.length, ids: repairs }), { status: 200 });

  } catch (error: any) {
    console.error('[auto-repair] Failed:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
