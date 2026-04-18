import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2023-05-03',
});

async function getLandingData() {
  const data = await client.fetch('*[_type == "landingPage"][0]');
  console.log(JSON.stringify(data, null, 2));
}

getLandingData().catch(console.error);
