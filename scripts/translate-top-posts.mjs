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

const translations = [
  {
    id: "wp-3113",
    title_en: "Discover Generative Artificial Intelligence on AWS Step by Step",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Amazon Web Services (AWS) has established itself as one of the most robust platforms for the development and deployment of Generative AI. Through services like Amazon Bedrock and Amazon SageMaker, companies can now access state-of-the-art foundation models securely and scalably." }]
      }
    ]
  },
  {
    id: "wp-3086",
    title_en: "WordPress Launches Official Artificial Intelligence Team in 2025",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "The WordPress ecosystem continues to evolve, and in 2025, the launch of an official AI team has been announced. This strategic movement aims to integrate intelligence capabilities directly into the core, facilitating content creation and site management for millions of users worldwide." }]
      }
    ]
  },
  {
    id: "wp-3070",
    title_en: "How to Deploy AI Securely and Responsibly",
    body: [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Deploying Artificial Intelligence is not just about choosing a model; it's about governance and security. At JMG Tech Consulting, we emphasize the importance of data privacy, ethical bias auditing, and the implementation of guardrails to ensure that AI adds value without compromising organizational integrity." }]
      }
    ]
  }
];

async function updatePosts() {
  for (const item of translations) {
    await client.patch(item.id).set({
      title_en: item.title_en,
      body_en: item.body // Al ser idéntico en estructura al clon que ya hicimos, esto sobrescribe el texto pero mantiene el formato
    }).commit();
    console.log(`✅ Fully translated: ${item.title_en}`);
  }
}

updatePosts().catch(console.error);
