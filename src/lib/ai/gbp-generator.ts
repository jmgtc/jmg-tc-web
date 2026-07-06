import { GoogleGenAI } from '@google/genai';

/**
 * Abstracción para generar resúmenes comerciales para GBP usando IA.
 * Aisla la dependencia de `@google/genai` del resto del sistema.
 */
export interface GbpGenerationResult {
  text: string;
  source: 'ai' | 'fallback';
  model?: string;
  error?: string;
}

/**
 * Abstracción para generar resúmenes comerciales para GBP usando IA.
 * Aisla la dependencia de `@google/genai` del resto del sistema.
 */
export async function generateGbpSummary(title: string, content: string): Promise<GbpGenerationResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
  
  if (!apiKey) {
    console.warn(`[GBP Generator] GEMINI_API_KEY no encontrada. Usando fallback determinista.`);
    return {
      text: generateDeterministicFallback(title, content),
      source: 'fallback',
      error: 'GEMINI_API_KEY no encontrada'
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });

    const prompt = `
Eres un experto en marketing digital local y copywriter para fichas de Google Business Profile.
Tu objetivo es redactar un "post de novedad" corto, natural y atractivo a partir del contenido de un artículo del blog.

Filtros editoriales obligatorios:
1. Evitar emojis salvo que aporten valor real (máximo 1 o 2).
2. No prometer resultados garantizados ni beneficios no demostrables.
3. Mencionar "Getxo" o "Bizkaia" solo cuando encaje orgánicamente con el tema, no de forma forzada en todos los textos.
4. Variar los inicios: no empezar siempre con "¿Buscas...?" o preguntas directas.
5. Mantener un tono profesional, local, claro y comercial. Priorizar textos naturales sobre textos demasiado publicitarios.
6. No inventar servicios, cifras ni afirmaciones que no aparezcan en el artículo original.
7. Terminar con una llamada suave a leer el artículo completo (ej: "Lee el artículo completo aquí:" o "Descubre más en nuestro blog:").
8. Longitud: Unas 2 o 3 oraciones. Muy conciso y directo, sin cortar a medias.
9. Devuelve ÚNICAMENTE el texto del post, sin introducciones como "Aquí tienes..." ni opciones alternativas.

Datos del artículo:
Título: ${title}
Contenido: ${content.substring(0, 3000)}
    `.trim();

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        temperature: 0.7, // Para que haya algo de creatividad y no suene repetitivo
      }
    });

    const responseText = response.text?.trim();
    if (!responseText) {
      throw new Error('Respuesta de IA vacía');
    }
    return {
      text: responseText,
      source: 'ai',
      model: modelName
    };
  } catch (error: any) {
    console.error(`[GBP Generator] Error con modelo ${modelName}. Usando fallback determinista.`, error);
    return {
      text: generateDeterministicFallback(title, content),
      source: 'fallback',
      model: modelName,
      error: error.message || String(error)
    };
  }
}

function stripHtml(html: string): string {
  // Eliminar etiquetas HTML básicas
  return html.replace(/<[^>]*>?/gm, '');
}

function generateDeterministicFallback(title: string, content: string): string {
  // 1. Limpiar HTML
  const cleanContent = stripHtml(content).trim();
  
  // 2. Extraer el primer bloque sustancial
  let baseText = cleanContent.split('\n')[0] || title;
  
  if (!baseText || baseText.length < 50) {
     baseText = cleanContent.substring(0, 300) || title;
  }

  // 3. Cortar sin romper palabras
  const MAX_LENGTH = 180;
  if (baseText.length > MAX_LENGTH) {
    const cutText = baseText.substring(0, MAX_LENGTH);
    const lastSpace = cutText.lastIndexOf(' ');
    if (lastSpace > 0) {
      baseText = cutText.substring(0, lastSpace) + '...';
    } else {
      baseText = cutText + '...';
    }
  }

  // 4. CTA variado (sin Getxo/Bizkaia repetitivo por defecto)
  const ctas = [
    `👇 Descubre los detalles en nuestro nuevo artículo:`,
    `👉 Lee el post completo en nuestro blog:`,
    `🔗 Amplía esta información haciendo clic aquí:`
  ];
  const randomCta = ctas[Math.floor(Math.random() * ctas.length)];

  return `${baseText}\n\n${randomCta}`;
}
