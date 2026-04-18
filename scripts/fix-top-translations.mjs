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
  { id: "wp-4032", en: "Gemini 3: Transforming Your Ideas into Interactive Experiences" },
  { id: "wp-4023", en: "Adobe Integrates ChatGPT into Photoshop and Acrobat" },
  { id: "wp-4014", en: "How Comet Assistant Supercharges Your AI Control" },
  { id: "wp-4002", en: "Google Boosts NotebookLM with 1 Million Context Tokens" },
  { id: "wp-3989", en: "How Adobe Revolutionizes Creativity with AI at MAX 2025" },
  { id: "wp-3963", en: "Microsoft Turns Every Windows 11 PC into an AI PC" },
  { id: "wp-3944", en: "OpenAI Strengthens AI Innovation Across Europe" },
  { id: "wp-3925", en: "Meta Introduces Vibes AI: Artificial Intelligence for Videos" },
  { id: "wp-3909", en: "Made on YouTube 2025: Evolving Creativity with AI" },
  { id: "wp-3891", en: "How to Build an AI Agent on your iPhone with Replit" }
];

async function updateRecent() {
  console.log("🚀 Updating top 10 articles with professional English titles...");
  for (const item of translations) {
    await client.patch(item.id).set({ title_en: item.en }).commit();
    console.log(`✅ Updated: ${item.en}`);
  }
}

updateRecent().catch(console.error);
