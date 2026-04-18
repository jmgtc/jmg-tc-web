import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'contactPage',
  title: 'Página de Contacto',
  type: 'document',
  fields: [
    // Campos en la raíz para compatibilidad y simplicidad
    defineField({ name: 'title', title: 'Título Principal (ES)', type: 'string' }),
    defineField({ name: 'title_en', title: 'Title Principal (EN)', type: 'string' }),
    defineField({ name: 'title_accent', title: 'Acento Título (ES)', type: 'string' }),
    defineField({ name: 'title_accent_en', title: 'Title Accent (EN)', type: 'string' }),
    defineField({ name: 'description', title: 'Descripción (ES)', type: 'text', rows: 3 }),
    defineField({ name: 'description_en', title: 'Description (EN)', type: 'text', rows: 3 }),
    defineField({ name: 'email', title: 'Email Público', type: 'string' }),
    defineField({ name: 'phone', title: 'Teléfono Público', type: 'string' }),
    defineField({ name: 'address', title: 'Dirección / Ubicación', type: 'string' }),
    defineField({ name: 'tag', title: 'Tag de Página (ES/EN)', type: 'string' }),
    defineField({ name: 'badge', title: 'Badge superior (ES)', type: 'string' }),
    defineField({ name: 'badge_en', title: 'Badge top (EN)', type: 'string' }),
    
    // --- INFO COLUMN (Mantenido por si se usa en el frontend) ---
    defineField({
      name: 'info',
      title: 'Configuración Adicional Información',
      type: 'object',
      fields: [
        defineField({ name: 'appointment_url', title: 'URL Reserva Cita', type: 'string' }),
        defineField({ name: 'appointment_label', title: 'Texto Link Cita (ES)', type: 'string' }),
        defineField({ name: 'appointment_label_en', title: 'Appointment Link Text (EN)', type: 'string' }),
      ]
    }),

    // --- FORM LABELS ---
    defineField({
      name: 'form',
      title: 'Textos del Formulario',
      type: 'object',
      fields: [
        defineField({ name: 'tag', title: 'Tag Formulario (ES/EN)', type: 'string' }),
        defineField({ name: 'label_name', title: 'Label Nombre (ES)', type: 'string' }),
        defineField({ name: 'label_name_en', title: 'Label Name (EN)', type: 'string' }),
        defineField({ name: 'label_email', title: 'Label Email (ES)', type: 'string' }),
        defineField({ name: 'label_email_en', title: 'Label Email (EN)', type: 'string' }),
        defineField({ name: 'label_phone', title: 'Label Teléfono (ES)', type: 'string' }),
        defineField({ name: 'label_phone_en', title: 'Label Phone (EN)', type: 'string' }),
        defineField({ name: 'label_service', title: 'Label Servicio (ES)', type: 'string' }),
        defineField({ name: 'label_service_en', title: 'Label Service (EN)', type: 'string' }),
        defineField({ name: 'label_message', title: 'Label Mensaje (ES)', type: 'string' }),
        defineField({ name: 'label_message_en', title: 'Label Message (EN)', type: 'string' }),
        defineField({ name: 'ph_name', title: 'Placeholder Nombre (ES)', type: 'string' }),
        defineField({ name: 'ph_name_en', title: 'Placeholder Name (EN)', type: 'string' }),
        defineField({ name: 'ph_email', title: 'Placeholder Email (ES)', type: 'string' }),
        defineField({ name: 'ph_email_en', title: 'Placeholder Email (EN)', type: 'string' }),
        defineField({ name: 'ph_phone', title: 'Placeholder Teléfono (ES)', type: 'string' }),
        defineField({ name: 'ph_phone_en', title: 'Placeholder Phone (EN)', type: 'string' }),
        defineField({ name: 'ph_service', title: 'Placeholder Servicio (ES)', type: 'string' }),
        defineField({ name: 'ph_service_en', title: 'Placeholder Service (EN)', type: 'string' }),
        defineField({ name: 'ph_message', title: 'Placeholder Mensaje (ES)', type: 'string' }),
        defineField({ name: 'ph_message_en', title: 'Placeholder Message (EN)', type: 'string' }),
        defineField({ name: 'success_title', title: 'Título Éxito (ES)', type: 'string' }),
        defineField({ name: 'success_title_en', title: 'Success Title (EN)', type: 'string' }),
        defineField({ name: 'success_desc', title: 'Mensaje Éxito (ES)', type: 'string' }),
        defineField({ name: 'success_desc_en', title: 'Success Message (EN)', type: 'string' }),
        defineField({ name: 'submit_btn', title: 'Texto Botón Enviar (ES)', type: 'string' }),
        defineField({ name: 'submit_btn_en', title: 'Submit Button Text (EN)', type: 'string' }),
        defineField({ name: 'sending_label', title: 'Etiqueta Enviando... (ES)', type: 'string' }),
        defineField({ name: 'sending_label_en', title: 'Sending Label (EN)', type: 'string' }),
        defineField({ name: 'retry_btn', title: 'Texto Botón Reintentar (ES)', type: 'string' }),
        defineField({ name: 'retry_btn_en', title: 'Retry Button Text (EN)', type: 'string' }),
      ]
    }),
    defineField({
      name: 'calendlyUrl',
      title: 'Calendly URL',
      type: 'url',
      description: 'Enlace de tu Calendly (ej: https://calendly.com/tu-usuario/cita)',
    }),
    defineField({
      name: 'calendlyTitle',
      title: 'Calendly Title (ES)',
      type: 'string',
    }),
    defineField({
      name: 'calendlyTitleEn',
      title: 'Calendly Title (EN)',
      type: 'string',
    }),
    defineField({
      name: 'calendlyDescription',
      title: 'Calendly Description (ES)',
      type: 'text',
      rows: 2
    }),
    defineField({
      name: 'calendlyDescriptionEn',
      title: 'Calendly Description (EN)',
      type: 'text',
      rows: 2
    }),
  ],
});
