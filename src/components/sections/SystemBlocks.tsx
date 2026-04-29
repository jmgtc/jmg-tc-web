"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import Link from "next/link";

interface SystemBlocksProps {
  data?: any;
}

const blocks = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    color: "text-blue-400",
    glow: "bg-blue-500/10",
    border: "border-blue-500/20 hover:border-blue-400/50",
    titleEs: "Web Profesional",
    titleEn: "Professional Website",
    descEs: "Captación activa de clientes. Tu escaparate 24/7, optimizado para convertir.",
    descEn: "Active client capture. Your 24/7 showcase, optimized to convert.",
    tagEs: "01 // Captación",
    tagEn: "01 // Acquisition",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
    color: "text-purple-400",
    glow: "bg-purple-500/10",
    border: "border-purple-500/20 hover:border-purple-400/50",
    titleEs: "CRM Ligero",
    titleEn: "Light CRM",
    descEs: "Base de datos de clientes integrada. Historial, seguimiento y gestión desde tu panel.",
    descEn: "Integrated client database. History, tracking and management from your panel.",
    tagEs: "02 // Clientes",
    tagEn: "02 // Clients",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
      </svg>
    ),
    color: "text-gold",
    glow: "bg-gold/10",
    border: "border-gold/20 hover:border-gold/60",
    titleEs: "Automatización con IA",
    titleEn: "AI Automation",
    descEs: "Ventas, soporte y seguimiento en piloto automático. Gemini AI trabajando por ti.",
    descEn: "Sales, support and follow-up on autopilot. Gemini AI working for you.",
    tagEs: "03 // Automatización",
    tagEn: "03 // Automation",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
      </svg>
    ),
    color: "text-green-400",
    glow: "bg-green-500/10",
    border: "border-green-500/20 hover:border-green-400/50",
    titleEs: "Pagos Integrados",
    titleEn: "Integrated Payments",
    descEs: "Stripe conectado desde el día uno. Cobra suscripciones o servicios sin fricción.",
    descEn: "Stripe connected from day one. Charge subscriptions or services without friction.",
    tagEs: "04 // Monetización",
    tagEn: "04 // Monetization",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    color: "text-cyan-400",
    glow: "bg-cyan-500/10",
    border: "border-cyan-500/20 hover:border-cyan-400/50",
    titleEs: "Panel de Cliente",
    titleEn: "Client Dashboard",
    descEs: "Tu cliente tiene su propio espacio. Ve pedidos, suscripciones y métricas en tiempo real.",
    descEn: "Your client has their own space. See orders, subscriptions and real-time metrics.",
    tagEs: "05 // Dashboard",
    tagEn: "05 // Dashboard",
  },
];

export default function SystemBlocks({ data }: SystemBlocksProps) {
  const { language } = useLanguage();

  return (
    <section className="py-28 bg-black relative overflow-hidden">
      {/* Top gradient separator */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-[10px] font-mono text-gold/60 uppercase tracking-[0.5em] block mb-4">
            Section_02 // Sistema
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {language === "es"
              ? <>No es solo una web. <span className="text-gold">Es un sistema completo.</span></>
              : <>Not just a website. <span className="text-gold">It's a complete system.</span></>}
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            {language === "es"
              ? "Cada pieza trabaja junta: tu web capta, la IA convierte, el CRM gestiona y Stripe cobra. Todo conectado."
              : "Every piece works together: your website captures, AI converts, CRM manages and Stripe charges. All connected."}
          </p>
        </div>

        {/* Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {blocks.map((block, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl p-6 border bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${block.border}`}
            >
              {/* Background glow on hover */}
              <div className={`absolute inset-0 rounded-2xl ${block.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${block.glow} border border-white/10 ${block.color}`}>
                    {block.icon}
                  </div>
                  <span className={`text-[9px] font-mono uppercase tracking-widest ${block.color} opacity-60`}>
                    {language === "es" ? block.tagEs : block.tagEn}
                  </span>
                </div>
                <h3 className={`text-lg font-bold text-white mb-2 group-hover:${block.color} transition-colors`}>
                  {language === "es" ? block.titleEs : block.titleEn}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  {language === "es" ? block.descEs : block.descEn}
                </p>
              </div>

              {/* Connector arrow (not last) */}
              {i < blocks.length - 1 && (
                <div className="absolute -right-3 top-1/2 -translate-y-1/2 hidden lg:flex w-6 h-6 items-center justify-center z-20">
                  <svg className="w-3 h-3 text-white/20" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </div>
              )}
            </div>
          ))}

          {/* CTA Card */}
          <div className="group relative rounded-2xl p-6 border border-dashed border-gold/30 bg-gold/5 flex flex-col items-center justify-center text-center hover:bg-gold/10 transition-all duration-300 cursor-pointer min-h-[140px]">
            <p className="text-gold font-bold mb-2 text-sm">
              {language === "es" ? "¿Lo quieres para tu negocio?" : "Want this for your business?"}
            </p>
            <p className="text-white/40 text-xs mb-4">
              {language === "es" ? "Hablamos esta semana." : "Let's talk this week."}
            </p>
            <Link
              href="/contacto"
              className="px-5 py-2 bg-gold text-black text-xs font-bold rounded-full hover:bg-white transition-all transform group-hover:scale-105"
            >
              {language === "es" ? "Solicitar diagnóstico" : "Request diagnosis"}
            </Link>
          </div>
        </div>

        {/* Architecture label */}
        <div className="flex items-center justify-center gap-3 text-[10px] font-mono text-white/20 uppercase tracking-widest">
          <span className="w-8 h-px bg-white/10" />
          <span>{language === "es" ? "Arquitectura Modular JMG-TC" : "JMG-TC Modular Architecture"}</span>
          <span className="w-8 h-px bg-white/10" />
        </div>
      </div>
    </section>
  );
}
