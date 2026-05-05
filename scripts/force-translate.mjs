
import { createClient } from '@sanity/client';
import fetch from 'node-fetch';

const SANITY_PROJECT_ID = 'mfth4gqi';
const SANITY_WRITE_TOKEN = 'skBlJNtcZMeJc15ksKU4vxdYvXFFi55m1LI1r3zoqx2Bnh6OVsi8bxQZMf7RMAh7e0Dwy8PCckuB9cZoHh9Y5B19K1Eged7WxjTHeQpv3Qn18h1JuVHav8oMN7txmT1liugK4cjHL5OQmg1VHmOQ8BDbhHKEa0xyjYxWEknfcjoi9zarLXgk';
const DEEPL_API_KEY = '943be21e-8058-4405-9252-5770fb9548c9:fx';

const sanity = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: 'production',
  token: SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function forceTranslate(docId) {
  console.log(`Starting forced translation for document: ${docId}...`);
  
  try {
    // 1. Fetch the document
    const doc = await sanity.getDocument(docId);
    if (!doc) {
      console.error('Error: Document not found.');
      return;
    }

    console.log(`Translating document type: ${doc._type}`);
    
    const baseUrl = DEEPL_API_KEY.endsWith(':fx') 
      ? 'https://api-free.deepl.com/v2/translate' 
      : 'https://api.deepl.com/v2/translate';

    const translateText = async (text, isHTML = false) => {
      if (!text?.trim()) return '';
      const res = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `DeepL-Auth-Key ${DEEPL_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: [text],
          target_lang: 'EN-US',
          tag_handling: isHTML ? 'html' : undefined
        })
      });
      const data = await res.json();
      return data.translations[0].text;
    };

    const translatePortableText = async (blocks) => {
      if (!Array.isArray(blocks)) return blocks;
      const translated = [];
      for (const block of blocks) {
        if (block._type === 'block' && Array.isArray(block.children)) {
          const children = [];
          for (const child of block.children) {
            if (child._type === 'span' && child.text?.trim()) {
              const containsHtml = /<[a-z][\s\S]*>/i.test(child.text);
              children.push({ ...child, text: await translateText(child.text, containsHtml) });
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
    };

    const updates = {};
    if (doc.title) updates.title_en = await translateText(doc.title);
    if (doc.excerpt) updates.excerpt_en = await translateText(doc.excerpt);
    if (Array.isArray(doc.body)) updates.body_en = await translatePortableText(doc.body);

    if (Object.keys(updates).length > 0) {
      await sanity.patch(docId).set(updates).commit();
      console.log('✅ Translation applied to Sanity:', Object.keys(updates));
    } else {
      console.log('No translatable fields found.');
    }

  } catch (err) {
    console.error('Error during forced translation:', err);
  }
}

const docId = process.argv[2];
if (!docId) {
  console.log('Usage: node force-translate.mjs <DOC_ID>');
} else {
  forceTranslate(docId);
}
