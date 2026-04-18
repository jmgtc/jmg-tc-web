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

const translations = {
  tag: "About JMG // Who we are",
  badge: "Trust",
  title_main: "Your technology,",
  title_accent: "in expert hands",
  intro: "JMG Tech Consulting was born from the conviction that any business, regardless of size, deserves access to elite technology. We simplify and automate so you can grow without friction.",
  profile: {
    tag: "Founder Profile",
    role: "Software Engineer · Founder",
    bio: "With over a decade of experience in IT infrastructure and AI ecosystems, Jose acts as a trusted technology partner. He understands the core of each business to provide high-impact solutions, moving away from generic proposals and focusing on sustainable technical excellence."
  },
  values: {
    tag: "Pillars",
    title: "Our Values",
    items: [
      { label: "Innovation", desc: "We adopt the latest technologies to give you a real competitive edge and operational agility." },
      { label: "Security", desc: "Your infrastructure and data are protected under the most rigorous industry standards." },
      { label: "Proximity", desc: "We act as your partner, not just a provider. We invest time in understanding your business in depth." },
      { label: "Transparency", desc: "Clear communication, no-surprise budgeting, and measurable results at every step." }
    ]
  }
};

async function translateAbout() {
  const about = await client.fetch('*[_type == "aboutPage"][0]');
  if (!about) {
    console.error('No about page found');
    return;
  }

  const patch = {
    tag_en: translations.tag,
    badge_en: translations.badge,
    title_main_en: translations.title_main,
    title_accent_en: translations.title_accent,
    intro_en: translations.intro,
    'profile.tag_en': translations.profile.tag,
    'profile.role_en': translations.profile.role,
    'profile.bio_en': translations.profile.bio,
    'values.tag_en': translations.values.tag,
    'values.title_en': translations.values.title,
  };

  if (about.values?.items) {
    about.values.items.forEach((item, index) => {
      const trans = translations.values.items[index];
      if (trans) {
        patch[`values.items[${index}].label_en`] = trans.label;
        patch[`values.items[${index}].desc_en`] = trans.desc;
      }
    });
  }

  await client.patch(about._id).set(patch).commit();
  console.log('About page translated successfully');
}

translateAbout().catch(console.error);
