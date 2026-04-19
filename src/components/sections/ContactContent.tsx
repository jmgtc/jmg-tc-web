"use client";

import { useState } from "react";
import { submitContactForm } from "@/lib/actions";
import { useLanguage } from "@/components/providers/LanguageProvider";
import Badge from "@/components/modules/Badge";

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
  const root = cmsData;

  const content = {
    badge: (language === "en" ? (root?.badge_en || info?.badge_en) : (root?.badge || info?.badge)) || "",
    tag: root?.tag || info?.tag || (language === "es" ? "Página_Contacto // Conecta" : "Page_Contact // Connect"),
    title: (language === "en" ? (root?.title_en || info?.title_en) : (root?.title || info?.title)) || (language === "es" ? "Trabajemos" : "Let's work"),
    title_accent: (language === "en" ? (root?.title_accent_en || info?.title_accent_en) : (root?.title_accent || info?.title_accent)) || (language === "es" ? "juntos" : "together"),
    desc: (language === "en" ? (root?.description_en || info?.description_en) : (root?.description || info?.description)) || (language === "es" ? "Si tienes un proyecto, una idea o simplemente quieres explorar cómo la tecnología puede transformar tu negocio, cuéntanos." : "If you have a project, an idea, or just want to explore how technology can transform your business, tell us."),
    
    email_label: language === "es" ? "Email" : "Email",
    email_value: root?.email || info?.email || "info@jmg-tc.com",
    
    phone_label: language === "es" ? "Teléfono" : "Phone",
    phone_value: root?.phone || info?.phone || "",

    appointment_label: (language === "en" ? (root?.calendlyTitleEn || root?.appointment_label_en || info?.appointment_label_en) : (root?.calendlyTitle || root?.appointment_label || info?.appointment_label)) || (language === "es" ? "Agendar consulta" : "Book a session"),
    appointment_url: root?.calendlyUrl || root?.appointment_url || info?.appointment_url || "https://calendly.com",
    appointment_desc: (language === "en" ? root?.calendlyDescriptionEn : root?.calendlyDescription) || (language === "es" ? "Reserva una videollamada de 15 min." : "Book a 15 min video call."),
    
    form_tag: form?.tag || (language === "es" ? "Module_Contacto // Formulario" : "Module_Contact // Form"),
    success_title: (language === "en" ? form?.success_title_en : form?.success_title) || (language === "es" ? "¡Mensaje enviado!" : "Message sent!"),
    success_desc: (language === "en" ? form?.success_desc_en : form?.success_desc) || (language === "es" ? "Nos pondremos en contacto contigo en las próximas 24h." : "We will get in touch with you within the next 24h."),
    submit_btn: (language === "en" ? form?.submit_btn_en : form?.submit_btn) || (language === "es" ? "Enviar mensaje" : "Send message"),
    sending_btn: (language === "en" ? form?.sending_label_en : form?.sending_label) || (language === "es" ? "Enviando..." : "Sending..."),
    retry_btn: (language === "en" ? form?.retry_btn_en : form?.retry_btn) || (language === "es" ? "Enviar otro mensaje" : "Send another message"),
    
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
    <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start w-full overflow-hidden">
      {/* Left — Info */}
      <div className="flex flex-col items-start pt-8 w-full">
        <Badge text={content.badge} className="mb-6" />
        <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] block mb-3">
          {content.tag}
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight whitespace-normal break-keep">
          {content.title}<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 to-zinc-600">
            {content.title_accent}
          </span>
        </h1>
        <p className="text-brand-gray-body text-lg leading-relaxed mb-10 break-keep">
          {content.desc}
        </p>

        <div className="space-y-4 w-full">
          {/* Email */}
          <div className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-gold/30 transition-all">
            <span className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-xl">📧</span>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-0.5">{content.email_label}</p>
              <p className="font-bold text-white text-sm">{content.email_value}</p>
            </div>
          </div>

          {/* Phone */}
          {content.phone_value && (
            <div className="flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/10 hover:border-gold/30 transition-all">
              <span className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-xl">📞</span>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-0.5">{content.phone_label}</p>
                <p className="font-bold text-white text-sm">{content.phone_value}</p>
              </div>
            </div>
          )}

          {/* Appointment / Calendly */}
          <div className="flex flex-col gap-4 p-6 bg-gradient-to-br from-gold/10 to-transparent rounded-3xl border border-gold/20 hover:border-gold/40 transition-all group">
            <div className="flex items-center gap-4">
              <span className="w-12 h-12 bg-gold/20 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">📅</span>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-0.5">{content.appointment_label}</p>
                <p className="text-sm text-white/70">{content.appointment_desc}</p>
              </div>
            </div>
            <a 
              href={content.appointment_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-full py-4 bg-gold/10 hover:bg-gold text-gold hover:text-black text-center text-xs font-bold uppercase tracking-widest rounded-xl transition-all border border-gold/20"
            >
              {language === "es" ? "Ver calendario disponible →" : "See available slots →"}
            </a>
          </div>
        </div>
      </div>

      {/* Right — Form */}
      <div className="glass rounded-[2.5rem] p-10 border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 blur-[60px] rounded-full pointer-events-none" />
        
        <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] block mb-6">
          {content.form_tag}
        </span>

        {enviado ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl text-gold">✓</span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">{content.success_title}</h2>
            <p className="text-white/60 text-sm">{content.success_desc}</p>
            <button 
              onClick={() => setEnviado(false)}
              className="mt-8 px-6 py-3 border border-gold/30 text-gold text-xs font-bold uppercase tracking-widest rounded-full hover:bg-gold hover:text-black transition-all"
            >
              {content.retry_btn}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">{content.label_name}</label>
                <input
                  required name="nombre" type="text" placeholder={content.placeholder_name}
                  className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white text-base focus:outline-none focus:border-gold transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">{content.label_email}</label>
                <input
                  required name="email" type="email" placeholder={content.placeholder_email}
                  className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white text-base focus:outline-none focus:border-gold transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">{content.label_phone}</label>
              <input
                name="telefono" type="tel" placeholder={content.placeholder_phone}
                className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white text-base focus:outline-none focus:border-gold transition-all"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">{content.label_service}</label>
              <div className="relative">
                <select
                  name="servicio"
                  className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-black/40 text-white text-base focus:outline-none focus:border-gold transition-all appearance-none pr-10"
                >
                  <option value="" className="bg-[#0a0a0a]">{content.placeholder_service}</option>
                  {servicios.map(s => <option key={s} value={s} className="bg-[#0a0a0a]">{s}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                  ▼
                </div>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">{content.label_message}</label>
              <textarea
                required name="mensaje" rows={4} placeholder={content.placeholder_message}
                className="w-full px-5 py-4 rounded-2xl border border-white/10 bg-white/5 text-white text-base focus:outline-none focus:border-gold transition-all resize-none"
              />
            </div>

            <div className="flex items-start gap-4 px-2 py-2">
              <input 
                type="checkbox" 
                id="privacy" 
                required 
                className="mt-1 w-5 h-5 rounded border-white/10 bg-white/5 text-gold focus:ring-gold accent-gold"
              />
              <label htmlFor="privacy" className="text-[11px] text-white/50 leading-relaxed cursor-pointer select-none">
                {language === 'es' 
                  ? 'Acepto la política de privacidad y el tratamiento de mis datos.' 
                  : 'I accept the privacy policy and the processing of my data.'}
              </label>
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full py-5 bg-gold text-black font-bold uppercase tracking-widest text-xs rounded-2xl hover:bg-white active:scale-95 transition-all transform disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_20px_rgba(242,204,82,0.15)] mt-4 cursor-pointer"
            >
              {cargando ? content.sending_btn : content.submit_btn}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
