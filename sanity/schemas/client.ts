import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'client',
  title: 'Cliente',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Nombre del Cliente', type: 'string' }),
    defineField({ name: 'logo', title: 'Logo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Orden', type: 'number' }),
  ],
});
