const { createClient } = require('@sanity/client');
const fetch = require('node-fetch');

const sanity = createClient({
  projectId: 'mfth4gqi',
  dataset: 'production',
  token: 'skBlJNtcZMeJc15ksKU4vxdYvXFFi55m1LI1r3zoqx2Bnh6OVsi8bxQZMf7RMAh7e0Dwy8PCckuB9cZoHh9Y5B19K1Eged7WxjTHeQpv3Qn18h1JuVHav8oMN7txmT1liugK4cjHL5OQmg1VHmOQ8BDbhHKEa0xyjYxWEknfcjoi9zarLXgk',
  useCdn: false,
  apiVersion: '2023-05-03',
});

const deeplKey = '943be21e-8058-4405-9252-5770fb9548c9:fx';

async function translate(text) {
  if (!text) return '';
  const params = new URLSearchParams();
  params.append('text', text);
  params.append('target_lang', 'EN');
  
  const res = await fetch('https://api-free.deepl.com/v2/translate', {
    method: 'POST',
    headers: { 'Authorization': `DeepL-Auth-Key ${deeplKey}` },
    body: params
  });
  const data = await res.json();
  return data.translations[0].text;
}

async function run() {
  const post = await sanity.fetch('*[_type == "post"] | order(publishedAt desc) [0]');
  if (!post) {
    console.log('No se encontró ningún post.');
    return;
  }
  
  console.log(`Traduciendo: ${post.title}`);
  
  const titleEn = await translate(post.title);
  
  // Extraer texto del body (PortableText)
  let bodyEnBlocks = [];
  if (post.body && Array.isArray(post.body)) {
    for (const block of post.body) {
      if (block._type === 'block' && block.children) {
        const translatedChildren = await Promise.all(block.children.map(async (child) => {
          if (child.text) {
            return { ...child, text: await translate(child.text) };
          }
          return child;
        }));
        bodyEnBlocks.push({ ...block, children: translatedChildren });
      } else {
        bodyEnBlocks.push(block);
      }
    }
  }

  await sanity.patch(post._id)
    .set({
      title_en: titleEn,
      body_en: bodyEnBlocks
    })
    .commit();
    
  console.log('¡Traducción completada con éxito!');
}

run().catch(console.error);
