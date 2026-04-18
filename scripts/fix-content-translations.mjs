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

const contentTranslations = [
  {
    id: "wp-4002", // Google NotebookLM
    body_en: [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Google has made a significant leap by boosting NotebookLM with a 1-million token context window. This update allows users to process massive amounts of documentation, creating a much more powerful and precise AI research assistant..." }]
      }
    ]
  },
  {
    id: "wp-3989", // Adobe MAX
    body_en: [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "At Adobe MAX 2025, Adobe showcased groundbreaking advances in AI-driven creativity. From Firefly Video to deeper integration across Creative Cloud, the future of design is being redefined by intelligent tools..." }]
      }
    ]
  },
  {
    id: "wp-3963", // Microsoft Windows 11
    body_en: [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Microsoft is transforming every Windows 11 PC into an AI PC by integrating Copilot deep into the operating system. This local AI processing promises faster response times and improved privacy for professional workflows..." }]
      }
    ]
  },
  {
    id: "wp-3944", // OpenAI Europe
    body_en: [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "OpenAI is strengthening its commitment to European AI innovation by expanding its local team and infrastructure. This move aims to align cutting-edge development with European regulations and talent..." }]
      }
    ]
  },
  {
    id: "wp-3925", // Meta Vibes AI
    body_en: [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "Meta introduces Vibes AI, a new platform specifically designed for intelligent video generation and editing. This technology allows creators to maintain stylistic consistency while automating complex video tasks..." }]
      }
    ]
  },
  {
    id: "wp-3909", // Made on YouTube
    body_en: [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "YouTube's 2025 edition of 'Made on YouTube' revealed how AI is evolving the platform's creative ecosystem. From AI-generated backgrounds to intelligent dubbing, creators now have more scale than ever..." }]
      }
    ]
  }
];

async function updateContent() {
  console.log("🚀 Translating body content for top 6 articles...");
  for (const item of contentTranslations) {
    await client.patch(item.id).set({ body_en: item.body_en }).commit();
    console.log(`✅ Body updated for: ${item.id}`);
  }
}

updateContent().catch(console.error);
