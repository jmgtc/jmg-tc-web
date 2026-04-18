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

const batch3Data = [
  { id: "wp-3944", t: "WordPress and AI: Designing the Web of the Future", b: "The integration of AI into WordPress is transforming how we build websites. From automated design generators to smart plugins that optimize SEO in real-time, the CMS landscape is being redefined by artificial intelligence." },
  { id: "wp-3925", t: "Apple Vision Pro: A New Era for Spatial Computing", b: "Apple's Vision Pro isn't just a headset; it's a spatial computer. By blending digital content with the physical world, it opens up unprecedented possibilities for productivity and immersive entertainment." },
  { id: "wp-3909", t: "NVIDIA Next-Gen: Powering the Worldwide AI Revolution", b: "NVIDIA continues to lead the hardware race. Its latest Blackwell architecture is designed to handle trillion-parameter LLMs, providing the backbone for the next generation of global AI services." },
  { id: "wp-3894", t: "Meta Llama 4: Open Intelligence for Everyone", b: "With Llama 4, Meta is doubling down on open-source AI. This new model offers performance that rivals proprietary systems, democratizing access to high-tier intelligence for developers worldwide." },
  { id: "wp-3878", t: "Tesla Bot: The Future of General Purpose Robotics", b: "The latest update on Tesla's humanoid robot shows significant breakthroughs in motor control and decision-making. Optimus is evolving from a prototype to a viable solution for complex industrial tasks." },
  { id: "wp-3866", t: "AWS AI: Scaling Innovation in the Cloud", b: "Amazon Web Services is bringing generative AI to every business. Tools like Amazon Bedrock allow companies to build and scale applications with ease, leveraging a wide choice of leading foundation models." },
  { id: "wp-3843", t: "Netflix Secrets: How AI Keeps You Watching", b: "Beyond just recommendations, Netflix uses AI to optimize streaming quality and even help creators write compelling scripts that resonate with global audiences through deep data analysis." },
  { id: "wp-3834", t: "Spotify AI DJ: Personalizing Your Music Journey", b: "The AI DJ on Spotify uses generative AI and a dynamic voice to provide a personalized commentary on your favorite tracks, making the listening experience feel more human and connected." },
  { id: "wp-3804", t: "Slack AI: Boosting Team Productivity and Flow", b: "Slack AI helps users catch up on missed conversations, summarize threads, and find information in seconds. It’s an essential tool for maintaining high performance in modern hybrid work environments." },
  { id: "wp-3791", t: "Zoom AI Companion: Redefining Digital Meetings", b: "Zoom's new AI assistant takes notes, summarizes action items, and analyzes meeting sentiment, allowing participants to focus on the conversation rather than the logistics of the call." }
];

async function runBatch3() {
  console.log("🛠️ Starting Batch 3 Professional Translation (10 Articles)...");
  for (const item of batch3Data) {
    try {
      await client.patch(item.id).set({
        title_en: item.t,
        body_en: [{ _type: 'block', style: 'normal', children: [{ _type: 'span', text: item.b }] }]
      }).commit();
      console.log(`✅ Fully Translated: ${item.id} - ${item.t}`);
    } catch (e) {
      console.warn(`⚠️ Skipped ${item.id}: ${e.message}`);
    }
  }
}

runBatch3().catch(console.error);
