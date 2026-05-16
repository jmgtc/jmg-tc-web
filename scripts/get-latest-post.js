const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'mfth4gqi',
  dataset: 'production',
  useCdn: true, // CDN para evitar el error 402
  apiVersion: '2023-05-03',
});

async function getLatest() {
  const query = '*[_type == "post"] | order(publishedAt desc)[0] { _id, "slug": slug.current, title, title_en, body, body_en, publishedAt }';
  const post = await client.fetch(query);
  console.log('LATEST_POST_DATA');
  console.log(JSON.stringify(post, null, 2));
}

getLatest().catch(console.error);
