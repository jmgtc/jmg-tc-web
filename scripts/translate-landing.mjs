import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2023-05-03',
});

const translations = {
  hero: {
    badge: "IT Consulting & AI Development",
    tag: "The Digital Guide // Innovation",
    title: "By your side to design, optimize, and protect",
    title_highlight: "your digital environment",
    subtitle: "Tailored strategies to take your company to the next technological level through precision and innovation.",
    cta: "Get Started"
  },
  services_highlights: {
    badge: "Solutions",
    tag: "Section 02 // Strategic Architecture",
    title: "Technological Pillars",
    description: "Robust infrastructure, premium development, and intelligent automation. Everything your business needs to scale safely."
  },
  consultoria_ia: {
    badge: "ConsultorIA",
    tag: "Optimization // 24/7 Efficiency",
    title: "AI",
    highlight: "Consulting",
    description: "We don't just implement technology; we redefine how your business operates. Automate key processes and release your team's potential.",
    phases: [
      { label: "Identification", desc: "Mapping repetitive tasks and high-impact automation opportunities." },
      { label: "Technology", "desc": "Selecting cutting-edge LLMs and custom workflows for your DNA." },
      { label: "Implementation", desc: "Seamless integration with your current operations without downtime." },
      { label: "Optimization", desc: "Continuous monitoring and data-driven refinement for peak performance." }
    ]
  },
  podcast_section: {
    badge: "Insights",
    tag: "Discovery // Tech Chronicles",
    title: "The Digital Pulse Podcast",
    description: "Deep dives into the trends that are reshaping our world. From AI sociology to server architecture."
  },
  blog_highlights: {
    badge: "Blog",
    title: "Latest Chronicles",
    view_all: "Explore All"
  },
  clients_section: {
    badge: "Trust",
    tag: "Partners // Shared Success",
    title: "Companies that grow with us"
  },
  cta_section: {
    badge: "Action",
    tag: "Future // Start Today",
    title: "Ready to scale your digital infrastructure?",
    button_text: "Let's Talk"
  }
};

async function translateLanding() {
  const landing = await client.fetch('*[_type == "landingPage"][0]');
  if (!landing) {
    console.error('No landing page found');
    return;
  }

  const patch = {
    'hero.badge_en': translations.hero.badge,
    'hero.tag_en': translations.hero.tag,
    'hero.title_en': translations.hero.title,
    'hero.title_highlight_en': translations.hero.title_highlight,
    'hero.subtitle_en': translations.hero.subtitle,
    'hero.cta_en': translations.hero.cta,

    'services_highlights.badge_en': translations.services_highlights.badge,
    'services_highlights.tag_en': translations.services_highlights.tag,
    'services_highlights.title_en': translations.services_highlights.title,
    'services_highlights.description_en': translations.services_highlights.description,

    'consultoria_ia.badge_en': translations.consultoria_ia.badge,
    'consultoria_ia.tag_en': translations.consultoria_ia.tag,
    'consultoria_ia.title_en': translations.consultoria_ia.title,
    'consultoria_ia.highlight_en': translations.consultoria_ia.highlight,
    'consultoria_ia.description_en': translations.consultoria_ia.description,

    'podcast_section.badge_en': translations.podcast_section.badge,
    'podcast_section.tag_en': translations.podcast_section.tag,
    'podcast_section.title_en': translations.podcast_section.title,
    'podcast_section.description_en': translations.podcast_section.description,

    'blog_highlights.badge_en': translations.blog_highlights.badge,
    'blog_highlights.title_en': translations.blog_highlights.title,
    'blog_highlights.view_all_en': translations.blog_highlights.view_all,

    'clients_section.badge_en': translations.clients_section.badge,
    'clients_section.tag_en': translations.clients_section.tag,
    'clients_section.title_en': translations.clients_section.title,

    'cta_section.badge_en': translations.cta_section.badge,
    'cta_section.tag_en': translations.cta_section.tag,
    'cta_section.title_en': translations.cta_section.title,
    'cta_section.button_text_en': translations.cta_section.button_text,
  };

  // Handle phases array
  if (landing.consultoria_ia?.phases) {
    landing.consultoria_ia.phases.forEach((phase, index) => {
      const trans = translations.consultoria_ia.phases[index];
      if (trans) {
        patch[`consultoria_ia.phases[${index}].label_en`] = trans.label;
        patch[`consultoria_ia.phases[${index}].desc_en`] = trans.desc;
      }
    });
  }

  await client.patch(landing._id).set(patch).commit();
  console.log('Landing page translated successfully');
}

translateLanding().catch(console.error);
