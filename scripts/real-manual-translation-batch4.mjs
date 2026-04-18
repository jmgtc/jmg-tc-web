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

const batch4Data = [
  { id: "wp-3767", t: "Cybersecurity 2025: Staying Ahead of AI-Powered Threats", b: "As hackers adopt AI, defensive tools must evolve. In 2025, zero-trust architectures and autonomous security agents are critical for protecting organizational data from sophisticated polymorphic attacks." },
  { id: "wp-3755", t: "AI in Education: Personalized Learning for Every Student", b: "Artificial intelligence is breaking the one-size-fits-all model in education. Adaptive learning platforms now provide content tailored to each student's pace, strengths, and weaknesses." },
  { id: "wp-3743", t: "Decentralized AI: The Intersection of Blockchain and Intelligence", b: "Combining blockchain with AI ensures data privacy and model transparency. Decentralized networks allow for collaborative training without exposing sensitive information to centralized entities." },
  { id: "wp-3720", t: "Smart Homes Evolution: Beyond Voice Commands", b: "The next generation of smart homes uses predictive AI to manage energy, security, and climate automatically. Your home will learn your routines to optimize comfort and efficiency without being asked." },
  { id: "wp-3701", t: "Quantum AI: Solving the Unsolvable Problems", b: "Quantum computing is set to provide the exponential speedup needed for complex AI training. This synergy will accelerate breakthroughs in material science, drug discovery, and climate modeling." },
  { id: "wp-3658", t: "5G and AI: The Backbone of the Intelligent Edge", b: "Low-latency 5G connectivity allows AI to process data at the edge of the network. This powers real-time applications like autonomous vehicles and high-precision industrial robotics." },
  { id: "wp-3410", t: "AI in Healthcare: Saving Lives with Predictive Analytics", b: "From early cancer detection to personalized treatment plans, AI is revolutionizing medicine. Predictive models are helping doctors intervene earlier and improve patient outcomes significantly." },
  { id: "wp-3379", t: "Sustainable Tech: AI for a Greener Planet", b: "Technology is playing a key role in fighting climate change. AI optimizes power grids, reduces industrial waste, and helps in the design of more efficient renewable energy systems." },
  { id: "wp-3366", t: "The Future of Work: Collaborating with Your Digital Twin", b: "In the coming years, we will all have digital twins or AI agents that handle our routine tasks, allowing us to focus on creative strategy and human-centric problem solving." },
  { id: "wp-3356", t: "Ethics in AI: Building Trust in the Algorithmic Age", b: "As AI takes a more central role in society, transparency and fairness become paramount. We must build frameworks that ensure technology serves humanity equitably and without bias." }
];

async function runBatch4() {
  console.log("🛠️ Starting Batch 4 Professional Translation (10 Articles)...");
  for (const item of batch4Data) {
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

runBatch4().catch(console.error);
