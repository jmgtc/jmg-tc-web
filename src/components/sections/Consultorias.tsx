"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";

interface ServicePhase {
  label?: string;
  label_en?: string;
  desc?: string;
  desc_en?: string;
}

interface ServiceItem {
  _id: string;
  tag?: string;
  title?: string;
  title_en?: string;
  description?: string;
  description_en?: string;
  phases?: ServicePhase[];
  dark?: boolean;
  icon_image?: any;
}

interface ConsultoriasProps {
  headerData?: {
    title?: string;
    title_en?: string;
    description?: string;
    description_en?: string;
  };
  services?: ServiceItem[];
}

export default function Consultorias({ headerData, services }: ConsultoriasProps) {
  const { language, dict } = useLanguage();
  const srvIT = dict.services.it;
  const srvWeb = dict.services.web;

  const sectionHeader = {
    title: (language === "en" ? headerData?.title_en : headerData?.title) || "",
    description: (language === "en" ? headerData?.description_en : headerData?.description) || "",
  };

  // Static Fallback
  const fallbackServices: ServiceItem[] = [
    {
      _id: "01",
      tag: srvIT.tag,
      title: srvIT.title,
      title_en: srvIT.title,
      description: srvIT.subtitle,
      description_en: srvIT.subtitle,
      phases: srvIT.phases.map(f => ({ label: f.label, desc: f.desc })),
    },
    {
      _id: "02",
      tag: srvWeb.tag,
      title: srvWeb.title,
      title_en: srvWeb.title,
      description: srvWeb.subtitle,
      description_en: srvWeb.subtitle,
      phases: srvWeb.phases.map(f => ({ label: f.label, desc: f.desc })),
    },
  ];

  const displayServices = services && services.length > 0 ? services : fallbackServices;

  return (
    <section className="bg-black py-24">
      {(sectionHeader.title || sectionHeader.description) && (
        <div className="container mx-auto px-6 mb-16 text-center">
          {sectionHeader.title && <h2 className="text-4xl font-bold text-white mb-4">{sectionHeader.title}</h2>}
          {sectionHeader.description && <p className="text-white/70 max-w-2xl mx-auto text-lg">{sectionHeader.description}</p>}
        </div>
      )}
      {displayServices.map((srv, i) => {
        const title = (language === "en" ? srv.title_en : srv.title) || srv.title || "Servicio JMG-TC";
        const desc = (language === "en" ? srv.description_en : srv.description) || srv.description || "";

        return (
          <div
            key={srv._id}
            className={`container mx-auto px-6 mb-24 flex flex-col ${i % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-16`}
          >
            {/* Text side */}
            <div className="flex-1">
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] block mb-4">
                {srv.tag}
              </span>
              <h2 className="text-4xl font-bold text-white mb-2">{title}</h2>
              <p className="text-white/70 mb-10 text-lg leading-relaxed">{desc}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {srv.phases?.map((fase: any, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/50 transition-all group backdrop-blur-xl">
                    <span className="text-gold font-bold text-xs tracking-widest">{(idx + 1).toString().padStart(2, '0')}</span>
                    <h3 className="font-bold text-white mt-1 mb-1 group-hover:text-gold transition-colors">
                      {language === "en" ? fase.label_en || fase.label : fase.label}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed font-light">
                      {language === "en" ? fase.desc_en || fase.desc : fase.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual side */}
            <div className="flex-1 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gold/5 blur-[100px] rounded-full" />
              <div className="w-80 h-80 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-3xl flex items-center justify-center shadow-2xl relative z-10 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {srv.icon_image ? (
                  <Image
                    src={urlFor(srv.icon_image).width(320).height(320).url()}
                    alt={title}
                    fill
                    className="object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <span className="text-gold font-bold text-9xl opacity-20 group-hover:opacity-40 transition-all transform group-hover:scale-110">{(i + 1).toString().padStart(2, '0')}</span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
