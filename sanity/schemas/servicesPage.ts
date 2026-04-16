import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'servicesPage',
  title: 'Página de Servicios',
  type: 'document',
  fields: [
    defineField({
      name: 'header',
      title: 'Cabecera de la Página',
      type: 'object',
      fields: [
        defineField({ name: 'tag', title: 'Tag (ES)', type: 'string' }),
        defineField({ name: 'tag_en', title: 'Tag (EN)', type: 'string' }),
        defineField({ name: 'title', title: 'Título (ES)', type: 'string' }),
        defineField({ name: 'title_en', title: 'Title (EN)', type: 'string' }),
        defineField({ name: 'description', title: 'Descripción (ES)', type: 'text', rows: 3 }),
        defineField({ name: 'description_en', title: 'Description (EN)', type: 'text', rows: 3 }),
      ]
    }),
  ],
});
