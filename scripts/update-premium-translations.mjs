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

const premiumTranslations = [
  {
    id: "wp-2287",
    title_en: "Expertise, Evolution, and New Horizons in Tech",
    body_en: [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "As a software engineer with over 20 years of experience, I've seen technologies come and go. But today's evolution is different. It's about how we integrate intelligence and human strategy into every digital process." }]
      }
    ]
  },
  {
    id: "wp-3113",
    title_en: "Unlocking Generative AI on AWS: A Comprehensive Guide",
    body_en: [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Explore the power of AWS Bedrock and SageMaker. We take you through the process of deploying foundation models that actually drive business value, ensuring security and cost-efficiency at every step." }]
      }
    ]
  }
];

async function updatePremium() {
  for (const item of premiumTranslations) {
    await client.patch(item.id).set({
      title_en: item.title_en,
      body_en: item.body_en
    }).commit();
    console.log(`✅ Premium translation applied: ${item.title_en}`);
  }
}

updatePremium().catch(console.error);
