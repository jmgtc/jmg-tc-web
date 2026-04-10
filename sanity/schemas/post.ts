import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Artículos (Blog)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título (Español)',
      type: 'string',
    }),
    defineField({
      name: 'title_en',
      title: 'Title (English)',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Contenido (Español)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'body_en',
      title: 'Content (English)',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de publicación',
      type: 'datetime',
    }),
  ],
});
