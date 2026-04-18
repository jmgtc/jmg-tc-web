import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';
import crypto from 'crypto';

// ─── Sanity Client (server-side write access) ─────────────────────────────
const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

const DEEPL_KEY = process.env.DEEPL_API_KEY!;

// ─── DeepL translator ─────────────────────────────────────────────────────
async function translate(text: string): Promise<string> {
  if (!text?.trim()) return '';
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
          children.push({ ...child, text: await translate(child.text) });
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
async function translateDocument(docType: string, doc: any): Promise<Record<string, any>> {
  const updates: Record<string, any> = {};

  if (docType === 'post') {
    // Blog post: title + full body PortableText
    if (doc.title) updates.title_en = await translate(doc.title);
    await sleep(300);
    if (doc.excerpt) { updates.excerpt_en = await translate(doc.excerpt); await sleep(300); }
    if (Array.isArray(doc.body)) {
      updates.body_en = await translatePortableText(doc.body);
    }
  }

  else if (docType === 'landingPage') {
    // ── Hero ──
    const h = doc.hero;
    if (h?.badge)           { updates['hero.badge_en']           = await translate(h.badge);           await sleep(300); }
    if (h?.tag)             { updates['hero.tag_en']             = await translate(h.tag);             await sleep(300); }
    if (h?.title)           { updates['hero.title_en']           = await translate(h.title);           await sleep(300); }
    if (h?.title_highlight) { updates['hero.title_highlight_en'] = await translate(h.title_highlight); await sleep(300); }
    if (h?.subtitle)        { updates['hero.subtitle_en']        = await translate(h.subtitle);        await sleep(300); }
    if (h?.cta)             { updates['hero.cta_en']             = await translate(h.cta);             await sleep(300); }

    // ── Services Highlights ──
    const sh = doc.services_highlights;
    if (sh?.tag)         { updates['services_highlights.tag_en']         = await translate(sh.tag);         await sleep(300); }
    if (sh?.title)       { updates['services_highlights.title_en']       = await translate(sh.title);       await sleep(300); }
    if (sh?.description) { updates['services_highlights.description_en'] = await translate(sh.description); await sleep(300); }

    // ── Podcast ──
    const pod = doc.podcast_section;
    if (pod?.tag)         { updates['podcast_section.tag_en']         = await translate(pod.tag);         await sleep(300); }
    if (pod?.title)       { updates['podcast_section.title_en']       = await translate(pod.title);       await sleep(300); }
    if (pod?.description) { updates['podcast_section.description_en'] = await translate(pod.description); await sleep(300); }

    // ── Blog Highlights ──
    const blog = doc.blog_highlights;
    if (blog?.tag)      { updates['blog_highlights.tag_en']      = await translate(blog.tag);      await sleep(300); }
    if (blog?.title)    { updates['blog_highlights.title_en']    = await translate(blog.title);    await sleep(300); }
    if (blog?.view_all) { updates['blog_highlights.view_all_en'] = await translate(blog.view_all); await sleep(300); }

    // ── Clients ──
    const cl = doc.clients_section;
    if (cl?.tag)   { updates['clients_section.tag_en']   = await translate(cl.tag);   await sleep(300); }
    if (cl?.title) { updates['clients_section.title_en'] = await translate(cl.title); await sleep(300); }

    // ── ConsultorIA ──
    const ia = doc.consultoria_ia;
    if (ia?.tag)         { updates['consultoria_ia.tag_en']         = await translate(ia.tag);         await sleep(300); }
    if (ia?.title)       { updates['consultoria_ia.title_en']       = await translate(ia.title);       await sleep(300); }
    if (ia?.description) { updates['consultoria_ia.description_en'] = await translate(ia.description); await sleep(300); }

    // ── CTA ──
    const cta = doc.cta_section;
    if (cta?.tag)         { updates['cta_section.tag_en']         = await translate(cta.tag);         await sleep(300); }
    if (cta?.title)       { updates['cta_section.title_en']       = await translate(cta.title);       await sleep(300); }
    if (cta?.button_text) { updates['cta_section.button_text_en'] = await translate(cta.button_text); await sleep(300); }

    // ── About ──
    const ab = doc.about;
    if (ab?.tag)          { updates['about.tag_en']          = await translate(ab.tag);          await sleep(300); }
    if (ab?.title_main)   { updates['about.title_main_en']   = await translate(ab.title_main);   await sleep(300); }
    if (ab?.title_accent) { updates['about.title_accent_en'] = await translate(ab.title_accent); await sleep(300); }
    if (ab?.intro)        { updates['about.intro_en']        = await translate(ab.intro);        await sleep(300); }
    if (ab?.profile?.tag)  { updates['about.profile.tag_en']  = await translate(ab.profile.tag);  await sleep(300); }
    if (ab?.profile?.role) { updates['about.profile.role_en'] = await translate(ab.profile.role); await sleep(300); }
    if (ab?.profile?.bio)  { updates['about.profile.bio_en']  = await translate(ab.profile.bio);  await sleep(300); }
  }

  else if (docType === 'servicesPage') {
    const hdr = doc.header;
    if (hdr?.tag)         { updates['header.tag_en']         = await translate(hdr.tag);         await sleep(300); }
    if (hdr?.badge)       { updates['header.badge_en']       = await translate(hdr.badge);       await sleep(300); }
    if (hdr?.title)       { updates['header.title_en']       = await translate(hdr.title);       await sleep(300); }
    if (hdr?.description) { updates['header.description_en'] = await translate(hdr.description); await sleep(300); }
  }

  else if (docType === 'serviceItem') {
    if (doc.title)       { updates.title_en       = await translate(doc.title);       await sleep(300); }
    if (doc.description) { updates.description_en = await translate(doc.description); await sleep(300); }
    if (doc.cta)         { updates.cta_en         = await translate(doc.cta);         await sleep(300); }
    if (doc.priceLabel)  { updates.priceLabel_en  = await translate(doc.priceLabel);  await sleep(300); }
    if (Array.isArray(doc.features) && doc.features.length) {
      updates.features_en = [];
      for (const f of doc.features) {
        updates.features_en.push(await translate(f));
        await sleep(200);
      }
    }
  }

  else if (docType === 'aboutPage') {
    if (doc.tag)          { updates.tag_en         = await translate(doc.tag);          await sleep(300); }
    if (doc.title)        { updates.title_en        = await translate(doc.title);        await sleep(300); }
    if (doc.description)  { updates.description_en  = await translate(doc.description);  await sleep(300); }
    if (Array.isArray(doc.body)) {
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
  await sanity.patch(_id).set(updates).commit();

  console.log(`[auto-translate] ✅ ${Object.keys(updates).length} fields translated for ${_id}`);

  return NextResponse.json({
    success: true,
    documentId: _id,
    documentType: _type,
    fieldsTranslated: Object.keys(updates),
  });
}
