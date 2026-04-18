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
    // 1. Intentar Telegram PRIMERO para no perder el lead si falla la DB
    const telegramMessage = `
🚀 *¡Nuevo Lead en JMG Tech!*

👤 *Nombre:* ${name}
📧 *Email:* ${email}
📞 *Teléfono:* ${phone || 'No proporcionado'}
🛠️ *Servicio:* ${service}

📝 *Mensaje:*
${message}
    `;

    try {
      await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: 'Markdown',
        }),
      });
    } catch (e) {
      console.error("Telegram Falló:", e);
    }

    // 2. Guardar en Base de Datos
    try {
      await prisma.contactMessage.create({
        data: { name, email, phone, service, message },
      });
    } catch (dbError) {
      console.error("Base de datos falló:", dbError);
      // No lanzamos error aquí para que el usuario crea que se envió (ya que tenemos el Telegram)
    }

    return { 
      success: true, 
      message: "¡Mensaje enviado con éxito!" 
    };
  } catch (error) {
    console.error("Error crítico:", error);
    return { 
      success: false, 
      message: "Error de conexión." 
    };
  }
}
