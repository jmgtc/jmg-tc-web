"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import Link from "next/link";

export default function TrustSection() {
  const { language } = useLanguage();

  const reasons = [
    {
      icon: "M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5",
      titleEs: "Código real, no plantillas",
      titleEn: "Real code, not templates",
      descEs: "Cada proyecto se construye desde cero con stack moderno. Next.js, TypeScript, arquitectura escalable desde el primer día.",
      descEn: "Every project is built from scratch with modern stack. Next.js, TypeScript, scalable architecture from day one.",
    },
    {
      icon: "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z",
      titleEs: "IA integrada de verdad",
      titleEn: "Truly integrated AI",
      descEs: "No son demos. Gemini, automatizaciones y agentes inteligentes en producción real en los proyectos de nuestros clientes.",
      descEn: "Not demos. Gemini, automations and intelligent agents in real production in our clients' projects.",
    },
    {
      icon: "M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z",
      titleEs: "Pagos e infraestructura incluida",
      titleEn: "Payments and infrastructure included",
      descEs: "Auth, Stripe, base de datos PostgreSQL y despliegue en Vercel. No tienes que preocuparte de la infraestructura.",
      descEn: "Auth, Stripe, PostgreSQL database and Vercel deployment. You don't have to worry about infrastructure.",
    },
    {
      icon: "M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941",
      titleEs: "Enfoque en negocio, no solo diseño",
      titleEn: "Business-focused, not just design",
      descEs: "Cada decisión técnica tiene un objetivo de negocio: captar, convertir o retener clientes. No hacemos proyectos bonitos sin resultados.",
      descEn: "Every technical decision has a business objective: capture, convert or retain clients. We don't make pretty projects without results.",
    },
    {
      icon: "M18.375 12.739l-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13",
      titleEs: "Soporte técnico real",
      titleEn: "Real technical support",
      descEs: "No desaparecemos después de entregar. Somos tu socio tecnológico a largo plazo con soporte continuo.",
      descEn: "We don't disappear after delivery. We're your long-term technology partner with continuous support.",
    },
    {
      icon: "M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6",
      titleEs: "Arquitectura escalable",
      titleEn: "Scalable architecture",
      descEs: "Lo que construimos hoy crece contigo mañana. Sin reescrituras costosas cuando tu negocio escale.",
      descEn: "What we build today grows with you tomorrow. No costly rewrites when your business scales.",
    },
  ];

  const steps = [
    {
      num: "01",
      titleEs: "Diagnóstico gratuito",
      titleEn: "Free diagnosis",
      descEs: "Analizamos tu situación actual, tus objetivos y te decimos exactamente qué necesitas (y qué no).",
      descEn: "We analyze your current situation, your goals and tell you exactly what you need (and what you don't).",
    },
    {
      num: "02",
      titleEs: "Propuesta técnica",
      titleEn: "Technical proposal",
      descEs: "Diseñamos la arquitectura del sistema y el alcance del proyecto con precios transparentes.",
      descEn: "We design the system architecture and project scope with transparent pricing.",
    },
    {
      num: "03",
      titleEs: "Desarrollo ágil",
      titleEn: "Agile development",
      descEs: "Sprints cortos con entregas visibles. Tú siempre sabes en qué punto está tu proyecto.",
      descEn: "Short sprints with visible deliveries. You always know where your project stands.",
    },
    {
      num: "04",
      titleEs: "Lanzamiento y soporte",
      titleEn: "Launch and support",
      descEs: "Desplegamos, formamos a tu equipo y te acompañamos en el crecimiento del sistema.",
      descEn: "We deploy, train your team and support you as the system grows.",
    },
  ];

  return (
    <section className="py-28 bg-brand-black relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Why JMG TC */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.5em] block mb-4">
            Section_06 // Confianza
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {language === "es"
              ? <>Por qué elegir <span className="text-gold">JMG Tech Consulting</span></>
              : <>Why choose <span className="text-gold">JMG Tech Consulting</span></>}
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            {language === "es"
              ? "No somos una agencia genérica. Somos ingenieros que construyen sistemas que funcionan y escalan."
              : "We're not a generic agency. We're engineers who build systems that work and scale."}
          </p>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="group p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-gold/30 transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4 group-hover:bg-gold/20 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gold">
                  <path strokeLinecap="round" strokeLinejoin="round" d={r.icon} />
                </svg>
              </div>
              <h3 className="text-white font-bold mb-2 group-hover:text-gold transition-colors">
                {language === "es" ? r.titleEs : r.titleEn}
              </h3>
              <p className="text-white/50 text-sm leading-relaxed">
                {language === "es" ? r.descEs : r.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* How we work */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">
              {language === "es" ? "Cómo trabajamos" : "How we work"}
            </h3>
            <p className="text-white/50">
              {language === "es"
                ? "Proceso claro, comunicación directa, resultados medibles."
                : "Clear process, direct communication, measurable results."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            {/* Connector line */}
            <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent hidden md:block" />

            {steps.map((step, i) => (
              <div key={i} className="relative text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/5 border border-gold/30 flex items-center justify-center mx-auto mb-4 relative z-10">
                  <span className="text-gold font-black text-lg">{step.num}</span>
                </div>
                <h4 className="text-white font-bold mb-2 text-sm">
                  {language === "es" ? step.titleEs : step.titleEn}
                </h4>
                <p className="text-white/40 text-xs leading-relaxed">
                  {language === "es" ? step.descEs : step.descEn}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gold text-black font-bold rounded-full hover:bg-white transition-all hover:scale-105 shadow-[0_0_30px_rgba(242,204,82,0.25)]"
            >
              {language === "es" ? "Empezar con el diagnóstico gratuito" : "Start with free diagnosis"}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
