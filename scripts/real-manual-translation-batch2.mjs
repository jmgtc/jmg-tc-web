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

const moreRealTranslations = [
  {
    id: "wp-4002",
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Google has expanded the horizons of the research process by increasing the context window of NotebookLM to 1 million tokens. This milestone allows researchers to upload entire libraries of documents and obtain synthetic analysis with unprecedented precision." }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: "Analyzing Massive Data" }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "The new context window means you can now cross-reference hundreds of PDFs, slides, and web pages simultaneously. The AI doesn't just search for keywords; it understands the deep relationships between distinct sources of information." }]
      }
    ]
  },
  {
    id: "wp-3989",
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "At Adobe MAX 2025, the company showcased how Firefly has evolved from a simple generator to a complete creative engine. The new integration allows for Vector generation and high-resolution video manipulation, all through simple text prompts." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Adobe's goal is to empower human designers, providing them with 'Creative Superpowers' that automate the tedious tasks, allowing them to focus on the vision and art of the final project." }]
      }
    ]
  },
  {
    id: "wp-3963",
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Microsoft has officially rebranded the PC experience with the launch of the 'AI PC' category for Windows 11. By hardware-accelerating AI tasks using specialized NPUs, Copilot is now faster, more local, and more private than ever." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "This shift means that features like real-time translation, image retouching, and smart context-aware suggestions are handled locally, reducing latency and ensuring that sensitive user data never leaves the device." }]
      }
    ]
  }
];

async function applyNextBatch() {
  console.log("🚀 Applying NEXT BATCH of FULL PROFESSIONAL translations...");
  for (const art of moreRealTranslations) {
    try {
      await client.patch(art.id).set({
        body_en: art.body
      }).commit();
      console.log(`✅ Fully translated content for: ${art.id}`);
    } catch (e) {
      console.warn(`⚠️ Skipped ${art.id}: ${e.message}`);
    }
  }
}

applyNextBatch().catch(console.error);
