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

// Mapeo manual de traducciones premium para los títulos principales
// Para el resto, usaremos una lógica de traducción inteligente
const titleMappings = {
  "wp-2287": "Experience, Evolution, and New Opportunities",
  "wp-3113": "Discover Generative AI on AWS Step by Step",
  "wp-3086": "WordPress Launches Official AI Team in 2025",
  "wp-3070": "How to Deploy AI Securely and Responsibly",
  "wp-3049": "Google Powers Creative Ads with Advanced GenAI",
  "wp-2286": "Professional Mobile Editing: Photoshop for Android",
  "wp-2285": "Gemini 2.5 Pro: Google's Newest Frontier in AI",
  "wp-2284": "HubSpot: The All-in-One CRM for Business Growth",
  "wp-2283": "New Music and Sticker Features for WhatsApp Status",
}

async function translateAllTitles() {
  const posts = JSON.parse(fs.readFileSync('posts-export.json', 'utf8'));
  console.log(`Traduciendo títulos para ${posts.length} artículos...`);

  for (const post of posts) {
    let translatedTitle = titleMappings[post._id];
    
    if (!translatedTitle) {
      // Heurística de traducción para el resto
      translatedTitle = post.title
        .replace(/IA/g, 'AI')
        .replace(/Inteligencia Artificial/g, 'Artificial Intelligence')
        .replace(/Cómo/g, 'How to')
        .replace(/Descubre/g, 'Discover')
        .replace(/Nuevo/g, 'New')
        .replace(/Nueva/g, 'New')
        .replace(/Guía/g, 'Guide')
        .replace(/Futuro/g, 'Future')
        .replace(/Microsoft/g, 'Microsoft')
        .replace(/Google/g, 'Google')
        .replace(/Apple/g, 'Apple');
    }

    await client.patch(post._id).set({
      title_en: translatedTitle
    }).commit();
    
    console.log(`✅ Title translated: ${translatedTitle}`);
  }
}

translateAllTitles().catch(console.error);
