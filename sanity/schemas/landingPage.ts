import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'landingPage',
  title: 'Página de Inicio',
  type: 'document',
  fields: [
    // --- HERO SECTION ---
    defineField({
      name: 'hero',
      title: 'Sección Hero',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge (ES)', type: 'string' }),
        defineField({ name: 'badge_en', title: 'Badge (EN)', type: 'string' }),
        defineField({ name: 'tag', title: 'Tag / Guía (ES)', type: 'string' }),
        defineField({ name: 'tag_en', title: 'Tag / Guide (EN)', type: 'string' }),
        defineField({ name: 'title', title: 'Título Blanco (ES)', type: 'string' }),
        defineField({ name: 'title_en', title: 'White Title (EN)', type: 'string' }),
        defineField({ name: 'title_highlight', title: 'Título Gradiente (ES)', type: 'string' }),
        defineField({ name: 'title_highlight_en', title: 'Gradient Title (EN)', type: 'string' }),
        defineField({ name: 'subtitle', title: 'Subtítulo (ES)', type: 'text', rows: 3 }),
        defineField({ name: 'subtitle_en', title: 'Subtitle (EN)', type: 'text', rows: 3 }),
        defineField({ name: 'cta', title: 'Texto Botón CTA (ES)', type: 'string' }),
        defineField({ name: 'cta_en', title: 'CTA Button Text (EN)', type: 'string' }),
        defineField({ name: 'image', title: 'Imagen Principal / Fondo', type: 'image', options: { hotspot: true } }),
      ],
    }),

    // --- SERVICES HIGHLIGHTS ---
    defineField({
      name: 'services_highlights',
      title: 'Destacados de Servicios',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge (ES)', type: 'string' }),
        defineField({ name: 'badge_en', title: 'Badge (EN)', type: 'string' }),
        defineField({ name: 'tag', title: 'Tag / Guía (ES)', type: 'string' }),
        defineField({ name: 'tag_en', title: 'Tag / Guide (EN)', type: 'string' }),
        defineField({ name: 'title', title: 'Título Sección (ES)', type: 'string' }),
        defineField({ name: 'title_en', title: 'Section Title (EN)', type: 'string' }),
        defineField({ name: 'description', title: 'Descripción Sección (ES)', type: 'text', rows: 2 }),
        defineField({ name: 'description_en', title: 'Section Description (EN)', type: 'text', rows: 2 }),
      ],
    }),

    // --- CONSULTOR IA SECTION ---
    defineField({
      name: 'consultoria_ia',
      title: 'Sección ConsultorIA',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge (ES)', type: 'string' }),
        defineField({ name: 'badge_en', title: 'Badge (EN)', type: 'string' }),
        defineField({ name: 'tag', title: 'Tag (ES)', type: 'string' }),
        defineField({ name: 'tag_en', title: 'Tag (EN)', type: 'string' }),
        defineField({ name: 'title', title: 'Título (ES)', type: 'string' }),
        defineField({ name: 'title_en', title: 'Title (EN)', type: 'string' }),
        defineField({ name: 'highlight', title: 'Palabra Resaltada (ES)', type: 'string' }),
        defineField({ name: 'highlight_en', title: 'Highlighted Word (EN)', type: 'string' }),
        defineField({ name: 'description', title: 'Descripción (ES)', type: 'text', rows: 3 }),
        defineField({ name: 'description_en', title: 'Description (EN)', type: 'text', rows: 3 }),
        defineField({
          name: 'phases',
          title: 'Fases/Pasos',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({ name: 'num', title: 'Número (ej: 01)', type: 'string' }),
              defineField({ name: 'label', title: 'Etiqueta (ES)', type: 'string' }),
              defineField({ name: 'label_en', title: 'Label (EN)', type: 'string' }),
              defineField({ name: 'desc', title: 'Descripción (ES)', type: 'text', rows: 2 }),
              defineField({ name: 'desc_en', title: 'Description (EN)', type: 'text', rows: 2 }),
            ]
          }]
        })
      ]
    }),

    // --- PODCAST SECTION ---
    defineField({
      name: 'podcast_section',
      title: 'Sección de Podcast',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge (ES)', type: 'string' }),
        defineField({ name: 'badge_en', title: 'Badge (EN)', type: 'string' }),
        defineField({ name: 'tag', title: 'Tag / Guía (ES)', type: 'string' }),
        defineField({ name: 'tag_en', title: 'Tag / Guide (EN)', type: 'string' }),
        defineField({ name: 'title', title: 'Título Sección (ES)', type: 'string' }),
        defineField({ name: 'title_en', title: 'Section Title (EN)', type: 'string' }),
        defineField({ name: 'description', title: 'Descripción Sección (ES)', type: 'text', rows: 3 }),
        defineField({ name: 'description_en', title: 'Section Description (EN)', type: 'text', rows: 3 }),
        defineField({ name: 'spotify_url', title: 'URL de Embed Spotify', type: 'string', description: 'Ej: https://open.spotify.com/embed/show/...' }),
      ]
    }),

    // --- BLOG HIGHLIGHTS ---
    defineField({
      name: 'blog_highlights',
      title: 'Sección Highlights de Blog',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge (ES)', type: 'string' }),
        defineField({ name: 'badge_en', title: 'Badge (EN)', type: 'string' }),
        defineField({ name: 'tag', title: 'Tag Sección (ES/EN)', type: 'string' }),
        defineField({ name: 'title', title: 'Título Sección (ES)', type: 'string' }),
        defineField({ name: 'title_en', title: 'Section Title (EN)', type: 'string' }),
        defineField({ name: 'view_all', title: 'Texto Ver Todos (ES)', type: 'string' }),
        defineField({ name: 'view_all_en', title: 'View All Text (EN)', type: 'string' }),
      ]
    }),

    // --- CLIENTS SECTION ---
    defineField({
      name: 'clients_section',
      title: 'Sección de Clientes',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge (ES)', type: 'string' }),
        defineField({ name: 'badge_en', title: 'Badge (EN)', type: 'string' }),
        defineField({ name: 'tag', title: 'Tag / Guía (ES)', type: 'string' }),
        defineField({ name: 'tag_en', title: 'Tag / Guide (EN)', type: 'string' }),
        defineField({ name: 'title', title: 'Título Sección (ES)', type: 'string' }),
        defineField({ name: 'title_en', title: 'Section Title (EN)', type: 'string' }),
      ]
    }),

    // --- GLOBAL CTA ---
    defineField({
      name: 'cta_section',
      title: 'Sección Llamada a la Acción (Final)',
      type: 'object',
      fields: [
        defineField({ name: 'badge', title: 'Badge (ES)', type: 'string' }),
        defineField({ name: 'badge_en', title: 'Badge (EN)', type: 'string' }),
        defineField({ name: 'tag', title: 'Tag / Guía (ES)', type: 'string' }),
        defineField({ name: 'tag_en', title: 'Tag / Guide (EN)', type: 'string' }),
        defineField({ name: 'title', title: 'Título (ES)', type: 'string' }),
        defineField({ name: 'title_en', title: 'Title (EN)', type: 'string' }),
        defineField({ name: 'button_text', title: 'Texto Botón (ES)', type: 'string' }),
        defineField({ name: 'button_text_en', title: 'Button Text (EN)', type: 'string' }),
      ]
    })
  ],
});
