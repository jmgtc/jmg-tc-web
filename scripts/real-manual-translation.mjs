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

const professionalArticles = [
  {
    id: "wp-4032",
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Google has officially unveiled Gemini 3, its most powerful and versatile multimodal model to date. This new version isn't just an update; it's a complete paradigm shift in how users interact with artificial intelligence. With Gemini 3, the latency between a prompt and a complex multimodal response has been virtually eliminated." }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: "Key Features of the New Model" }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "The main innovation lies in its 'Live Multimodality' engine. For the first time, the AI can see, hear, and respond in real-time with human-like emotions and context awareness. This allows developers to create experiences where the AI acts as a collaborative partner rather than a static replier." }]
      }
    ]
  },
  {
    id: "wp-4023",
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "In a historic move for the creative industry, Adobe has announced a deep integration of ChatGPT into its flagship products, Photoshop and Acrobat. This collaboration marks a turning point for professional workflows, combining Adobe's visual power with OpenAI's conversational intelligence." }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: "Natural Language Editing" }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Users can now 'talk' to Photoshop. By simply typing or saying 'Swap the background for a rainy night in Tokyo' or 'Retouch the skin tone to match the references', the AI executes complex selections and maskings that previously took hours, all in a few seconds." }]
      }
    ]
  },
  {
    id: "wp-4014",
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Comet is the new assistant that is redefining the landscape of LLM management. Designed for power users and enterprises, Comet offers a unified interface to control and fine-tune multiple large language models simultaneously from a single control plane." }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: "Granular Control and Optimization" }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Beyond just querying, Comet allows users to adjust parameters like temperature, top-p, and frequency penalty on the fly across different providers. It also includes an advanced 'Performance Monitor' that tracks tokens per second and cost efficiency in real-time." }]
      }
    ]
  }
];

async function applyRealTranslation() {
  console.log("🚀 Applying FULL PROFESSIONAL translation to TOP articles...");
  for (const art of professionalArticles) {
    await client.patch(art.id).set({
      body_en: art.body
    }).commit();
    console.log(`✅ Fully translated content for: ${art.id}`);
  }
  console.log("✨ TOP ARTICLES ARE NOW 100% IN ENGLISH!");
}

applyRealTranslation().catch(console.error);
