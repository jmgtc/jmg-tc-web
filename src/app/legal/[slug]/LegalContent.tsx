"use client";

import { PortableText } from "@portabletext/react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface LegalContentProps {
  page: any;
  settings: any;
}

export default function LegalContent({ page, settings }: LegalContentProps) {
  const { language } = useLanguage();

  const title = language === 'en' ? (page.title_en || page.title) : page.title;
  const content = language === 'en' ? (page.content_en || page.content) : page.content;

  return (
    <div className="pt-40">
      <div className="container mx-auto px-6 max-w-4xl pb-32">
        {/* Tag decorativo */}
        <span className="text-[10px] font-mono text-gold/40 uppercase tracking-[0.5em] block mb-4">
          Legal_Notice // {page.slug?.current}
        </span>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-12">
          {title}
        </h1>
        
        <div className="prose prose-invert prose-gold max-w-none text-zinc-400 
          prose-headings:text-white prose-strong:text-white prose-a:text-gold 
          prose-p:leading-relaxed prose-p:mb-6">
          <PortableText value={content} />
        </div>
      </div>
    </div>
  );
}
