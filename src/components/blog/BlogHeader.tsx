"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function BlogHeader() {
  const { t } = useLanguage();
  return (
    <div className="max-w-3xl mb-16">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
        <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
        <span className="text-[10px] font-mono uppercase tracking-widest text-white/70">
          {t("blog.insights_tag")}
        </span>
      </div>
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
        {t("blog.title")}
      </h1>
      <p className="text-lg text-white/80 leading-relaxed font-light">
        {t("blog.description")}
      </p>
    </div>
  );
}
