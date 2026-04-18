import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Ajustes Globales',
  type: 'document',
  fields: [
    defineField({ name: 'logoText', title: 'Texto del Logo', type: 'string', initialValue: 'JMG Tech Consulting' }),
    defineField({ name: 'logoAccent', title: 'Acento del Logo (Texto en Oro)', type: 'string', initialValue: 'Consulting' }),
    
    defineField({
      name: 'header',
      title: 'Contenido Header',
      type: 'object',
      fields: [
        defineField({ name: 'home', title: 'Label Inicio (ES)', type: 'string' }),
        defineField({ name: 'home_en', title: 'Label Home (EN)', type: 'string' }),
        defineField({ name: 'about', title: 'Label Nosotros (ES)', type: 'string' }),
        defineField({ name: 'about_en', title: 'Label About (EN)', type: 'string' }),
        defineField({ name: 'services', title: 'Label Servicios (ES)', type: 'string' }),
        defineField({ name: 'services_en', title: 'Label Services (EN)', type: 'string' }),
        defineField({ name: 'blog', title: 'Label Blog (ES)', type: 'string' }),
        defineField({ name: 'blog_en', title: 'Label Blog (EN)', type: 'string' }),
        defineField({ name: 'login', title: 'Label Login (ES)', type: 'string' }),
        defineField({ name: 'login_en', title: 'Label Login (EN)', type: 'string' }),
        defineField({ name: 'panel', title: 'Label Panel (ES)', type: 'string' }),
        defineField({ name: 'panel_en', title: 'Label Panel (EN)', type: 'string' }),
        defineField({ name: 'cta', title: 'Label Botón CTA (ES)', type: 'string' }),
        defineField({ name: 'cta_en', title: 'Label CTA Button (EN)', type: 'string' }),
      ]
    }),

    defineField({
      name: 'footer',
      title: 'Contenido Footer',
      type: 'object',
      fields: [
        defineField({ name: 'description', title: 'Descripción (ES)', type: 'text', rows: 3 }),
        defineField({ name: 'description_en', title: 'Description (EN)', type: 'text', rows: 3 }),
        defineField({ name: 'nav_title', title: 'Título Navegación (ES)', type: 'string' }),
        defineField({ name: 'nav_title_en', title: 'Navigation Title (EN)', type: 'string' }),
        defineField({ name: 'cta_title', title: 'Título CTA (ES)', type: 'string' }),
        defineField({ name: 'cta_title_en', title: 'CTA Title (EN)', type: 'string' }),
        defineField({ name: 'cta_description', title: 'Descripción CTA (ES)', type: 'string' }),
        defineField({ name: 'cta_description_en', title: 'CTA Description (EN)', type: 'string' }),
        defineField({ name: 'cta_button', title: 'Texto Botón CTA (ES)', type: 'string' }),
        defineField({ name: 'cta_button_en', title: 'CTA Button Text (EN)', type: 'string' }),
        defineField({ name: 'tag', title: 'Tag Versión (ES/EN)', type: 'string' }),
        defineField({
          name: 'socialLinks',
          title: 'Redes Sociales',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'platform', title: 'Plataforma', type: 'string' }),
              defineField({ name: 'url', title: 'URL', type: 'url' }),
            ]
          }]
        })
      ]
    })
  ],
});
