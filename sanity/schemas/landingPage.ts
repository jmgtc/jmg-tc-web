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

    // --- ABOUT/NOSOTROS SECTION ---
    defineField({
      name: 'about',
      title: 'Sección Nosotros',
      type: 'object',
      fields: [
        defineField({ name: 'tag', title: 'Tag Sección (ES)', type: 'string' }),
        defineField({ name: 'tag_en', title: 'Tag Section (EN)', type: 'string' }),
        defineField({ name: 'title_main', title: 'Título Principal (ES)', type: 'string' }),
        defineField({ name: 'title_main_en', title: 'Main Title (EN)', type: 'string' }),
        defineField({ name: 'title_accent', title: 'Título Acento (ES)', type: 'string' }),
        defineField({ name: 'title_accent_en', title: 'Accent Title (EN)', type: 'string' }),
        defineField({ name: 'intro', title: 'Introducción (ES)', type: 'text', rows: 4 }),
        defineField({ name: 'intro_en', title: 'Introduction (EN)', type: 'text', rows: 4 }),
        defineField({
          name: 'profile',
          title: 'Perfil Fundador',
          type: 'object',
          fields: [
            defineField({ name: 'tag', title: 'Tag Perfil (ES)', type: 'string' }),
            defineField({ name: 'tag_en', title: 'Profile Tag (EN)', type: 'string' }),
            defineField({ name: 'name', title: 'Nombre', type: 'string' }),
            defineField({ name: 'role', title: 'Cargo (ES)', type: 'string' }),
            defineField({ name: 'role_en', title: 'Role (EN)', type: 'string' }),
            defineField({ name: 'bio', title: 'Biografía (ES)', type: 'text', rows: 4 }),
            defineField({ name: 'bio_en', title: 'Bio (EN)', type: 'text', rows: 4 }),
            defineField({ name: 'photo', title: 'Foto de Perfil', type: 'image', options: { hotspot: true } }),
          ]
        }),
        defineField({
          name: 'values',
          title: 'Nuestros Valores',
          type: 'object',
          fields: [
            defineField({ name: 'tag', title: 'Tag Valores (ES)', type: 'string' }),
            defineField({ name: 'tag_en', title: 'Values Tag (EN)', type: 'string' }),
            defineField({ name: 'title', title: 'Título Valores (ES)', type: 'string' }),
            defineField({ name: 'title_en', title: 'Values Title (EN)', type: 'string' }),
            defineField({
              name: 'items',
              title: 'Lista de Valores',
              type: 'array',
              of: [{
                type: 'object',
                fields: [
                  defineField({ name: 'icon', title: 'Emoji/Icono', type: 'string' }),
                  defineField({ name: 'label', title: 'Título (ES)', type: 'string' }),
                  defineField({ name: 'label_en', title: 'Title (EN)', type: 'string' }),
                  defineField({ name: 'desc', title: 'Descripción (ES)', type: 'text', rows: 2 }),
                  defineField({ name: 'desc_en', title: 'Description (EN)', type: 'text', rows: 2 }),
                ]
              }]
            })
          ]
        })
      ],
    }),

    // --- BLOG HIGHLIGHTS ---
    defineField({
      name: 'blog_highlights',
      title: 'Sección Highlights de Blog',
      type: 'object',
      fields: [
        defineField({ name: 'tag', title: 'Tag Sección (ES/EN)', type: 'string' }),
        defineField({ name: 'title', title: 'Título Sección (ES)', type: 'string' }),
        defineField({ name: 'title_en', title: 'Section Title (EN)', type: 'string' }),
        defineField({ name: 'view_all', title: 'Texto Ver Todos (ES)', type: 'string' }),
        defineField({ name: 'view_all_en', title: 'View All Text (EN)', type: 'string' }),
      ]
    }),

    // --- GLOBAL CTA ---
    defineField({
      name: 'cta_section',
      title: 'Sección Llamada a la Acción (Final)',
      type: 'object',
      fields: [
        defineField({ name: 'title', title: 'Título (ES)', type: 'string' }),
        defineField({ name: 'title_en', title: 'Title (EN)', type: 'string' }),
        defineField({ name: 'button_text', title: 'Texto Botón (ES)', type: 'string' }),
        defineField({ name: 'button_text_en', title: 'Button Text (EN)', type: 'string' }),
      ]
    })
  ],
});
