"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Badge from "@/components/modules/Badge";

interface HeroProps {
  data?: any;
}

export default function Hero({ data }: HeroProps) {
  const { language, dict } = useLanguage();
  const t = dict.hero;

  // Localized content with fallback to dictionary
  const content = {
    badge: (language === "en" ? data?.badge_en : data?.badge) || t.badge,
    tag: (language === "en" ? data?.tag_en : data?.tag) || "Section_01 // Hero",
    title: (language === "en" ? data?.title_en : data?.title) || t.title,
    title_highlight: (language === "en" ? data?.title_highlight_en : data?.title_highlight) || t.title_highlight,
    subtitle: (language === "en" ? data?.subtitle_en : data?.subtitle) || t.subtitle,
    cta: (language === "en" ? data?.cta_en : data?.cta) || t.cta,
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-brand-black pt-24">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0">
        {data?.image ? (
          <>
            <Image
              src={urlFor(data.image).url()}
              alt="Hero Background"
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-black via-transparent to-brand-black" />
          </>
        ) : (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px]"></div>
          </>
        )}
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <Badge text={content.badge} className="mb-8" />

        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          {content.title} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-white">
            {content.title_highlight}
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-brand-gray-body text-lg md:text-xl mb-10">
          {content.subtitle}
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <button className="px-8 py-4 bg-gold text-black font-bold rounded-full hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(242,204,82,0.3)]">
            {content.cta}
          </button>
          <button className="px-8 py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all">
            {dict.header.services}
          </button>
        </div>
      </div>

      {/* Decorative Module Indicator */}
      <div className="absolute bottom-10 left-10 hidden md:block">
        <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em]">
          {content.tag}
        </div>
      </div>
    </section>
  );
}
