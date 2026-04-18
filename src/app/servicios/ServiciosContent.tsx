"use client";

import CheckoutButton from "@/components/modules/CheckoutButton";
import { useLanguage } from "@/components/providers/LanguageProvider";
import Badge from "@/components/modules/Badge";

interface ServiciosContentProps {
  header?: any;
  services?: any[];
}

export default function ServiciosContent({ header, services }: ServiciosContentProps) {
  const { language, dict } = useLanguage();

  const labels = {
    badge: (language === "en" ? header?.badge_en : header?.badge) || "",
    tag: (language === "en" ? header?.tag_en : header?.tag) || "Página_Servicios // Soluciones",
    title: (language === "en" ? header?.title_en : header?.title) || "Servicios Tecnológicos",
    description: (language === "en" ? header?.description_en : header?.description) || "Soluciones especializadas para modernizar, automatizar y escalar tu infraestructura digital.",
  };

  return (
    <div className="min-h-screen bg-brand-black pt-32 pb-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-gold/10 to-transparent pointer-events-none" />

      {/* SECCIÓN 01 — Cabecera de Servicios */}
      <section className="container mx-auto px-6 mb-20 text-center relative z-10 flex flex-col items-center">
        <Badge text={labels.badge} className="mb-6" />
        <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.4em] block mb-3">
          {labels.tag}
        </span>
        <h1 className="text-5xl font-bold text-white mb-6">
          {labels.title}
        </h1>
        <p className="max-w-2xl mx-auto text-white/60 text-lg leading-relaxed">
          {labels.description}
        </p>
      </section>

      {/* SECCIÓN 02 — Grid de Servicios Dinámicos */}
      <section className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service: any) => {
            const title = (language === "en" ? service.title_en : service.title) || service.title;
            const desc = (language === "en" ? service.description_en : service.description) || service.description;
            const features = (language === "en" ? service.features_en : service.features) || service.features;
            const cta = (language === "en" ? service.cta_en : service.cta) || (language === "en" ? "Hire" : "Contratar");
            const priceLabel = (language === "en" ? service.priceLabel_en : service.priceLabel) || service.priceLabel;

            return (
              <div key={service?._id} className="group p-8 bg-[#111] border border-white/5 rounded-[2.5rem] hover:border-gold/30 transition-all duration-500 hover:-translate-y-2 flex flex-col">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:scale-110 group-hover:bg-gold/10 transition-all duration-500">
                  {service?.icon || "⚙️"}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-8 flex-grow">
                   {desc}
                </p>
                <div className="space-y-3 mb-8">
                  {features?.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 text-xs text-zinc-500">
                      <span className="w-1.5 h-1.5 bg-gold rounded-full shadow-[0_0_8px_rgba(242,204,82,0.4)]" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto pt-6 border-t border-white/5">
                  <CheckoutButton 
                    serviceId={service._id}
                    serviceName={title}
                    price={service.price}
                    label={cta}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all hover:scale-105 bg-gold text-black hover:bg-white shadow-[0_10px_20px_rgba(242,204,82,0.15)]"
                  />
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase tracking-tighter text-zinc-500">{priceLabel}</span>
                    <span className="text-lg font-bold text-white">
                      {(service.price / 100).toFixed(2)}€
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
