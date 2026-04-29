"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import Link from "next/link";

export default function SystemDemo() {
  const { language } = useLanguage();

  const steps = [
    {
      num: "01",
      color: "text-blue-400",
      border: "border-blue-500/30",
      bg: "bg-blue-500/5",
      iconPath:
        "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418",
      titleEs: "Visita la web",
      titleEn: "Visit the website",
      descEs: "Tu cliente entra a la web y el asistente IA lo recibe, responde sus dudas y lo cualifica como lead.",
      descEn: "Your client visits the website and the AI assistant greets them, answers questions and qualifies them as a lead.",
      tagEs: "Web + AI Concierge",
      tagEn: "Website + AI Concierge",
    },
    {
      num: "02",
      color: "text-gold",
      border: "border-gold/30",
      bg: "bg-gold/5",
      iconPath:
        "M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75",
      titleEs: "Rellena el formulario",
      titleEn: "Fills the form",
      descEs: "Envía su nombre, email y necesidad. El mensaje queda guardado en PostgreSQL y llega notificación inmediata.",
      descEn: "Sends their name, email and need. The message is saved to PostgreSQL and an immediate notification arrives.",
      tagEs: "Formulario → Base de datos",
      tagEn: "Form → Database",
    },
    {
      num: "03",
      color: "text-purple-400",
      border: "border-purple-500/30",
      bg: "bg-purple-500/5",
      iconPath:
        "M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z",
      titleEs: "Se registra y accede",
      titleEn: "Signs up and logs in",
      descEs: "Con Clerk, el cliente crea su cuenta segura en segundos. Autenticación con Google o email.",
      descEn: "With Clerk, the client creates their secure account in seconds. Authentication with Google or email.",
      tagEs: "Auth — Clerk",
      tagEn: "Auth — Clerk",
    },
    {
      num: "04",
      color: "text-green-400",
      border: "border-green-500/30",
      bg: "bg-green-500/5",
      iconPath:
        "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z",
      titleEs: "Realiza el pago",
      titleEn: "Makes the payment",
      descEs: "Elige su plan, hace checkout con Stripe en un clic. El pago se registra automáticamente en la base de datos.",
      descEn: "Chooses their plan, checks out with Stripe in one click. Payment is automatically recorded in the database.",
      tagEs: "Checkout — Stripe",
      tagEn: "Checkout — Stripe",
    },
    {
      num: "05",
      color: "text-cyan-400",
      border: "border-cyan-500/30",
      bg: "bg-cyan-500/5",
      iconPath:
        "M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6",
      titleEs: "Accede a su dashboard",
      titleEn: "Accesses their dashboard",
      descEs: "Panel privado con sus pedidos, suscripciones y métricas. Todo en tiempo real, sin una sola llamada.",
      descEn: "Private panel with their orders, subscriptions and metrics. All real-time, without a single phone call.",
      tagEs: "Dashboard — PostgreSQL",
      tagEn: "Dashboard — PostgreSQL",
    },
  ];

  const techBadges = [
    { label: "Next.js 16", color: "bg-white/10 text-white/60" },
    { label: "Sanity CMS", color: "bg-red-500/10 text-red-400" },
    { label: "PostgreSQL", color: "bg-blue-500/10 text-blue-400" },
    { label: "Clerk Auth", color: "bg-purple-500/10 text-purple-400" },
    { label: "Stripe", color: "bg-green-500/10 text-green-400" },
    { label: "Gemini AI", color: "bg-gold/10 text-gold" },
  ];

  return (
    <section className="py-28 bg-black relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-gold/4 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.5em] block mb-4">
            Section_05 // Demo
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {language === "es" ? (
              <>Así funciona tu sistema <span className="text-gold">por dentro</span></>
            ) : (
              <>This is how your system works <span className="text-gold">inside</span></>
            )}
          </h2>
          <p className="text-white/60 text-lg">
            {language === "es"
              ? "Esto no es una web con un formulario de contacto. Es una plataforma completa con backend real."
              : "This is not a website with a contact form. It's a complete platform with a real backend."}
          </p>
        </div>

        {/* Flow steps */}
        <div className="relative mb-20">
          {/* Vertical connector */}
          <div className="absolute left-8 top-12 bottom-12 w-px bg-gradient-to-b from-blue-500/30 via-gold/30 to-cyan-500/30 hidden md:block" />

          <div className="space-y-4">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`flex items-start gap-6 p-6 rounded-2xl border ${step.border} ${step.bg} group hover:scale-[1.01] transition-all duration-300`}
              >
                {/* Step number */}
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 border ${step.border} bg-black/40 relative z-10`}>
                  <div className="text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${step.color} mx-auto`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={step.iconPath} />
                    </svg>
                    <span className={`text-[9px] font-mono ${step.color} opacity-60 block mt-0.5`}>{step.num}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className={`font-bold text-white text-base group-hover:${step.color} transition-colors`}>
                      {language === "es" ? step.titleEs : step.titleEn}
                    </h3>
                    <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${step.border} ${step.color} opacity-70`}>
                      {language === "es" ? step.tagEs : step.tagEn}
                    </span>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {language === "es" ? step.descEs : step.descEn}
                  </p>
                </div>

                {/* Arrow */}
                {i < steps.length - 1 && (
                  <div className="hidden md:flex items-center self-center">
                    <svg className={`w-4 h-4 ${step.color} opacity-40`} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack showcase */}
        <div className="glass rounded-3xl p-8 border border-white/10 mb-12">
          <div className="text-center mb-6">
            <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2">
              {language === "es" ? "Stack tecnológico en producción" : "Technology stack in production"}
            </p>
            <h3 className="text-xl font-bold text-white">
              {language === "es"
                ? "Esto NO es una web. Es una plataforma."
                : "This is NOT a website. It's a platform."}
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {techBadges.map((badge) => (
              <span
                key={badge.label}
                className={`px-4 py-2 rounded-full text-sm font-mono font-semibold border border-white/10 ${badge.color}`}
              >
                {badge.label}
              </span>
            ))}
          </div>
        </div>

        {/* CTA pair */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/dashboard"
            className="px-8 py-4 glass border border-white/20 text-white font-bold rounded-full hover:bg-white/10 transition-all text-sm flex items-center gap-2 group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gold">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
            </svg>
            {language === "es" ? "Ver el dashboard en vivo" : "See the live dashboard"}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link
            href="/contacto"
            className="px-8 py-4 bg-gold text-black font-bold rounded-full hover:bg-white transition-all hover:scale-105 text-sm shadow-[0_0_25px_rgba(242,204,82,0.25)]"
          >
            {language === "es" ? "Quiero este sistema para mi negocio" : "I want this system for my business"}
          </Link>
        </div>
      </div>
    </section>
  );
}
