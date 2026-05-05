import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'mfth4gqi',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: 'skM3S5NtcZMeJc15ksKU4vxdYvXFFi55m1LI1r3zoqx2Bnh60Vsi8bxQZMF7RMAh7e0Dwy8PCckuB9cZOHh9Y5B19K1Eged7WxjTHEQpv3Qn18h1JuVHav8oMN7txmT1liugK4cjHL50Qmg1VHmOQ8BDbhHKEa0xyjYxWEknfcjoi9zarLXgk'
});

async function check() {
  const posts = await client.fetch('*[_type == "post"] | order(_createdAt desc) [0..2] { _id, title, title_en }');
  console.log(JSON.stringify(posts, null, 2));
}

check();
