import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'aboutPage',
  title: 'Página de Nosotros',
  type: 'document',
  fields: [
    defineField({
      name: 'tag',
      title: 'Nombre identificativo / Tag Sección (ES)',
      type: 'string',
    }),
    defineField({
      name: 'tag_en',
      title: 'Identification Name / Tag Section (EN)',
      type: 'string',
    }),
    defineField({
      name: 'badge',
      title: 'Pill/Badge superior (ES)',
      type: 'string',
    }),
    defineField({
      name: 'badge_en',
      title: 'Pill/Badge top (EN)',
      type: 'string',
    }),
    defineField({
      name: 'title_main',
      title: 'Título Principal (ES)',
      type: 'string',
    }),
    defineField({
      name: 'title_main_en',
      title: 'Main Title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'title_accent',
      title: 'Título Acento (ES)',
      type: 'string',
    }),
    defineField({
      name: 'title_accent_en',
      title: 'Accent Title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'intro',
      title: 'Introducción / Descripción (ES)',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'intro_en',
      title: 'Introduction / Description (EN)',
      type: 'text',
      rows: 4,
    }),

    // --- SECCIÓN PERFIL ---
    defineField({
      name: 'profile',
      title: 'Perfil del Fundador',
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

    // --- SECCIÓN VALORES ---
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
              defineField({ name: 'icon', title: 'Emoji de respaldo', type: 'string' }),
              defineField({ name: 'imageIcon', title: 'Icono Personalizado (Imagen/SVG)', type: 'image', options: { hotspot: true } }),
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
});
