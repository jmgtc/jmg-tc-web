import { createClient } from '@sanity/client';
import dotenv from 'dotenv';
import fs from 'fs';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function exportPosts() {
  const posts = await client.fetch('*[_type == "post"]');
  fs.writeFileSync('posts-export.json', JSON.stringify(posts, null, 2));
  console.log(`Exported ${posts.length} posts to posts-export.json`);
}

exportPosts().catch(console.error);
