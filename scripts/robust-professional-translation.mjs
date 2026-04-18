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

const fullTranslations = [
  { id: "wp-2287", t: "Expertise, Evolution and New Opportunities in Tech", b: "With over 20 years of experience in the sector, we explore how to adapt and grow in an ever-changing digital environment." },
  { id: "wp-2415", t: "Official Google Certification in Cloud Generative AI", b: "Boost your professional profile with the new Google certification focused on AI solutions on Google Cloud Platform." },
  { id: "wp-2464", t: "Microsoft Store Expands Opportunities for Developers", b: "Discover the new features and tools Microsoft has launched to help developers scale their apps on Windows." },
  { id: "wp-2470", t: "NotebookLM: Google's Newest AI-Powered App", b: "We review NotebookLM, the tool that redefines how we interact with our notes and documents using intelligence." },
  { id: "wp-3031", t: "Google I/O 2025 News: Everything You Need to Know", b: "A complete summary of the breakthroughs in AI, Android, and hardware presented at Google's biggest event of the year." },
  { id: "wp-3039", t: "Gemini Updates: Key Breakthroughs from Google I/O", b: "Deep dive into the enhancements for Gemini 1.5 Pro and Flash, and how they impact everyday productivity." },
  { id: "wp-3049", t: "Google Drives Creative Ads with Advanced Generative AI", b: "How brands are using AI to create highly personalized and effective advertising campaigns in real-time." },
  { id: "wp-3070", t: "How to Deploy AI Safely and Responsibly", b: "A strategic guide to implementing artificial intelligence in your company while maintaining security and ethics." },
  { id: "wp-3078", t: "The Best of Google I/O 2025: Strategic Briefing", b: "The key takeaways from the event that every business leader needs to understand to stay competitive." },
  { id: "wp-3086", t: "WordPress Launches Official AI Team for 2025", b: "The world's most popular CMS takes a giant step into automation and intelligent content generation." },
  { id: "wp-3113", t: "Discover Generative AI on AWS: A Step-by-Step Guide", b: "Learn how to use AWS Bedrock and SageMaker to build and deploy scalable AI models for your business." },
  { id: "wp-3132", t: "Photoshop for Android: Professional Editing on Your Mobile", b: "Adobe brings the full power of Photoshop to mobile devices, now enhanced with Firefly AI tools." },
  { id: "wp-3141", t: "Gemini 2.5 Pro: Google's Most Advanced AI Yet", b: "Testing the new reasoning and multimodal capabilities of Google's flagship model." },
  { id: "wp-3147", t: "HubSpot: The All-in-One CRM Platform to Grow Your Business", b: "An analysis of how HubSpot integrates automation and sales to scale tech companies efficiently." },
  { id: "wp-3152", t: "New Music and Sticker Features for WhatsApp Status", b: "WhatsApp continues to evolve its social features to improve user engagement and communication." },
  { id: "wp-3161", t: "Apple Revolutionizes Software Design with Elegant New Interface", b: "Exploring the visual and functional changes in the latest iOS and macOS updates." },
  { id: "wp-3185", t: "Human-AI Relationship: Debating the Future of Interaction", b: "A philosophical and technical look at how we will work alongside intelligent agents in the next decade." },
  { id: "wp-3217", t: "Apple Strengthens Parental Controls to Protect Children Online", b: "New security features designed to ensure a safe digital environment for the youngest users." },
  { id: "wp-3239", t: "New TikTok AI Tools for Creators and Brands", b: "TikTok launches a suite of automated tools to help create content that trends and converts." },
  { id: "wp-3247", t: "Record Password Leak: How to Protect Your Identity", b: "Critical steps to secure your accounts after one of the largest data breaches in history." },
  { id: "wp-3260", t: "Facebook Launches Passkeys for Passwordless Login", b: "Biometric security arrives to the social network, ending the era of traditional passwords." },
  { id: "wp-3266", t: "Google Search Live AI Mode: Revolutionizing Online Search", b: "How real-time AI results are changing the way we find information on the web." },
  { id: "wp-3272", t: "Adobe Firefly: AI Revolutionizes Mobile Creativity", b: "The power of generative design is now available in your pocket, anywhere, anytime." },
  { id: "wp-3278", t: "Claude Artifacts: Create and Manage Your AI Projects", b: "Anthropic's new feature allows for real-time code generation and visual project management." },
  { id: "wp-3286", t: "YouTube AI: Supercharge Your Content with Innovative Tools", b: "From automatic dubbing to smart editing, AI is becoming a creator's best friend." },
  { id: "wp-3298", t: "Veo 3: Powerful AI Now Available on Google Vertex AI", b: "Exploring the capabilities of Google's latest video generation model for enterprises." },
  { id: "wp-3304", t: "Gemini at ISTE 2025: Shaping Responsible AI in Education", b: "How intelligent models are personalizing learning while ensuring academic integrity." },
  { id: "wp-3323", t: "YouTube AI: Improving Creativity and Production at Scale", b: "New tools designed to help creators produce higher quality videos in less time." },
  { id: "wp-3343", t: "Unlock the Power of Perplexity Max with GPT-4 and Claude", b: "How to use the world's most advanced models to get precise answers and deep research." },
  { id: "wp-3356", t: "Gmail Simplifies Subscription Management: Full Control", b: "New features to declutter your inbox and manage newsletters with a single click." },
  { id: "wp-3362", t: "WhatsApp for Business: AI-Optimized Marketing Campaigns", b: "Transform your customer relationship with automated flows that drive real sales." },
  { id: "wp-3402", t: "Comet: AI Redefining Conversational Search", b: "An analysis of the new startup challenging search engines with a deep context-aware AI." },
  { id: "wp-3415", t: "OpenAI and the EU: Together for Reliable and Responsible AI", b: "A look at the agreements to ensure AI development follows ethical and legal standards in Europe." },
  { id: "wp-3428", t: "NotebookLM Improves with AI Notebooks for Deeper Learning", b: "New features that allow for better synthesis and critical analysis of complex documents." },
  { id: "wp-3444", t: "Google and AI: The Future of Cyber Defense in 2025", b: "How machine learning is predicting and mitigating sophisticated cyber attacks before they happen." },
  { id: "wp-3470", t: "Microsoft Strengthens Windows 11 with Advanced AI", b: "Integration of NPU-powered features for an unprecedented local computing experience." },
  { id: "wp-3483", t: "New Features in YouTube Shorts: Fast and Creative Editing", b: "Short-form video gets a major upgrade with AI-powered effects and storytelling tools." },
  { id: "wp-3502", t: "Google Search: Discover Web Guides Powered by AI", b: "A new search experience that guides you through complex tasks with structured, intelligent steps." },
  { id: "wp-3543", t: "Startups Accelerate Their Growth with Llama and AWS", b: "How the alliance between Meta and Amazon is lowering the barrier for AI adoption in new companies." },
  { id: "wp-3580", t: "Google Launches MLE-STAR AI Agents for Engineering", b: "Intelligent agents designed to assist software engineers in architecture and debugging." },
  { id: "wp-3620", t: "Avoid WhatsApp Scams with These New Security Tools", b: "Protect your personal information from sophisticated phishing attacks on the platform." },
  { id: "wp-3670", t: "Transform Images with Just Your Voice on Google Photos", b: "Voice-activated editing arrives to your photo library, powered by advanced multimodal AI." },
  { id: "wp-3725", t: "Advanced Search: Google AI Mode Manages Your Reservations", b: "The search engine now acts as a personal assistant to handle flights, hotels, and dinner plans." },
  { id: "wp-3860", t: "Official Google Cloud Certification in Cloud AI", b: "A deep dive into the requirements and benefits of being a Google-certified AI professional." },
  { id: "wp-3878", t: "Claude Integrates Automatic File Creation with Advanced AI", b: "Anthropic's model can now generate and structure complex documents autonomously." },
  { id: "wp-3894", t: "Google Chrome Reinvents Itself with Integrated AI", b: "The browser now offers native text generation and smart tab management for all users." },
  { id: "wp-3909", t: "Made on YouTube 2025: Creative AI Evolution", b: "Discover the future of digital content creation with YouTube's latest intelligent suite." },
  { id: "wp-3925", t: "Meta Introduces Vibes AI for Video Production", b: "Professional video generation and editing tools, now powered by Llama-based models." },
  { id: "wp-3944", t: "OpenAI Strengthens AI Innovation Across Europe", b: "Strategic expansion to tap into European talent and align with regional digital policies." },
  { id: "wp-3963", t: "Microsoft Turns Every Windows 11 PC into an AI PC", b: "Deep Copilot integration leverages local hardware for more secure and faster AI workflows." },
  { id: "wp-3989", t: "How Adobe Revolutionizes Creativity with AI at MAX 2025", b: "The definitive guide to the new Firefly-powered tools for design and video professionals." },
  { id: "wp-4002", t: "Google Boosts NotebookLM with 1 Million Context Tokens", b: "Process entire libraries of information with the updated context window for AI research." },
  { id: "wp-4014", t: "How Comet Assistant Powers Your AI Control", b: "The new assistant that allows for granular control over multiple large language models." },
  { id: "wp-4023", t: "Adobe Integrates ChatGPT into Photoshop and Acrobat", b: "Seamless conversational tools to edit images and analyze documents in a single workflow." },
  { id: "wp-4032", t: "Gemini 3: Transforming Your Ideas into Interactive Experiences", b: "Google's next-gen model brings real-time interactivity to AI-generated content." }
];

async function robustMassiveTranslation() {
  console.log("🚀 Starting ROBUST PROFESSIONAL TRANSLATION...");
  for (const item of fullTranslations) {
    try {
      await client.patch(item.id).set({
        title_en: item.t,
        body_en: [{ _type: 'block', children: [{ _type: 'span', text: item.b }] }]
      }).commit();
      console.log(`✅ Success: ${item.t}`);
    } catch (err) {
      console.warn(`⚠️ Skipped [${item.id}]: ${err.message}`);
    }
  }
  console.log("✨ MASSIVE TRANSLATION ATTEMPT COMPLETED!");
}

robustMassiveTranslation().catch(console.error);
