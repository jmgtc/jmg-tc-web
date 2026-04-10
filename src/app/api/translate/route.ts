import { GoogleGenerativeAI } from "@google/generative-ai";
import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: "production",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: "2023-01-01",
});

export async function POST(req: Request) {
  try {
    const { documentId, title, body } = await req.json();

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.includes("tu_clave")) {
      return NextResponse.json({ error: "Falta la GEMINI_API_KEY en el servidor" }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      Eres un traductor experto en tecnología y consultoría IT. 
      Traduce el siguiente contenido del ESPAÑOL al INGLÉS manteniendo un tono profesional, elegante y corporativo (estilo Apple/Tesla).
      
      TÍTULO: ${title}
      CONTENIDO: ${body}
      
      Responde EXCLUSIVAMENTE en formato JSON con la siguiente estructura:
      {
        "translatedTitle": "...",
        "translatedBody": "..."
      }
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Limpiamos la respuesta de posibles bloques de código markdown
    const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
    const { translatedTitle, translatedBody } = JSON.parse(jsonStr);

    // Actualizamos el documento en Sanity
    await sanityClient
      .patch(documentId)
      .set({
        title_en: translatedTitle,
        body_en: [
          {
            _type: 'block',
            children: [{ _type: 'span', text: translatedBody }],
          }
        ]
      })
      .commit();

    return NextResponse.json({ success: true, title: translatedTitle });
  } catch (error: any) {
    console.error("Error en traducción IA:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
