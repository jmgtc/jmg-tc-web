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

async function updateLandingClients() {
  console.log('🚀 Actualizando etiquetas y títulos de la sección Clientes...');

  try {
    // Solo actualizamos la parte de clients_section para no machacar todo si el usuario ha editado algo
    // Pero como es un script de configuración, usaremos un patch o sobreescribiremos el campo específico
    
    const landing = await client.fetch('*[_type == "landingPage"][0]');
    
    if (landing) {
      await client
        .patch(landing._id)
        .set({
          clients_section: {
            tag: 'Sección 06 // Clientes',
            tag_en: 'Section 06 // Clients',
            title: 'Nuestros Clientes',
            title_en: 'Our Clients',
          }
        })
        .commit();
      console.log('✅ Etiquetas actualizadas con el formato "Sección 06".');
    }
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

updateLandingClients();
