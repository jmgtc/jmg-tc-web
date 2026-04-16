"use client";

import CheckoutButton from "@/components/modules/CheckoutButton";
import { useLanguage } from "@/components/providers/LanguageProvider";
import Footer from "@/components/modules/Footer";

interface ServiciosContentProps {
  header?: any;
  services?: any[];
  settings?: any;
}

export default function ServiciosContent({ header, services, settings }: ServiciosContentProps) {
  const { language, dict } = useLanguage();

  const labels = {
    tag: (language === "en" ? header?.tag_en : header?.tag) || "Página_Servicios // Soluciones",
    title: (language === "en" ? header?.title_en : header?.title) || "Servicios Tecnológicos",
    description: (language === "en" ? header?.description_en : header?.description) || "Soluciones especializadas para modernizar, automatizar y escalar tu infraestructura digital.",
  };

  return (
    <main className="min-h-screen pt-32 pb-24">
      {/* SECCIÓN 01 — Cabecera de Servicios */}
      <section className="container mx-auto px-6 mb-20 text-center">
        <span className="text-[10px] font-mono text-brand-gray-body/50 uppercase tracking-[0.4em] block mb-3">
          {labels.tag}
        </span>
        <h1 className="text-5xl font-bold text-brand-gray-title mb-6">
          {labels.title}
        </h1>
        <p className="max-w-2xl mx-auto text-brand-gray-body text-lg leading-relaxed">
          {labels.description}
        </p>
      </section>

      {/* SECCIÓN 02 — Grid de Servicios Dinámicos */}
      <section className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services?.map((service: any) => {
            const title = (language === "en" ? service.title_en : service.title) || service.title;
            const desc = (language === "en" ? service.description_en : service.description) || service.description;
            const features = (language === "en" ? service.features_en : service.features) || service.features;
            const cta = (language === "en" ? service.cta_en : service.cta) || (language === "en" ? "Hire" : "Contratar");
            const priceLabel = (language === "en" ? service.priceLabel_en : service.priceLabel) || service.priceLabel;

            return (
              <div key={service?._id} className="group p-8 bg-white border border-black/5 rounded-[2.5rem] hover:border-gold/30 transition-all duration-500 hover:-translate-y-2">
                <div className="w-14 h-14 bg-brand-gray-lighter rounded-2xl flex items-center justify-center text-2xl mb-8 group-hover:scale-110 transition-transform duration-500">
                  {service?.icon || "⚙️"}
                </div>
                <h3 className="text-2xl font-bold text-brand-gray-title mb-4">{title}</h3>
                <p className="text-brand-gray-body text-sm leading-relaxed mb-8">
                   {desc}
                </p>
                <div className="space-y-3 mb-8">
                  {features?.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-3 text-xs text-brand-gray-body/70">
                      <span className="w-1 h-1 bg-gold rounded-full" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 mt-auto">
                  <CheckoutButton 
                    serviceId={service._id}
                    serviceName={title}
                    price={service.price}
                    label={cta}
                    className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm transition-all hover:scale-105 ${
                      service.dark
                        ? "bg-gold text-black hover:bg-white"
                        : "bg-brand-black text-white hover:bg-gold hover:text-black"
                    }`}
                  />
                  <span className={`text-sm font-bold opacity-40 ${service.dark ? "text-white" : "text-brand-gray-title"}`}>
                    {priceLabel} {(service.price / 100).toFixed(2)}€
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer cmsData={settings} />
    </main>
  );
}
