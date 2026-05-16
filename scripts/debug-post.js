const { createClient } = require('next-sanity');

const client = createClient({
  projectId: 'mfth4gqi',
  dataset: 'production',
  apiVersion: '2024-03-11',
  useCdn: true
});

async function debug() {
  const slug = 'google-y-las-pymes-como-la-inteligencia-artificial-impulsa-el-exito-local';
  const query = '*[_type == "post" && slug.current == "' + slug + '"][0] { body }';
  
  const post = await client.fetch(query);
  console.log('JSON_BODY_START');
  console.log(JSON.stringify(post.body, null, 2));
  console.log('JSON_BODY_END');
}

debug();
