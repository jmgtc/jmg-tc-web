import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'legalPage',
  title: 'Páginas Legales',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título (ES)',
      type: 'string',
    }),
    defineField({
      name: 'title_en',
      title: 'Title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'content',
      title: 'Contenido (ES)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'content_en',
      title: 'Contenido (EN)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
  ],
});
