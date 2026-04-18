import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

const translations = [
  {
    id: "9494-claude-ia-avanzada",
    title_en: "Claude Integrates Automatic File Creation with Advanced AI",
    body_en_updates: [
      { text: "Anthropic", replacement: "Anthropic" },
      { text: " ha dado un paso audaz al integrar en ", replacement: " has taken a bold step by integrating into " },
      { text: "Claude", replacement: "Claude" },
      { text: " la capacidad de ", replacement: " the capability of " },
      { text: "crear archivos automáticamente", replacement: "creating files automatically" },
      { text: ". Esta nueva función, denominada ", replacement: ". This new feature, called " },
      { text: "Artifacts", replacement: "Artifacts" },
      { text: ", permite a los usuarios visualizar, editar y refinar contenido generado por la IA en tiempo real, desde código y documentos hasta diagramas y sitios web.", replacement: ", allows users to view, edit, and refine AI-generated content in real-time, from code and documents to diagrams and websites." }
    ]
  },
  {
    id: "9493-google-chrome-ia-integrada",
    title_en: "Google Chrome Reinvents Itself with Integrated Artificial Intelligence",
    body_en_updates: [
      { text: "El navegador más popular del mundo, ", replacement: "The world's most popular browser, " },
      { text: "Google Chrome", replacement: "Google Chrome" },
      { text: ", está experimentando su mayor transformación tecnológica con la integración nativa de ", replacement: ", is undergoing its greatest technological transformation with the native integration of " },
      { text: "Gemini", replacement: "Gemini" },
      { text: ". Estas nuevas capacidades de IA buscan simplificar la navegación y potenciar la productividad de millones de usuarios.", replacement: ". These new AI capabilities aim to simplify navigation and boost productivity for millions of users." }
    ]
  }
];

// Función para actualizar el texto dentro de los bloques de PortableText manteniendo la estructura
async function translateBlocks(postId, titleEn, textMappings) {
  const post = await client.fetch(`*[_id == $id][0]`, { id: postId });
  if (!post || !post.body_en) return;

  const updatedBody = post.body_en.map(block => {
    if (block._type === 'block') {
      return {
        ...block,
        children: block.children.map(child => {
          let newText = child.text;
          textMappings.forEach(mapping => {
            newText = newText.replace(mapping.text, mapping.replacement);
          });
          return { ...child, text: newText };
        })
      };
    }
    return block;
  });

  await client.patch(postId).set({
    title_en: titleEn,
    body_en: updatedBody
  }).commit();
  console.log(`✅ Translated content for: ${titleEn}`);
}

async function runBatch() {
  for (const trans of translations) {
    await translateBlocks(trans.id, trans.title_en, trans.body_en_updates);
  }
}

runBatch().catch(console.error);
