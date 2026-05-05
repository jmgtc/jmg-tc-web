import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: "2023-01-01",
});

export async function POST(req: Request) {
  try {
    const reqBody = await req.json();
    const { documentId, title, body } = reqBody;

    const apiKey = process.env.DEEPL_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Falta la DEEPL_API_KEY en el servidor" }, { status: 500 });
    }

    const isFree = apiKey.endsWith(":fx");
    const baseUrl = isFree 
      ? "https://api-free.deepl.com/v2/translate" 
      : "https://api.deepl.com/v2/translate";

    // 1. Preparar la estructura
    let translatedTitle = title || '';
    const translatedBody = Array.isArray(body) ? structuredClone(body) : [];
    
    // 2. Extraer los textos a traducir
    const textsToTranslate: { ref: any, property: string, text: string }[] = [];
    
    if (title && title.trim().length > 0) {
      textsToTranslate.push({ ref: null, property: 'title', text: title });
    }

    if (Array.isArray(translatedBody)) {
      for (const block of translatedBody) {
        if (block._type === 'block' && Array.isArray(block.children)) {
          for (const child of block.children) {
            if (child._type === 'span' && typeof child.text === 'string' && child.text.trim().length > 0) {
              textsToTranslate.push({ ref: child, property: 'text', text: child.text });
            }
          }
        }
      }
    }

    // Si no hay nada que traducir, devolvemos success temprano
    if (textsToTranslate.length === 0) {
      return NextResponse.json({ success: true, translatedTitle, translatedBody });
    }

    // 3. Enviar a DeepL (Chunking para evitar límite de 50 textos por request)
    const MAX_TEXTS_PER_REQUEST = 50;
    const translations: any[] = [];

    for (let i = 0; i < textsToTranslate.length; i += MAX_TEXTS_PER_REQUEST) {
      const chunk = textsToTranslate.slice(i, i + MAX_TEXTS_PER_REQUEST);
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: {
          "Authorization": `DeepL-Auth-Key ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: chunk.map(t => t.text),
          target_lang: "EN-US"
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error(`DeepL API Error (chunk ${i}):`, errorData);
        throw new Error("Error en la API de DeepL");
      }

      const chunkData = await response.json();
      
      if (!chunkData.translations || chunkData.translations.length !== chunk.length) {
        throw new Error("Respuesta inválida o incompleta de DeepL");
      }

      translations.push(...chunkData.translations);
    }

    // 4. Reinsertar las traducciones en la estructura original
    translations.forEach((translation: any, index: number) => {
      const item = textsToTranslate[index];
      if (item.ref === null) {
        translatedTitle = translation.text;
      } else {
        item.ref[item.property] = translation.text;
      }
    });

    // 5. Actualizamos el documento en Sanity (Solo si se solicita)
    const shouldPatch = reqBody.patchDocument !== false;
    
    if (shouldPatch && documentId) {
      try {
        await sanityClient
          .patch(documentId)
          .set({
            title_en: translatedTitle,
            body_en: translatedBody
          })
          .commit();
      } catch (patchError) {
        console.warn("Could not patch document directly (might not exist yet):", patchError);
      }
    }

    return NextResponse.json({ 
      success: true, 
      title: translatedTitle,
      translatedTitle,
      translatedBody 
    });
  } catch (error: any) {
    console.error("Error en traducción automática:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
