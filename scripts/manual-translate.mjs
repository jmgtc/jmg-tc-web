import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'mfth4gqi',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
  token: 'skM3S5NtcZMeJc15ksKU4vxdYvXFFi55m1LI1r3zoqx2Bnh60Vsi8bxQZMF7RMAh7e0Dwy8PCckuB9cZOHh9Y5B19K1Eged7WxjTHEQpv3Qn18h1JuVHav8oMN7txmT1liugK4cjHL50Qmg1VHmOQ8BDbhHKEa0xyjYxWEknfcjoi9zarLXgk'
});

async function run() {
  // 1. Get last post
  const posts = await client.fetch('*[_type == "post"] | order(_createdAt desc) [0..0]');
  if (posts.length === 0) {
    console.log('No posts found');
    return;
  }
  const post = posts[0];
  console.log('Found post:', post.title);

  // 2. Simple translation for title and excerpt (simulating what I'll do next)
  // I'll use a second step to do the actual AI translation if needed, 
  // but for now I'll just show I found it.
  console.log('ID:', post._id);
}

run();
