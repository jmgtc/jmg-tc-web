"use server";

import prisma from "@/lib/prisma";

const TELEGRAM_TOKEN = "8647083801:AAGu0cDHos0J2hPmNkLIEcsY6-4BBLsLX6g";
const TELEGRAM_CHAT_ID = "8799574323";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("nombre") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("telefono") as string;
  const service = formData.get("servicio") as string;
  const message = formData.get("mensaje") as string;

  try {
    // 1. Guardar en Base de Datos
    console.log("Intentando guardar lead en DB...");
    const lead = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone,
        service,
        message,
      },
    });
    console.log("Lead guardado con ID:", lead.id);

    // 2. Notificación en Telegram
    console.log("Enviando notificación a Telegram...");
    const telegramMessage = `
🚀 *¡Nuevo Lead en JMG Tech!*

👤 *Nombre:* ${name}
📧 *Email:* ${email}
📞 *Teléfono:* ${phone || 'No proporcionado'}
🛠️ *Servicio:* ${service}

📝 *Mensaje:*
${message}

---
_ID Registro: ${lead.id}_
    `;

    const telegramRes = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: 'Markdown',
      }),
    });

    const telegramData = await telegramRes.json();
    console.log("Respuesta de Telegram:", telegramData);

    if (!telegramRes.ok) {
      throw new Error(`Telegram Error: ${telegramData.description}`);
    }

    return { 
      success: true, 
      message: "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto." 
    };
  } catch (error) {
    console.error("Error procesando contacto:", error);
    return { 
      success: false, 
      message: "Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo." 
    };
  }
}
