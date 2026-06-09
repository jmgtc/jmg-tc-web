"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import Link from "next/link";
import Badge from "@/components/modules/Badge";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";

interface ServicePhase {
  label?: string;
  label_en?: string;
  desc?: string;
  desc_en?: string;
}

interface ServiceItem {
  _id: string;
  tag?: string;
  tag_en?: string;
  title?: string;
  title_en?: string;
  description?: string;
  description_en?: string;
  problem?: string;
  problem_en?: string;
  result?: string;
  result_en?: string;
  phases?: ServicePhase[];
  dark?: boolean;
  icon_image?: any;
}

interface ConsultoriasProps {
  headerData?: {
    tag?: string;
    tag_en?: string;
    badge?: string;
    badge_en?: string;
    title?: string;
    title_en?: string;
    description?: string;
    description_en?: string;
  };
  services?: ServiceItem[];
}

const PRODUCTS = [
  {
    num: "01",
    tagEs: "Entrada",
    tagEn: "Starter",
    titleEs: "Web Profesional",
    titleEn: "Professional Website",
    problemEs: "¿Tu web antigua no capta clientes o da mala imagen?",
    problemEn: "Does your old website fail to capture clients or give a bad impression?",
    descEs: "Diseñamos webs de alto rendimiento enfocadas en conversión. Rápidas, modernas y optimizadas para posicionarse en Google y captar leads.",
    descEn: "We design high-performance websites focused on conversion. Fast, modern and optimized to rank on Google and capture leads.",
    features: ["Next.js / WordPress", "SEO técnico", "Formulario de contacto", "Responsive perfecto", "Panel CMS"],
    featuresEn: ["Next.js / WordPress", "Technical SEO", "Contact form", "Perfect responsive", "CMS panel"],
    resultEs: "Una web que trabaja mientras tú duermes.",
    resultEn: "A website that works while you sleep.",
    color: "from-blue-500/20 to-transparent",
    accent: "text-blue-400",
    border: "border-blue-500/20",
    cta: "Solicitar web",
    ctaEn: "Request website",
    href: "/servicios/desarrollo-web-medida",
  },
  {
    num: "02",
    tagEs: "Core",
    tagEn: "Core",
    titleEs: "Sistema Automatizado con IA",
    titleEn: "AI Automated System",
    problemEs: "¿Respondes manualmente a leads y pierdes tiempo en tareas repetitivas?",
    problemEn: "Do you manually respond to leads and waste time on repetitive tasks?",
    descEs: "Implementamos un asistente inteligente en tu web que capta, cualifica y responde a clientes 24/7. Flujos automatizados que reemplazan trabajo manual.",
    descEn: "We implement an intelligent assistant on your website that captures, qualifies and responds to clients 24/7. Automated workflows replacing manual work.",
    features: ["Asistente IA (Gemini)", "Captación de leads", "Respuestas automáticas", "Integración CRM", "Análisis de conversación"],
    featuresEn: ["AI Assistant (Gemini)", "Lead capture", "Automatic responses", "CRM integration", "Conversation analytics"],
    resultEs: "Tu empresa en piloto automático para ventas y soporte.",
    resultEn: "Your company on autopilot for sales and support.",
    color: "from-gold/20 to-transparent",
    accent: "text-gold",
    border: "border-gold/30",
    cta: "Ver demo IA",
    ctaEn: "See AI demo",
    highlight: true,
    href: "/servicios/inteligencia-artificial-empresas",
  },
  {
    num: "03",
    tagEs: "Avanzado",
    tagEn: "Advanced",
    titleEs: "Plataforma a Medida",
    titleEn: "Custom Platform",
    problemEs: "¿Necesitas un SaaS, dashboard o sistema con lógica de negocio compleja?",
    problemEn: "Do you need a SaaS, dashboard or system with complex business logic?",
    descEs: "Desarrollamos plataformas completas: auth, pagos, base de datos, panel de administración y API. Escalable desde el día uno.",
    descEn: "We develop complete platforms: auth, payments, database, admin panel and API. Scalable from day one.",
    features: ["Auth (Clerk)", "Pagos (Stripe)", "PostgreSQL + Prisma", "Dashboard cliente", "API REST"],
    featuresEn: ["Auth (Clerk)", "Payments (Stripe)", "PostgreSQL + Prisma", "Client Dashboard", "REST API"],
    resultEs: "Tu propio producto digital listo para escalar.",
    resultEn: "Your own digital product ready to scale.",
    color: "from-purple-500/20 to-transparent",
    accent: "text-purple-400",
    border: "border-purple-500/20",
    cta: "Consultar proyecto",
    ctaEn: "Consult project",
    href: "/servicios/desarrollo-web-medida",
  },
  {
    num: "04",
    tagEs: "Estrategia",
    tagEn: "Strategy",
    titleEs: "Consultoría Tecnológica IT",
    titleEn: "IT Technology Consulting",
    problemEs: "¿Tu infraestructura IT falla o no sabes por dónde empezar a digitalizarte?",
    problemEn: "Is your IT infrastructure failing or don't you know where to start digitalizing?",
    descEs: "Auditamos tu situación tecnológica y diseñamos una hoja de ruta clara. Soporte técnico, diagnóstico de sistemas y plan de acción.",
    descEn: "We audit your tech situation and design a clear roadmap. Technical support, system diagnostics and action plan.",
    features: ["Auditoría IT", "Diagnóstico de sistemas", "Hoja de ruta tech", "Soporte técnico", "Optimización"],
    featuresEn: ["IT Audit", "System diagnostics", "Tech roadmap", "Technical support", "Optimization"],
    resultEs: "Claridad total sobre tu tecnología y cómo mejorarla.",
    resultEn: "Total clarity on your technology and how to improve it.",
    color: "from-green-500/20 to-transparent",
    accent: "text-green-400",
    border: "border-green-500/20",
    cta: "Solicitar auditoría",
    ctaEn: "Request audit",
    href: "/consultoria-tecnologica-getxo",
  },
];

