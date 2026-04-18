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

async function seedTestClients() {
  console.log('🚀 Creando 6 clientes de prueba...');

  const testClients = [
    { _id: 'client-1', _type: 'client', name: 'Akropost', order: 1 },
    { _id: 'client-2', _type: 'client', name: 'J&C Pool Services', order: 2 },
    { _id: 'client-3', _type: 'client', name: 'Codibur', order: 3 },
    { _id: 'client-4', _type: 'client', name: 'Ribadevega', order: 4 },
    { _id: 'client-5', _type: 'client', name: 'SELEC', order: 5 },
    { _id: 'client-6', _type: 'client', name: 'NO FV', order: 6 },
  ];

  try {
    for (const c of testClients) {
      await client.createOrReplace(c);
      console.log(`✅ Cliente "${c.name}" creado.`);
    }
    console.log('✨ Clientes de prueba listos.');
  } catch (err) {
    console.error('❌ Error al crear clientes:', err);
  }
}

seedTestClients();
