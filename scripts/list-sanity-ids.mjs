import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function listIds() {
  const posts = await client.fetch('*[_type == "post"] | order(_createdAt desc) [0...10] { _id, title, slug }');
  console.log(JSON.stringify(posts, null, 2));
}

listIds().catch(console.error);
