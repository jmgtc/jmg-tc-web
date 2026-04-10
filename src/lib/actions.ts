"use server";

export async function submitContactForm(formData: FormData) {
  const data = {
    nombre: formData.get("nombre"),
    email: formData.get("email"),
    telefono: formData.get("telefono"),
    servicio: formData.get("servicio"),
    mensaje: formData.get("mensaje"),
  };

  // Simulación de envío / Procesamiento funcional
  console.log("Nuevo Lead Recibido:", data);

  // Aquí iría la integración con Resend, SendGrid o base de datos
  // Por ahora simulamos un retraso de red
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return { success: true, message: "Gracias. Jose se pondrá en contacto contigo pronto." };
}
