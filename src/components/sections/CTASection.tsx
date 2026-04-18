"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import Link from "next/link";
import Badge from "@/components/modules/Badge";

interface CTASectionProps {
  data?: any;
}

export default function CTASection({ data }: CTASectionProps) {
  const { language } = useLanguage();

  const content = {
    badge: (language === 'en' ? data?.badge_en : data?.badge) || "",
    tag: (language === 'en' ? data?.tag_en : data?.tag) || (language === "es" ? "Módulo_Final // CTA" : "Final_Module // CTA"),
    title: (language === 'en' ? data?.title_en : data?.title) || (language === "es" ? "¿Listo para transformar tu negocio?" : "Ready to transform your business?"),
    button: (language === 'en' ? data?.button_text_en : data?.button_text) || (language === "es" ? "Contactar ahora" : "Contact now"),
  };

  return (
    <section className="py-32 bg-brand-black relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto glass rounded-[3rem] p-12 md:p-24 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Decorative gradients */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-gold/10 blur-[100px] rounded-full" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-zinc-500/10 blur-[100px] rounded-full" />

          <div className="relative z-10">
            <Badge text={content.badge} className="mb-6 mx-auto" />
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] block mb-8">
              {content.tag}
            </span>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-12 leading-tight">
              {content.title}
            </h2>
            
            <Link 
              href="/contacto"
              className="inline-block px-12 py-5 bg-gold text-black font-bold uppercase tracking-widest text-xs rounded-2xl hover:bg-white transition-all transform hover:scale-105 shadow-[0_10px_40px_rgba(242,204,82,0.2)]"
            >
              {content.button}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
