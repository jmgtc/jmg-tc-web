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
  header: {
    home: "Home",
    about: "About Us",
    services: "Services",
    blog: "Blog",
    login: "Login",
    panel: "Dashboard",
    cta: "Schedule a Call"
  },
  footer: {
    description: "Expert IT consultancy and AI development for ambitious companies seeking safe and sustainable growth in the digital era.",
    nav_title: "Explore",
    cta_title: "Ready to scale?",
    cta_description: "Connect with our team to explore your technological roadmap.",
    cta_button: "Book a Discovery Call"
  }
};

async function translateSettings() {
  const settings = await client.fetch('*[_type == "siteSettings"][0]');
  if (!settings) {
    console.error('No site settings found');
    return;
  }

  const patch = {
    'header.home_en': translations.header.home,
    'header.about_en': translations.header.about,
    'header.services_en': translations.header.services,
    'header.blog_en': translations.header.blog,
    'header.login_en': translations.header.login,
    'header.panel_en': translations.header.panel,
    'header.cta_en': translations.header.cta,

    'footer.description_en': translations.footer.description,
    'footer.nav_title_en': translations.footer.nav_title,
    'footer.cta_title_en': translations.footer.cta_title,
    'footer.cta_description_en': translations.footer.cta_description,
    'footer.cta_button_en': translations.footer.cta_button,
  };

  await client.patch(settings._id).set(patch).commit();
  console.log('Site settings translated successfully');
}

translateSettings().catch(console.error);
