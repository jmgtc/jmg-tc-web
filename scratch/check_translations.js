const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'mfth4gqi',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-01-01',
  token: process.env.SANITY_API_TOKEN // Necesito un token si voy a editar, pero para leer no.
});

async function checkTranslation() {
  const query = `*[_type == "post"] | order(_createdAt desc)[0...2] {
    _id,
    title,
    title_en,
    body,
    body_en
  }`;
  const posts = await client.fetch(query);
  posts.forEach((post, i) => {
    console.log(`--- Post ${i} ---`);
    console.log('ID:', post._id);
    console.log('Title ES:', post.title);
    console.log('Title EN:', post.title_en);
    console.log('Has Body EN:', !!post.body_en && (Array.isArray(post.body_en) ? post.body_en.length > 0 : !!post.body_en));
  });
}

checkTranslation().catch(console.error);
