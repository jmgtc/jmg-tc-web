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

const bodyTranslations = [
  {
    id: "wp-3113",
    body: [
      {
        _type: "block",
        children: [{ _type: "span", text: "Amazon Web Services (AWS) has simplified the adoption of Generative AI for businesses of all sizes. With tools like Bedrock, developers can experiment with multiple foundation models without managing complex infrastructure. This step-by-step approach ensures a secure and scalable integration of intelligence into existing workflows." }]
      }
    ]
  },
  {
    id: "wp-3086",
    body: [
      {
        _type: "block",
        children: [{ _type: "span", text: "WordPress is betting big on Artificial Intelligence. The creation of an official team dedicated to AI integration in 2025 marks a turning point for the CMS. We expect smarter writing assistants, automated SEO tools, and more intuitive site management, all natively integrated into the world's most popular platform." }]
      }
    ]
  }
];

async function updateBodies() {
  for (const item of bodyTranslations) {
    await client.patch(item.id).set({
      body_en: item.body
    }).commit();
    console.log(`✅ Body translated: ${item.id}`);
  }
}

updateBodies().catch(console.error);
