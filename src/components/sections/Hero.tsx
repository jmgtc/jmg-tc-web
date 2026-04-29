"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/modules/Badge";

interface HeroProps {
  data?: any;
}

export default function Hero({ data }: HeroProps) {
  const { language, dict } = useLanguage();
  const t = dict.hero;

  const content = {
    badge: (language === "en" ? data?.badge_en : data?.badge) || (language === "es" ? "Socio Tecnológico Premium" : "Premium Tech Partner"),
    tag: (language === "en" ? data?.tag_en : data?.tag) || "Section_01 // Hero",
    title: (language === "en" ? data?.title_en : data?.title) || (language === "es"
      ? "Desarrollamos webs, automatizaciones con IA y sistemas digitales"
      : "We build websites, AI automations and digital systems"),
    title_highlight: (language === "en" ? data?.title_highlight_en : data?.title_highlight) || (language === "es"
      ? "para hacer crecer tu negocio"
      : "to grow your business"),
    subtitle: (language === "en" ? data?.subtitle_en : data?.subtitle) || (language === "es"
      ? "Desde una web profesional hasta un sistema completo con clientes, pagos y automatización inteligente."
      : "From a professional website to a complete system with clients, payments, and intelligent automation."),
    cta_primary: (language === "en" ? data?.cta_en : data?.cta) || (language === "es" ? "Solicitar diagnóstico gratuito" : "Request free diagnosis"),
    cta_secondary: language === "es" ? "Ver demo del sistema" : "See system demo",
  };

  const stats = [
    { value: "3", label: language === "es" ? "Líneas de servicio" : "Service lines" },
    { value: "IA", label: language === "es" ? "Integrada en producción" : "In production" },
    { value: "100%", label: language === "es" ? "Código propio" : "Custom code" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-brand-black pt-24 pb-12">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {data?.image ? (
          <>
            <Image
              src={urlFor(data.image).url()}
              alt="Hero Background"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-black/60 via-transparent to-brand-black" />
          </>
        ) : (
          <>
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold/8 rounded-full blur-[140px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[180px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/3 rounded-full blur-[200px]" />
          </>
        )}
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Badge */}
        <Badge text={content.badge} className="mb-8" />

        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.08] text-center max-w-4xl">
          {content.title}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-yellow-300 to-gold">
            {content.title_highlight}
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-white/60 text-lg md:text-xl mb-10 text-center leading-relaxed">
          {content.subtitle}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            href="/contacto"
            className="px-8 py-4 bg-gold text-black font-bold rounded-full hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(242,204,82,0.35)] text-sm tracking-wide"
          >
            {content.cta_primary}
          </Link>
          <Link
            href="/dashboard"
            className="group px-8 py-4 glass text-white font-semibold rounded-full hover:bg-white/10 transition-all text-sm flex items-center gap-2"
          >
            {content.cta_secondary}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Dashboard Mockup */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Glow behind mockup */}
          <div className="absolute -inset-4 bg-gold/10 blur-[60px] rounded-[2rem]" />
          <div className="relative glass rounded-[1.5rem] border border-white/10 overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.8)]">
            {/* Fake browser chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
              <span className="w-3 h-3 rounded-full bg-red-500/70" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <span className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-4 flex-1 bg-white/10 rounded-full h-5 flex items-center px-3">
                <span className="text-[10px] text-white/40 font-mono">jmg-tc.com/dashboard</span>
              </span>
            </div>
            {/* Dashboard illustration */}
            <div className="p-6 bg-[#0a0a0a]">
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[
                  { label: language === "es" ? "Clientes activos" : "Active clients", value: "24", up: true },
                  { label: language === "es" ? "Ingresos mes" : "Monthly revenue", value: "€8.4k", up: true },
                  { label: language === "es" ? "Leads captados" : "Leads captured", value: "147", up: false },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-xl bg-white/5 border border-white/10 p-4">
                    <p className="text-[10px] text-white/40 mb-1">{stat.label}</p>
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <span className={`text-[10px] font-mono ${stat.up ? "text-green-400" : "text-gold"}`}>
                      {stat.up ? "↑ +12%" : "→ activo"}
                    </span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-5 gap-3">
                <div className="col-span-3 rounded-xl bg-white/5 border border-white/10 p-4 h-24 flex items-end gap-1">
                  {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gold/40 rounded-sm hover:bg-gold transition-colors"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="col-span-2 rounded-xl bg-white/5 border border-white/10 p-4 flex flex-col justify-between">
                  <p className="text-[10px] text-white/40">{language === "es" ? "Estado del sistema" : "System status"}</p>
                  {["IA", "Stripe", "CMS", "Auth"].map((item) => (
                    <div key={item} className="flex items-center justify-between">
                      <span className="text-[11px] text-white/60">{item}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* Labels */}
          <div className="absolute -left-4 top-1/3 hidden lg:block">
            <div className="glass rounded-xl px-3 py-2 border border-gold/30 shadow-lg">
              <p className="text-[10px] text-gold font-mono">AI Concierge</p>
              <p className="text-[9px] text-white/40">● activo</p>
            </div>
          </div>
          <div className="absolute -right-4 top-2/3 hidden lg:block">
            <div className="glass rounded-xl px-3 py-2 border border-green-500/30 shadow-lg">
              <p className="text-[10px] text-green-400 font-mono">Stripe Payments</p>
              <p className="text-[9px] text-white/40">● integrado</p>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="flex items-center gap-8 md:gap-16 mt-12 pt-8 border-t border-white/10 w-full max-w-2xl justify-center">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-2xl font-bold text-gold">{s.value}</p>
              <p className="text-[11px] text-white/40 uppercase tracking-widest mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Module tag */}
      <div className="absolute bottom-10 left-10 hidden md:block">
        <div className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em]">{content.tag}</div>
      </div>
    </section>
  );
}
