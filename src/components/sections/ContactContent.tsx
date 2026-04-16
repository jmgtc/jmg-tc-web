"use client";

import { useState } from "react";
import { submitContactForm } from "@/lib/actions";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface ContactContentProps {
  cmsData?: any;
}

export default function ContactContent({ cmsData }: ContactContentProps) {
  const { language } = useLanguage();
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);

  const servicios = language === "es"
    ? ["Gestión Informática", "Desarrollo Web", "ConsultorIA / Automatización", "Otro"]
    : ["IT Management", "Web Development", "AI Automation", "Other"];

  const info = cmsData?.info;
  const form = cmsData?.form;

  const content = {
    tag: info?.tag || (language === "es" ? "Página_Contacto // Conecta" : "Page_Contact // Connect"),
    title: (language === "en" ? info?.title_en : info?.title) || (language === "es" ? "Trabajemos" : "Let's work"),
    title_accent: (language === "en" ? info?.title_accent_en : info?.title_accent) || (language === "es" ? "juntos" : "together"),
    desc: (language === "en" ? info?.description_en : info?.description) || (language === "es" ? "Si tienes un proyecto, una idea o simplemente quieres explorar cómo la tecnología puede transformar tu negocio, cuéntanos." : "If you have a project, an idea, or just want to explore how technology can transform your business, tell us."),
    email_label: language === "es" ? "Email" : "Email",
    email_value: info?.email || "info@jmg-tc.com",
    appointment_label: (language === "en" ? info?.appointment_label_en : info?.appointment_label) || (language === "es" ? "Reservar cita" : "Book appointment"),
    appointment_url: info?.appointment_url || "https://jmg-tc.com/reservar",
    
    form_tag: form?.tag || (language === "es" ? "Module_Contacto // Formulario" : "Module_Contact // Form"),
    success_title: (language === "en" ? form?.success_title_en : form?.success_title) || (language === "es" ? "¡Mensaje enviado!" : "Message sent!"),
    success_desc: (language === "en" ? form?.success_desc_en : form?.success_desc) || (language === "es" ? "Nos pondremos en contacto contigo en las próximas 24h." : "We will get in touch with you within the next 24h."),
    submit_btn: (language === "en" ? form?.submit_btn_en : form?.submit_btn) || (language === "es" ? "Enviar mensaje" : "Send message"),
    sending_btn: (language === "en" ? form?.sending_label_en : form?.sending_label) || (language === "es" ? "Enviando..." : "Sending..."),
    retry_btn: (language === "en" ? form?.retry_btn_en : form?.retry_btn) || (language === "es" ? "Enviar otro mensaje" : "Send another message"),
    
    // Dynamic labels from Sanity
    label_name: (language === "en" ? form?.label_name_en : form?.label_name) || (language === "es" ? "Nombre" : "Name"),
    label_email: (language === "en" ? form?.label_email_en : form?.label_email) || (language === "es" ? "Email" : "Email"),
    label_phone: (language === "en" ? form?.label_phone_en : form?.label_phone) || (language === "es" ? "Teléfono (opcional)" : "Phone (optional)"),
    label_service: (language === "en" ? form?.label_service_en : form?.label_service) || (language === "es" ? "Servicio de interés" : "Service of interest"),
    label_message: (language === "en" ? form?.label_message_en : form?.label_message) || (language === "es" ? "Mensaje" : "Message"),
    
    placeholder_name: (language === "en" ? form?.ph_name_en : form?.ph_name) || (language === "es" ? "Tu nombre" : "Your name"),
    placeholder_email: (language === "en" ? form?.ph_email_en : form?.ph_email) || (language === "es" ? "tu@email.com" : "your@email.com"),
    placeholder_phone: (language === "en" ? form?.ph_phone_en : form?.ph_phone) || (language === "es" ? "+34 600 000 000" : "+44 000 000 000"),
    placeholder_service: (language === "en" ? form?.ph_service_en : form?.ph_service) || (language === "es" ? "Selecciona un servicio" : "Select a service"),
    placeholder_message: (language === "en" ? form?.ph_message_en : form?.ph_message) || (language === "es" ? "Cuéntanos tu proyecto..." : "Tell us about your project...")
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCargando(true);
    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);
    if (result.success) setEnviado(true);
    setCargando(false);
  };

  return (
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
      {/* Left — Info */}
      <div>
        <span className="text-[10px] font-mono text-brand-gray-body/50 uppercase tracking-[0.4em] block mb-3">
          {content.tag}
        </span>
        <h1 className="text-5xl font-bold text-brand-gray-title mb-6">
          {content.title}<br /><span className="text-gold">{content.title_accent}</span>
        </h1>
        <p className="text-brand-gray-body text-lg leading-relaxed mb-10">
          {content.desc}
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-black/5">
            <span className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold">📧</span>
            <div>
              <p className="text-xs text-brand-gray-body/60 uppercase tracking-wider">{content.email_label}</p>
              <p className="font-bold text-brand-gray-title text-sm">{content.email_value}</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-black/5">
            <span className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold">📅</span>
            <div>
              <p className="text-xs text-brand-gray-body/60 uppercase tracking-wider">{content.appointment_label}</p>
              <a href={content.appointment_url} target="_blank" rel="noopener noreferrer" className="font-bold text-gold text-sm hover:underline">
                {language === "es" ? "Agendar una sesión →" : "Schedule a session →"}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
        <span className="text-[10px] font-mono text-brand-gray-body/50 uppercase tracking-[0.4em] block mb-6">
          {content.form_tag}
        </span>

        {enviado ? (
          <div className="text-center py-12">
            <span className="text-4xl block mb-4">✅</span>
            <h2 className="text-2xl font-bold text-brand-gray-title mb-2">{content.success_title}</h2>
            <p className="text-brand-gray-body text-sm">{content.success_desc}</p>
            <button 
              onClick={() => setEnviado(false)}
              className="mt-6 text-gold text-xs font-bold uppercase tracking-widest hover:underline"
            >
              {content.retry_btn}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-brand-gray-body block mb-1">{content.label_name}</label>
                <input
                  required name="nombre" type="text" placeholder={content.placeholder_name}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-gold transition-colors bg-white text-black"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-brand-gray-body block mb-1">{content.label_email}</label>
                <input
                  required name="email" type="email" placeholder={content.placeholder_email}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-gold transition-colors bg-white text-black"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-brand-gray-body block mb-1">{content.label_phone}</label>
              <input
                name="telefono" type="tel" placeholder={content.placeholder_phone}
                className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-gold transition-colors bg-white text-black"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-brand-gray-body block mb-1">{content.label_service}</label>
              <select
                name="servicio"
                className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-gold transition-colors bg-white text-black"
              >
                <option value="">{content.placeholder_service}</option>
                {servicios.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-brand-gray-body block mb-1">{content.label_message}</label>
              <textarea
                required name="mensaje" rows={4} placeholder={content.placeholder_message}
                className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-gold transition-colors resize-none bg-white text-black"
              />
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full py-4 bg-gold text-black font-bold rounded-xl hover:bg-brand-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cargando ? content.sending_btn : content.submit_btn}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
