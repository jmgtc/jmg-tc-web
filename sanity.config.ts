import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';
import { TranslateAction } from './sanity/actions/TranslateAction';

// Define singleton types
const singletonTypes = new Set(['landingPage', 'servicesPage', 'aboutPage', 'contactPage', 'siteSettings']);

export default defineConfig({
  name: 'default',
  title: 'JMG Tech Consulting Studio',

  projectId: 'mfth4gqi',
  dataset: 'production',

  basePath: '/admin',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Gestión de Contenido')
          .items([
            // Regular documents
            S.listItem()
              .title('Artículos (Blog)')
              .child(S.documentTypeList('post').title('Todos los Artículos')),
            
            S.divider(),

            // Singletons
            S.listItem()
              .title('Página de Inicio')
              .child(
                S.document()
                  .schemaType('landingPage')
                  .documentId('landingPage')
              ),
            S.listItem()
              .title('Página de Servicios')
              .child(
                S.document()
                  .schemaType('servicesPage')
                  .documentId('servicesPage')
              ),
            S.listItem()
              .title('Página de Nosotros')
              .child(
                S.document()
                  .schemaType('aboutPage')
                  .documentId('aboutPage')
              ),
            S.listItem()
              .title('Página de Contacto')
              .child(
                S.document()
                  .schemaType('contactPage')
                  .documentId('contactPage')
              ),
            
            S.divider(),

            S.listItem()
              .title('Ajustes Globales')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            
            // Filter out singleton types from the "all types" list
            ...S.documentTypeListItems().filter(
              (listItem) => !singletonTypes.has(listItem.getId() || '') && listItem.getId() !== 'post'
            ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Filter out singleton types from the global “New document” menu
    templates: (prev) =>
      prev.filter((template) => !singletonTypes.has(template.schemaType)),
  },

  document: {
    actions: (prev, context) => {
      // Add Translate action to posts
      let actions = prev;
      if (context.schemaType === 'post') {
        actions = [...prev, TranslateAction];
      }

      // For singletons, remove "Delete" and "Duplicate" as they don't make sense
      if (singletonTypes.has(context.schemaType)) {
        return actions.filter(({ action }) => action !== 'delete' && action !== 'duplicate' && action !== 'unpublish');
      }

      return actions;
    },
  },
});
