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
    defineField({
      name: 'categories',
      title: 'Categorías',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'categories_en',
      title: 'Categories (English)',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'tags',
      title: 'Etiquetas',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'tags_en',
      title: 'Tags (English)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
});
