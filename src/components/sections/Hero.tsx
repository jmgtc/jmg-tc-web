"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Hero() {
  const { language, dict } = useLanguage();
  const t = dict.hero;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-black pt-24">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 border border-white/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-widest text-gold">{t.badge}</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          {t.title} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-white">
            {language === "es" ? "tu entorno digital" : "your digital environment"}
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-brand-gray-body text-lg md:text-xl mb-10">
          {t.subtitle}
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button className="px-8 py-4 bg-gold text-black font-bold rounded-full hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(242,204,82,0.3)]">
            {t.cta}
          </button>
          <button className="px-8 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all">
            {dict.header.services}
          </button>
        </div>
      </div>

      {/* Decorative Module Indicator */}
      <div className="absolute bottom-10 left-10 hidden md:block">
        <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em]">
          Module_01 // Hero_Core
        </div>
      </div>
    </section>
  );
}
