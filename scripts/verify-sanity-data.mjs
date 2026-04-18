import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-05-03',
});

async function checkData() {
  const post = await client.fetch('*[_type == "post" && defined(title_en)][0] { title, title_en, _id }');
  if (post) {
    console.log('✅ DATA FOUND:');
    console.log(`Original: ${post.title}`);
    console.log(`English: ${post.title_en}`);
    console.log(`ID: ${post._id}`);
  } else {
    console.log('❌ NO DATA: title_en is not defined in any post.');
  }
}

checkData().catch(console.error);
