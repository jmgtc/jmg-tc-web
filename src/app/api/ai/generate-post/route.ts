import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { title } = await req.json();

    if (!title) {
      return NextResponse.json({ error: "Falta el título" }, { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY.includes("tu_clave")) {
      return NextResponse.json({ error: "Configura GEMINI_API_KEY en .env.local" }, { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `
      Eres un experto redactor de tecnología para JMG Tech Consulting.
      Escribe un artículo de blog profesional, atractivo y detallado en ESPAÑOL basado en el siguiente título: "${title}".
      
      El formato debe ser un array de bloques compatibles con Sanity PortableText.
      Cada bloque debe ser un objeto con:
      - _type: "block"
      - style: "normal" (o "h2", "h3" para subtítulos)
      - children: [{ _type: "span", text: "..." }]
      
      Escribe al menos 4 secciones con subtítulos (h2). 
      Incluye una introducción y una conclusión.
      El tono debe ser innovador, técnico pero accesible, y premium.
      
      Responde ÚNICAMENTE con el JSON del array de bloques. Sin markdown, sin explicaciones.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Limpiar posibles bloques de código markdown de la respuesta de la IA
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    try {
      const body = JSON.parse(text);
      return NextResponse.json({ success: true, body });
    } catch (parseError) {
      console.error("Error parsing AI response:", text);
      return NextResponse.json({ error: "La IA generó un formato inválido", raw: text }, { status: 500 });
    }
  } catch (error: any) {
    console.error("Error en generación con IA:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
