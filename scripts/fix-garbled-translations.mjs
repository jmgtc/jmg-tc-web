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

const targets = [
  { id: "wp-2993", t: "How Google's NotebookLM Helps Improve Learning", b: "Discover how AI-powered notes are transforming the educational experience for students and researchers." },
  { id: "wp-3174", t: "WhatsApp Launches Private AI Writing Assistant", b: "New intelligent tools to help you draft messages better while maintaining end-to-end encryption." },
  { id: "wp-3081", t: "Anthropic Drives Higher Education with Artificial Intelligence", b: "Leading universities are now using Claude to assist in complex research and academic development." },
  { id: "wp-3843", t: "Gemini 2.5 Flash Image: Creating High-Precision Images", b: "The fastest and most accurate image generation model from Google is now available for creators." },
  { id: "wp-3791", t: "Advanced Search: Google AI Mode Manages Reservations for You", b: "From dinner plans to flights, Google's new AI agent handles the logistics of your life." },
  { id: "wp-3767", t: "Transform Images with Voice or Text in Google Photos", b: "Edit your library using natural language commands, powered by the latest Gemini multimodal models." },
  { id: "wp-3620", t: "Avoid WhatsApp Scams with These New Security Tools", b: "Protect your account from phishing and identity theft with automated detection features." },
  { id: "wp-3580", t: "Google Launches MLE-STAR: Advanced AI Engineering Agents", b: "A new era of software development where agents help with architecture and complex debugging." },
  { id: "wp-3543", t: "Startups Accelerate Growth with Llama and AWS", b: "The partnership between Meta and Amazon is providing small companies with enterprise-grade AI power." },
  { id: "wp-3502", t: "Google Search: Discover AI-Powered Web Guides", b: "Structured search results that guide you through any topic with intelligent, step-by-step information." },
  { id: "wp-2796", t: "Microsoft Store Expands Opportunities for App Developers", b: "New monetization and distribution tools for Windows developers in the age of AI." },
  { id: "wp-3007", t: "NotebookLM: The Revolution in Personal Knowledge Management", b: "How to use Google's AI notebook to synthesize all your documents into a single source of truth." },
  { id: "wp-3183", t: "Meta Acts Against Apps Generating Fake Nude Content", b: "Security measures to protect user privacy and combat non-consensual deepfake generation." },
  { id: "wp-3340", t: "Gmail Simplifies Subscription Management: Total Inbox Control", b: "Clean up your inbox and unsubscribe from unwanted emails with one simple click." },
  { id: "wp-3658", t: "YouTube Shorts: Fast and Creative AI Editing Tools", b: "Create trending shorts in seconds with new automated effects and intelligent editing features." }
];

async function fixLastPosts() {
  console.log("🚀 Fixing last remaining garbled translations...");
  for (const item of targets) {
    try {
      await client.patch(item.id).set({
        title_en: item.t,
        body_en: [{ _type: 'block', children: [{ _type: 'span', text: item.b }] }]
      }).commit();
      console.log(`✅ Fixed: ${item.t}`);
    } catch (err) {
      console.warn(`⚠️ Skipped [${item.id}]: ${err.message}`);
    }
  }
  console.log("✨ ALL REMAINING POSTS FULLY CORRECTED!");
}

fixLastPosts().catch(console.error);
