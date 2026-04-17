import { NextRequest, NextResponse } from "next/server";

export const dynamic = 'force-dynamic'

const SYSTEM_PROMPT = `Eres el Asistente Virtual de JMG Tech Consulting, una consultora tecnológica especializada en:

1. **Gestión Informática**: Infraestructura IT, soporte técnico, diagnóstico de sistemas, mantenimiento preventivo y correctivo.
2. **Desarrollo Web y Apps**: Webs corporativas, tiendas online, aplicaciones a medida, con tecnologías como Next.js, WordPress.
3. **ConsultorIA (Automatización con IA)**: Automatización de procesos empresariales con IA, implementación de agentes, flujos inteligentes, reducción de trabajo manual.

Tu misión es:
- Saludar de forma cálida y profesional.
- Entender qué necesita el usuario con preguntas cortas y concretas.
- Identificar cuál de los 3 servicios se adapta mejor a su problema.
- Calificar el lead: preguntar por el tipo de empresa, urgencia y presupuesto aproximado si el contexto lo permite.
- Terminar siempre invitando a agendar una cita o dejando un email de contacto.

Reglas:
- Responde siempre en español.
- Sé conciso (máximo 3-4 frases por respuesta).
- Sé amigable pero profesional — estilo "Tesla × Apple": directo, elegante, sin relleno.
- Nunca inventes precios ni garantías.
- Si no sabes algo específico, di que Jose lo aclarará en la reunión.
- El email de contacto es: info@jmg-tc.com
- La URL para agendar cita es: https://jmg-tc.com/reservar

Empieza siempre con: "¡Hola! Soy el asistente de JMG Tech Consulting. ¿En qué puedo ayudarte hoy?"`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const demoMode = process.env.NEXT_PUBLIC_AI_DEMO_MODE === "true";

    if (demoMode) {
      const lastMsg = messages[messages.length - 1].content.toLowerCase();
      let response = "Entendido. Para poder asesorarte mejor, ¿qué tipo de empresa tienes y cuál es tu prioridad tecnológica principal ahora mismo?";
      
      if (lastMsg.includes("web") || lastMsg.includes("página")) {
        response = "Perfecto, en JMG-TC creamos webs de alto rendimiento. ¿Buscas una web corporativa nueva o mejorar una existente?";
      } else if (lastMsg.includes("automatizar") || lastMsg.includes("ia")) {
        response = "La automatización con IA es nuestra especialidad. ¿Qué proceso repetitivo te gustaría eliminar primero en tu día a día?";
      } else if (lastMsg.includes("empresa") || lastMsg.includes("negocio")) {
        response = "Excelente. Jose suele trabajar directamente con gerentes para optimizar la IT. ¿Te gustaría agendar una breve llamada para analizar tu caso?";
      }

      return NextResponse.json({ message: response + " (Modo Demo Activo)" });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === "tu_clave_aqui_para_activar_ia" || apiKey === "tu_api_key_aqui") {
      return NextResponse.json({ 
        error: "Configuración incompleta",
        debug: "FALTA GEMINI_API_KEY. Ve a Vercel > Settings > Environment Variables y añade tu clave real de AI Studio." 
      }, { status: 500 });
    }

    // Importación dinámica para consistencia y estabilidad en build
    const { GoogleGenerativeAI } = await import("@google/generative-ai");
    
    // Restauramos el comportamiento por defecto (que usa v1beta internamente)
    // Las claves de nueva generación (2025/2026) SOLO tienen modelos en estado 'preview' en v1beta.
    const genAI = new GoogleGenerativeAI(apiKey);
    let modelName = process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-1.5-flash"; 
    
    let model = genAI.getGenerativeModel({
      model: modelName, 
      systemInstruction: SYSTEM_PROMPT,
    });

    const rawHistory = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const history = rawHistory.length > 0 && rawHistory[0].role === 'model' 
      ? rawHistory.slice(1) 
      : rawHistory;

    let chat = model.startChat({ history });
    const lastMessage = messages[messages.length - 1].content;
    const result = await chat.sendMessage(lastMessage);
    const text = result.response.text();
    return NextResponse.json({ message: text });

  } catch (error: any) {
    let googleErrorMessage = error.message || "Error desconocido en el motor de IA";
    
    // AUTO-REPARACIÓN DE GAMA ALTA:
    if (googleErrorMessage.includes("404 Not Found") && googleErrorMessage.includes("models/")) {
      try {
        const modelsRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
        const modelsData = await modelsRes.json();
        
        if (modelsData.models) {
          const availableModels = modelsData.models
            .map((m: any) => m.name.replace("models/", ""))
            .filter((n: string) => n.includes("gemini") && !n.includes("embedding") && !n.includes("tts") && !n.includes("audio") && !n.includes("robotics") && n.includes("flash"));

          if (availableModels.length > 0) {
            const fallbackModel = availableModels[0]; 
            
            const { GoogleGenerativeAI } = await import("@google/generative-ai");
            const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
            const model = genAI.getGenerativeModel({ model: fallbackModel, systemInstruction: SYSTEM_PROMPT });
            
            const { messages } = await req.clone().json();
            const rawHistory = messages.slice(0, -1).map((m: { role: string; content: string }) => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: m.content }],
            }));
            const history = rawHistory.length > 0 && rawHistory[0].role === 'model' ? rawHistory.slice(1) : rawHistory;
            const chat = model.startChat({ history });
            const lastMessage = messages[messages.length - 1].content;

            const retryResult = await chat.sendMessage(lastMessage);
            
            return NextResponse.json({ message: retryResult.response.text() });
          }
        }
      } catch (e) {
        console.error("Fallo al intentar auto-recuperación de modelo", e);
      }
    }

    console.error("AI Concierge detailed error:", error);
    return NextResponse.json({ 
      error: "Error interno",
      debug: `[Google AI Error]: ${googleErrorMessage}`
    }, { status: 500 });
  }
}