export default function Consultorias({ headerData, services }: ConsultoriasProps) {
  const { language } = useLanguage();

  return (
    <section className="bg-brand-black py-28 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.5em] block mb-4">
            Section_03 // Servicios
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {language === "es"
              ? <>Elige lo que necesitas. <span className="text-gold">Escala cuando quieras.</span></>
              : <>Choose what you need. <span className="text-gold">Scale when you want.</span></>}
          </h2>
          <p className="text-white/60 text-lg">
            {language === "es"
              ? "No vendemos horas. Entregamos resultados medibles con tecnología de alto nivel."
              : "We don't sell hours. We deliver measurable results with high-level technology."}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PRODUCTS.map((product) => (
            <div
              key={product.num}
              className={`group relative rounded-3xl p-8 border bg-gradient-to-br ${product.color} border-white/10 ${product.highlight ? "border-gold/30" : ""} transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
            >
              {product.highlight && (
                <div className="absolute top-4 right-4">
                  <span className="text-[9px] font-mono bg-gold text-black px-2 py-1 rounded-full font-bold uppercase tracking-wider">
                    {language === "es" ? "Más popular" : "Most popular"}
                  </span>
                </div>
              )}

              {/* Number + Tag */}
              <div className="flex items-center gap-3 mb-6">
                <span className={`text-4xl font-black ${product.accent} opacity-30`}>{product.num}</span>
                <span className={`text-[10px] font-mono ${product.accent} uppercase tracking-widest opacity-70`}>
                  {language === "es" ? product.tagEs : product.tagEn}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-white mb-3">
                {language === "es" ? product.titleEs : product.titleEn}
              </h3>

              {/* Problem */}
              <p className={`text-sm ${product.accent} mb-4 leading-relaxed opacity-90 italic`}>
                {language === "es" ? product.problemEs : product.problemEn}
              </p>

              {/* Description */}
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                {language === "es" ? product.descEs : product.descEn}
              </p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {(language === "es" ? product.features : product.featuresEn).map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-white/70">
                    <svg className={`w-3.5 h-3.5 flex-shrink-0 ${product.accent}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>

              {/* Result */}
              <div className={`p-4 rounded-xl bg-white/5 border ${product.border} mb-6`}>
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-1">
                  {language === "es" ? "Resultado" : "Result"}
                </p>
                <p className={`text-sm font-semibold ${product.accent}`}>
                  → {language === "es" ? product.resultEs : product.resultEn}
                </p>
              </div>

              {/* CTA */}
              <Link
                href={product.href || "/contacto"}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all hover:scale-105 ${
                  product.highlight
                    ? "bg-gold text-black hover:bg-white shadow-[0_0_20px_rgba(242,204,82,0.3)]"
                    : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                }`}
              >
                {language === "es" ? product.cta : product.ctaEn}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-white/40 text-sm mb-4">
            {language === "es" ? "¿No estás seguro qué necesitas? Te ayudamos a decidir." : "Not sure what you need? We'll help you decide."}
          </p>
          <Link
            href="/diagnostico-tecnologico"
            className="inline-flex items-center gap-2 text-gold text-sm font-semibold hover:text-white transition-colors group"
          >
            {language === "es" ? "Solicitar diagnóstico gratuito →" : "Request free diagnosis →"}
          </Link>
        </div>
      </div>
    </section>
  );
}
