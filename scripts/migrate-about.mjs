import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mfth4gqi',
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2023-01-01',
});

async function migrateAboutData() {
  console.log('🚀 Migrando datos de Nosotros a su propia página...');

  try {
    const landing = await client.fetch('*[_type == "landingPage"][0]');
    
    if (landing && landing.about) {
      const aboutData = {
        _id: 'aboutPage',
        _type: 'aboutPage',
        ...landing.about
      };

      // Limpiamos campos internos de Sanity si existen
      delete aboutData._rev;
      delete aboutData._createdAt;
      delete aboutData._updatedAt;

      await client.createOrReplace(aboutData);
      console.log('✅ Página de Nosotros creada con los datos existentes.');
    } else {
      console.log('⚠️ No se encontraron datos de Nosotros en la Landing Page.');
    }
  } catch (err) {
    console.error('❌ Error migrando datos:', err);
  }
}

migrateAboutData();
