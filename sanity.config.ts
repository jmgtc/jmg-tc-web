import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './sanity/schemas';
import { TranslateAction } from './sanity/actions/TranslateAction';

export default defineConfig({
  name: 'default',
  title: 'JMG Tech Consulting Studio',

  projectId: 'mfth4gqi',
  dataset: 'production',

  basePath: '/admin',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, context) => {
      return context.schemaType === 'post' ? [...prev, TranslateAction] : prev;
    },
  },
});
