"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";

interface NosotrosContentProps {
  data?: any;
}

export default function NosotrosContent({ data }: NosotrosContentProps) {
  const { dict, language } = useLanguage();
  const about = data;
  const valuesData = data?.values;

  const content = {
    tag: (language === "en" ? about?.tag_en : about?.tag) || dict.about.tag,
    title: (language === "en" ? about?.title_main_en : about?.title_main) || dict.about.title_main,
    title_accent: (language === "en" ? about?.title_accent_en : about?.title_accent) || dict.about.title_accent,
    intro: (language === "en" ? about?.intro_en : about?.intro) || dict.about.intro,
    perfil_tag: (language === "en" ? about?.profile?.tag_en : about?.profile?.tag) || dict.about.profile.tag,
    perfil_name: about?.profile?.name || dict.about.profile.name,
    perfil_role: (language === "en" ? about?.profile?.role_en : about?.profile?.role) || dict.about.profile.role,
    perfil_desc: (language === "en" ? about?.profile?.bio_en : about?.profile?.bio) || dict.about.profile.desc,
    valores_tag: (language === "en" ? valuesData?.tag_en : valuesData?.tag) || dict.about.values.tag,
    valores_title: (language === "en" ? valuesData?.title_en : valuesData?.title) || dict.about.values.title,
    cta_text: dict.header.cta,
    cta_btn: (language === "en" ? "Let's talk" : "Hablemos")
  };

  const displayValues = valuesData?.items || dict.about.values.items;

  return (
    <main className="min-h-screen bg-brand-white-offset pt-32 pb-24">
      <div className="container mx-auto px-6">

        {/* Hero Nosotros */}
        <div className="max-w-4xl mx-auto mb-24">
          <span className="text-[10px] font-mono text-brand-gray-body/50 uppercase tracking-[0.4em] block mb-3">
            {content.tag}
          </span>
          <h1 className="text-5xl font-bold text-brand-gray-title mb-6">
            {content.title}<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-black to-brand-gray">
              {content.title_accent}
            </span>
          </h1>
          <p className="text-lg text-brand-gray-body leading-relaxed max-w-2xl">
            {content.intro}
          </p>
        </div>

        {/* Perfil Jose */}
        <div className="bg-brand-black rounded-3xl p-10 md:p-16 mb-24 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-40 h-40 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center flex-shrink-0 overflow-hidden relative">
            {data?.profile?.photo ? (
              <Image
                src={urlFor(data.profile.photo).width(160).height(160).url()}
                alt={content.perfil_name}
                fill
                className="object-cover"
              />
            ) : (
              <span className="text-5xl">👨‍💻</span>
            )}
          </div>
          <div>
            <span className="text-[10px] font-mono text-gold/60 uppercase tracking-widest block mb-2">{content.perfil_tag}</span>
            <h2 className="text-3xl font-bold text-white mb-3">{content.perfil_name}</h2>
            <p className="text-gold text-sm font-bold mb-4">{content.perfil_role}</p>
            <p className="text-brand-gray-body leading-relaxed text-sm">
              {content.perfil_desc}
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] font-mono text-brand-gray-body/50 uppercase tracking-[0.4em] block mb-6">
            {content.valores_tag}
          </span>
          <h2 className="text-3xl font-bold text-brand-gray-title mb-10">{content.valores_title}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {displayValues.map((v: any, idx: number) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-black/5 hover:border-gold/50 transition-all group">
                <span className="text-3xl block mb-4">{v.icon}</span>
                <h3 className="font-bold text-brand-gray-title mb-2 group-hover:text-gold transition-colors">
                  {language === "en" ? v.label_en : v.label}
                </h3>
                <p className="text-xs text-brand-gray-body leading-relaxed">
                  {language === "en" ? v.desc_en : v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto mt-24 text-center">
          <p className="text-brand-gray-body mb-6 text-lg">{content.cta_text}</p>
          <a
            href="/contacto"
            className="inline-block px-8 py-4 bg-gold text-black font-bold rounded-full hover:bg-brand-black hover:text-white transition-all"
          >
            {content.cta_btn}
          </a>
        </div>
      </div>
    </main>
  );
}
