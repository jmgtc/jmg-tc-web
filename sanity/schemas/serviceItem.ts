import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'serviceItem',
  title: 'Servicio',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Título (ES)', type: 'string' }),
    defineField({ name: 'title_en', title: 'Title (EN)', type: 'string' }),
    defineField({ name: 'tag', title: 'Tag (ES) (ej: Module_Servicios // IT)', type: 'string' }),
    defineField({ name: 'tag_en', title: 'Tag (EN)', type: 'string' }),
    defineField({ name: 'description', title: 'Descripción (ES)', type: 'text', rows: 3 }),
    defineField({ name: 'description_en', title: 'Description (EN)', type: 'text', rows: 3 }),
    defineField({
      name: 'features',
      title: 'Características (ES)',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'features_en',
      title: 'Features (EN)',
      type: 'array',
      of: [{ type: 'string' }]
    }),
    defineField({
      name: 'phases',
      title: 'Fases/Pasos (Opcional)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'label', title: 'Etiqueta (ES)', type: 'string' }),
          defineField({ name: 'label_en', title: 'Label (EN)', type: 'string' }),
          defineField({ name: 'desc', title: 'Descripción corta (ES)', type: 'string' }),
          defineField({ name: 'desc_en', title: 'Short description (EN)', type: 'string' }),
        ]
      }]
    }),
    defineField({ name: 'price', title: 'Precio (en céntimos, ej: 29900 para 299€)', type: 'number' }),
    defineField({ name: 'priceLabel', title: 'Etiqueta de Precio (ej: Desde)', type: 'string' }),
    defineField({ name: 'priceLabel_en', title: 'Price Label (EN)', type: 'string' }),
    defineField({ name: 'cta', title: 'Texto Botón CTA (ES)', type: 'string' }),
    defineField({ name: 'cta_en', title: 'CTA Button Text (EN)', type: 'string' }),
    defineField({ name: 'dark', title: 'Modo Oscuro', type: 'boolean', initialValue: false }),
    defineField({ name: 'icon_image', title: 'Icono / Imagen del Servicio', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'order', title: 'Orden de visualización', type: 'number' }),
  ],
});
