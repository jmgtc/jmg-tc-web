import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import crypto from 'crypto';
import { GoogleGenerativeAI } from '@google/generative-ai';


// ─── Sanity Client (server-side write access) ─────────────────────────────
const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

const DEEPL_KEY = process.env.DEEPL_API_KEY || process.env.DEEPL_KEY;

if (!DEEPL_KEY) {
  console.error('[auto-translate] CRITICAL: Neither DEEPL_API_KEY nor DEEPL_KEY is defined!');
}

const GEMINI_KEY = process.env.GEMINI_API_KEY;
const genAI = GEMINI_KEY ? new GoogleGenerativeAI(GEMINI_KEY) : null;


// ─── DeepL translator with Retries ─────────────────────────────────────────
async function translate(text: string, isHTML = false, retries = 3): Promise<string> {
  if (!text?.trim()) return '';
  
  // Auto-detect endpoint based on key suffix
  const endpoint = DEEPL_KEY.endsWith(':fx') 
    ? 'https://api-free.deepl.com/v2/translate' 
    : 'https://api.deepl.com/v2/translate';

  for (let attempt = 1; attempt <= retries; attempt++) {
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
      
      if (res.status === 429 || res.status >= 500) {
        // Rate limit or server error, wait and retry
        console.warn(`[DeepL] Attempt ${attempt} failed with status ${res.status}. Retrying...`);
        await sleep(1000 * attempt);
        continue;
      }

      if (res.status === 456) {
        console.warn('[DeepL] Quota exceeded (456). Falling back to Gemini...');
        return await translateWithGemini(text, isHTML);
      }

      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(`DeepL API Error (${res.status}): ${errorData}`);
      }
      
      const data = await res.json();
      return data.translations?.[0]?.text ?? text;
    } catch (err: any) {
      console.error(`[DeepL Exception] Attempt ${attempt}:`, err.message);
      
      // If we are out of quota, don't even retry DeepL, go straight to Gemini
      if (err.message.includes('456')) {
        return await translateWithGemini(text, isHTML);
      }

      if (attempt === retries) {
        console.warn('[auto-translate] DeepL failed completely. Trying Gemini as final resort...');
        return await translateWithGemini(text, isHTML);
      }
      await sleep(1000 * attempt);
    }
  }
  return text;
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
      ? `You are a professional translator. Translate the following HTML content from Spanish to English. 
         Preserve all HTML tags and structure exactly. 
         CRITICAL: You MUST translate the content even if it contains many technical terms or brand names. 
         Example: 'y' MUST become 'and'. 
         Content: \n\n${text}`
      : `You are a professional translator. Translate the following text from Spanish to English. 
         Return ONLY the translated text, no explanations. 
         CRITICAL: Always translate to English even if the source looks similar. 
         Example: 'y' MUST become 'and'. 
         Text: \n\n${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const translated = response.text().trim();

    // Final safety check: if it still returned the same, try one more time with even more pressure
    if (translated === text.trim() && text.length > 5) {
       console.warn('[Gemini] Lazy response detected in webhook, retrying...');
       const retryResult = await model.generateContent(`TRANSLATE THIS TO ENGLISH NOW, DO NOT RETURN THE ORIGINAL: ${text}`);
       return retryResult.response.text().trim();
    }

    return translated;
  } catch (err: any) {
    console.error('[Gemini Exception]', err.message);
    return text; // Return original if everything fails
  }
}

// ─── PortableText translator (preserves structure, translates text spans) ─
async function translatePortableText(blocks: any[]): Promise<any[]> {
  if (!Array.isArray(blocks)) return blocks;
  const translated = [];
  for (const block of blocks) {
    if (block._type === 'block' && Array.isArray(block.children)) {
      const children = [];
      for (const child of block.children) {
        if (child._type === 'span' && child.text?.trim()) {
          // Detectamos si el texto parece contener HTML
          const containsHtml = /<[a-z][\s\S]*>/i.test(child.text);
          children.push({ ...child, text: await translate(child.text, containsHtml) });
        } else {
          children.push(child);
        }
      }
      translated.push({ ...block, children });
    } else {
      // images, embeds, etc. — pass through unchanged
      translated.push(block);
    }
  }
  return translated;
}

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

// ─── Per-document-type translation logic ──────────────────────────────────
// Helper to decide if a field needs translation
async function translateIfNeeded(source: string, currentTranslation: string | undefined): Promise<string | null> {
  if (!source?.trim()) return null;
  // Only translate if English version is missing, empty, or identical to Spanish
  if (!currentTranslation || currentTranslation.trim() === '' || currentTranslation.trim() === source.trim()) {
    return await translate(source);
  }
  return null; // Skip to save quota
}

async function translateDocument(docType: string, doc: any): Promise<Record<string, any>> {
  const updates: Record<string, any> = {};

  if (docType === 'post') {
    const title_en = await translateIfNeeded(doc.title, doc.title_en);
    if (title_en) updates.title_en = title_en;
    
    const excerpt_en = await translateIfNeeded(doc.excerpt, doc.excerpt_en);
    if (excerpt_en) updates.excerpt_en = excerpt_en;

    if (Array.isArray(doc.body) && (!doc.body_en || doc.body_en.length === 0)) {
      updates.body_en = await translatePortableText(doc.body);
    }
  }

  else if (docType === 'landingPage') {
    const h = doc.hero;
    const hero_badge = await translateIfNeeded(h?.badge, h?.badge_en);
    if (hero_badge) updates['hero.badge_en'] = hero_badge;

    const hero_tag = await translateIfNeeded(h?.tag, h?.tag_en);
    if (hero_tag) updates['hero.tag_en'] = hero_tag;

    const hero_title = await translateIfNeeded(h?.title, h?.title_en);
    if (hero_title) updates['hero.title_en'] = hero_title;

    const hero_highlight = await translateIfNeeded(h?.title_highlight, h?.title_highlight_en);
    if (hero_highlight) updates['hero.title_highlight_en'] = hero_highlight;

    const hero_subtitle = await translateIfNeeded(h?.subtitle, h?.subtitle_en);
    if (hero_subtitle) updates['hero.subtitle_en'] = hero_subtitle;

    const hero_cta = await translateIfNeeded(h?.cta, h?.cta_en);
    if (hero_cta) updates['hero.cta_en'] = hero_cta;

    // Services Highlights
    const sh = doc.services_highlights;
    const sh_tag = await translateIfNeeded(sh?.tag, sh?.tag_en);
    if (sh_tag) updates['services_highlights.tag_en'] = sh_tag;

    const sh_title = await translateIfNeeded(sh?.title, sh?.title_en);
    if (sh_title) updates['services_highlights.title_en'] = sh_title;

    const sh_desc = await translateIfNeeded(sh?.description, sh?.description_en);
    if (sh_desc) updates['services_highlights.description_en'] = sh_desc;

    // Podcast
    const pod = doc.podcast_section;
    const pod_tag = await translateIfNeeded(pod?.tag, pod?.tag_en);
    if (pod_tag) updates['podcast_section.tag_en'] = pod_tag;

    const pod_title = await translateIfNeeded(pod?.title, pod?.title_en);
    if (pod_title) updates['podcast_section.title_en'] = pod_title;

    const pod_desc = await translateIfNeeded(pod?.description, pod?.description_en);
    if (pod_desc) updates['podcast_section.description_en'] = pod_desc;

    // Blog Highlights
    const blog = doc.blog_highlights;
    const blog_tag = await translateIfNeeded(blog?.tag, blog?.tag_en);
    if (blog_tag) updates['blog_highlights.tag_en'] = blog_tag;

    const blog_title = await translateIfNeeded(blog?.title, blog?.title_en);
    if (blog_title) updates['blog_highlights.title_en'] = blog_title;

    const blog_viewall = await translateIfNeeded(blog?.view_all, blog?.view_all_en);
    if (blog_viewall) updates['blog_highlights.view_all_en'] = blog_viewall;

    // Clients
    const cl = doc.clients_section;
    const cl_tag = await translateIfNeeded(cl?.tag, cl?.tag_en);
    if (cl_tag) updates['clients_section.tag_en'] = cl_tag;

    const cl_title = await translateIfNeeded(cl?.title, cl?.title_en);
    if (cl_title) updates['clients_section.title_en'] = cl_title;

    // ConsultorIA
    const ia = doc.consultoria_ia;
    const ia_tag = await translateIfNeeded(ia?.tag, ia?.tag_en);
    if (ia_tag) updates['consultoria_ia.tag_en'] = ia_tag;

    const ia_title = await translateIfNeeded(ia?.title, ia?.title_en);
    if (ia_title) updates['consultoria_ia.title_en'] = ia_title;

    const ia_desc = await translateIfNeeded(ia?.description, ia?.description_en);
    if (ia_desc) updates['consultoria_ia.description_en'] = ia_desc;

    // CTA
    const cta = doc.cta_section;
    const cta_tag = await translateIfNeeded(cta?.tag, cta?.tag_en);
    if (cta_tag) updates['cta_section.tag_en'] = cta_tag;

    const cta_title = await translateIfNeeded(cta?.title, cta?.title_en);
    if (cta_title) updates['cta_section.title_en'] = cta_title;

    const cta_btn = await translateIfNeeded(cta?.button_text, cta?.button_text_en);
    if (cta_btn) updates['cta_section.button_text_en'] = cta_btn;

    // About (on Landing)
    const ab = doc.about;
    const ab_tag = await translateIfNeeded(ab?.tag, ab?.tag_en);
    if (ab_tag) updates['about.tag_en'] = ab_tag;

    const ab_title = await translateIfNeeded(ab?.title_main, ab?.title_main_en);
    if (ab_title) updates['about.title_main_en'] = ab_title;

    const ab_accent = await translateIfNeeded(ab?.title_accent, ab?.title_accent_en);
    if (ab_accent) updates['about.title_accent_en'] = ab_accent;

    const ab_intro = await translateIfNeeded(ab?.intro, ab?.intro_en);
    if (ab_intro) updates['about.intro_en'] = ab_intro;
  }

  else if (docType === 'servicesPage') {
    const hdr = doc.header;
    const hdr_tag = await translateIfNeeded(hdr?.tag, hdr?.tag_en);
    if (hdr_tag) updates['header.tag_en'] = hdr_tag;

    const hdr_badge = await translateIfNeeded(hdr?.badge, hdr?.badge_en);
    if (hdr_badge) updates['header.badge_en'] = hdr_badge;

    const hdr_title = await translateIfNeeded(hdr?.title, hdr?.title_en);
    if (hdr_title) updates['header.title_en'] = hdr_title;

    const hdr_desc = await translateIfNeeded(hdr?.description, hdr?.description_en);
    if (hdr_desc) updates['header.description_en'] = hdr_desc;
  }

  else if (docType === 'serviceItem') {
    const s_title = await translateIfNeeded(doc.title, doc.title_en);
    if (s_title) updates.title_en = s_title;

    const s_desc = await translateIfNeeded(doc.description, doc.description_en);
    if (s_desc) updates.description_en = s_desc;

    const s_cta = await translateIfNeeded(doc.cta, doc.cta_en);
    if (s_cta) updates.cta_en = s_cta;

    const s_price = await translateIfNeeded(doc.priceLabel, doc.priceLabel_en);
    if (s_price) updates.priceLabel_en = s_price;
  }

  else if (docType === 'aboutPage') {
    const a_tag = await translateIfNeeded(doc.tag, doc.tag_en);
    if (a_tag) updates.tag_en = a_tag;

    const a_title = await translateIfNeeded(doc.title, doc.title_en);
    if (a_title) updates.title_en = a_title;

    const a_desc = await translateIfNeeded(doc.description, doc.description_en);
    if (a_desc) updates.description_en = a_desc;

    if (Array.isArray(doc.body) && (!doc.body_en || doc.body_en.length === 0)) {
      updates.body_en = await translatePortableText(doc.body);
    }
  }

  return updates;
}

// ─── Webhook signature verification ───────────────────────────────────────
async function verifySignature(req: NextRequest, body: string): Promise<boolean> {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) return true; // skip if not set (dev mode)
  const signature = req.headers.get('sanity-webhook-signature') ?? '';
  const ts = signature.split(',').find(p => p.startsWith('t='))?.split('=')[1];
  const v1 = signature.split(',').find(p => p.startsWith('v1='))?.split('=')[1];
  if (!ts || !v1) return false;
  const mac = crypto.createHmac('sha256', secret).update(`${ts}.${body}`).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(mac), Buffer.from(v1));
}

// ─── Main handler ──────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const rawBody = await req.text();

  // Verify signature
  const valid = await verifySignature(req, rawBody);
  if (!valid) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let payload: any;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const { _id, _type } = payload;
  if (!_id || !_type) {
    return NextResponse.json({ error: 'Missing _id or _type' }, { status: 400 });
  }

  // Skip draft documents (Sanity sends both draft and published events)
  if (_id.startsWith('drafts.')) {
    return NextResponse.json({ skipped: 'draft document' });
  }

  console.log(`[auto-translate] Document saved: ${_type}/${_id}`);

  // Translate based on document type
  const updates = await translateDocument(_type, payload);

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ message: 'No translatable fields found', type: _type });
  }

  // Write translations back to Sanity
  try {
    console.log(`[auto-translate] Committing updates to Sanity for ${_id}...`, Object.keys(updates));
    await sanity.patch(_id).set(updates).commit();
    console.log(`[auto-translate] ✅ Success for ${_id}`);
  } catch (err: any) {
    console.error(`[auto-translate] ❌ Sanity Commit Failed:`, err.message);
    return NextResponse.json({ error: 'Sanity Commit Failed', details: err.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
    documentId: _id,
    documentType: _type,
    fieldsTranslated: Object.keys(updates),
  });
}
