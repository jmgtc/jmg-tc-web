import { createClient } from '@sanity/client';
import es from '../src/dictionaries/es.json' with { type: 'json' };
import en from '../src/dictionaries/en.json' with { type: 'json' };
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mfth4gqi',
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2023-01-01',
});

async function seed() {
  console.log('🚀 Iniciando población de documentos Sanity...');

  // 1. LANDING PAGE
  const landingDoc = {
    _id: 'landingPage',
    _type: 'landingPage',
    hero: {
      badge: es.hero.badge,
      badge_en: en.hero.badge,
      title: es.hero.title,
      title_en: en.hero.title,
      title_highlight: es.hero.title_highlight,
      title_highlight_en: en.hero.title_highlight,
      subtitle: es.hero.subtitle,
      subtitle_en: en.hero.subtitle,
      cta: es.hero.cta,
      cta_en: en.hero.cta,
    },
    services_highlights: {
      title: es.services.title,
      title_en: en.services.title,
      description: es.services.description,
      description_en: en.services.description,
    },
    consultoria_ia: {
      tag: es.services.ia.tag,
      tag_en: en.services.ia.tag,
      title: es.services.ia.title_main,
      title_en: en.services.ia.title_main,
      highlight: es.services.ia.title_highlight,
      highlight_en: en.services.ia.title_highlight,
      description: es.services.ia.desc_short,
      description_en: en.services.ia.desc_short,
      phases: es.services.ia.phases.map((p, i) => ({
        _key: `phase-${i}`,
        num: p.num,
        label: p.label,
        label_en: en.services.ia.phases[i].label,
        desc: p.desc,
        desc_en: en.services.ia.phases[i].desc,
      }))
    },
    about: {
      tag: es.about.tag,
      tag_en: en.about.tag,
      title_main: es.about.title_main,
      title_main_en: en.about.title_main,
      title_accent: es.about.title_accent,
      title_accent_en: en.about.title_accent,
      intro: es.about.intro,
      intro_en: en.about.intro,
      profile: {
        tag: es.about.profile.tag,
        tag_en: en.about.profile.tag,
        name: es.about.profile.name,
        role: es.about.profile.role,
        role_en: en.about.profile.role,
        bio: es.about.profile.desc,
        bio_en: en.about.profile.desc,
      },
      values: {
        tag: es.about.values.tag,
        tag_en: en.about.values.tag,
        title: es.about.values.title,
        title_en: en.about.values.title,
        items: es.about.values.items.map((item, i) => ({
          _key: `value-${i}`,
          icon: item.icon,
          label: item.label,
          label_en: en.about.values.items[i].label,
          desc: item.desc,
          desc_en: en.about.values.items[i].desc,
        }))
      }
    },
    blog_highlights: {
      tag: es.services.ia.tag, // Fallback
      title: es.blog.title,
      title_en: en.blog.title,
      view_all: 'Ver todas →',
      view_all_en: 'View all →',
    },
    cta_section: {
      title: '¿Listo para transformar tu tecnológica?',
      title_en: 'Ready to transform your technology?',
      button_text: es.header.cta,
      button_text_en: en.header.cta,
    }
  };

  try {
    console.log('--- Creando Página de Inicio ---');
    await client.createOrReplace(landingDoc);
    console.log('✅ Página de Inicio creada/actualizada.');

    // 2. SITE SETTINGS (Basic metadata)
    const settingsDoc = {
      _id: 'siteSettings',
      _type: 'siteSettings',
      title: 'JMG Tech Consulting',
      description: es.hero.subtitle,
      address: 'Madrid, España',
      email: 'info@jmg-tc.com',
      phone: '+34 000 000 000',
    };
    await client.createOrReplace(settingsDoc);
    console.log('✅ Ajustes Globales creados/actualizados.');

    console.log('✨ Proceso finalizado con éxito.');
  } catch (err) {
    console.error('❌ Error durante la población:', err);
  }
}

seed();
