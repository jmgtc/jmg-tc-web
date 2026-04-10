import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios | JMG Tech Consulting",
  description: "Gestión IT, Desarrollo Web y ConsultorIA — soluciones tecnológicas adaptadas a tu negocio.",
};

const servicios = [
  {
    id: "01",
    tag: "Module_Servicios // IT",
    titulo: "Gestión Informática",
    desc: "Infraestructura robusta y siempre activa. Gestionamos tus sistemas para que puedas centrarte en tu negocio.",
    fases: ["Diagnóstico de Infraestructura", "Definición de Objetivos", "Implementación de Soluciones", "Monitoreo Continuo"],
    cta: "Hablar con un especialista",
  },
  {
    id: "02",
    tag: "Module_Servicios // Web",
    titulo: "Desarrollo Web y Apps",
    desc: "Presencia digital premium que convierte visitantes en clientes. Tecnologías modernas y diseño orientado a conversión.",
    fases: ["Análisis de Requerimientos", "Diseño UX/UI", "Desarrollo Full-Stack", "Monitoreo y Crecimiento"],
    cta: "Solicitar presupuesto",
  },
  {
    id: "03",
    tag: "Module_Servicios // IA",
    titulo: "ConsultorIA",
    desc: "Automatización inteligente para que tu negocio opere 24/7. Identificamos procesos, implementamos IA y medimos el impacto real.",
    fases: ["Identificar Procesos a Automatizar", "Selección de Tecnología IA", "Diseño del Flujo Inteligente", "Monitoreo y Optimización"],
    cta: "Automatiza tu negocio",
    dark: true,
  },
];

export default function ServiciosPage() {
  return (
    <main className="min-h-screen pt-32 pb-24">
      {/* Header */}
      <div className="bg-brand-white-offset">
        <div className="container mx-auto px-6 pb-16">
          <span className="text-[10px] font-mono text-brand-gray-body/50 uppercase tracking-[0.4em] block mb-3">
            Page_Servicios // Soluciones
          </span>
          <h1 className="text-5xl font-bold text-brand-gray-title mb-4">Nuestros Servicios</h1>
          <p className="text-brand-gray-body max-w-xl text-lg">
            Tres pilares tecnológicos. Un único socio estratégico.
          </p>
        </div>
      </div>

      {/* Servicios */}
      {servicios.map((srv) => (
        <div key={srv.id} className={srv.dark ? "bg-brand-black" : "bg-brand-white-offset"}>
          <div className="container mx-auto px-6 py-24">
            <div className="max-w-4xl mx-auto">
              <span className={`text-[10px] font-mono uppercase tracking-[0.4em] block mb-4 ${srv.dark ? "text-gold/60" : "text-brand-gray-body/50"}`}>
                {srv.tag}
              </span>
              <h2 className={`text-4xl font-bold mb-4 ${srv.dark ? "text-white" : "text-brand-gray-title"}`}>{srv.titulo}</h2>
              <p className={`text-lg mb-10 ${srv.dark ? "text-brand-gray-body" : "text-brand-gray-body"}`}>{srv.desc}</p>

              <div className="grid md:grid-cols-4 gap-4 mb-10">
                {srv.fases.map((fase, i) => (
                  <div key={i} className={`p-4 rounded-2xl border ${srv.dark ? "border-white/10 hover:border-gold/30" : "border-black/5 hover:border-gold/50"} transition-colors`}>
                    <span className="text-gold font-bold text-xs block mb-2">0{i + 1}</span>
                    <p className={`text-sm font-medium ${srv.dark ? "text-white/80" : "text-brand-gray-title"}`}>{fase}</p>
                  </div>
                ))}
              </div>

              <a
                href="/contacto"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition-all hover:scale-105 ${
                  srv.dark
                    ? "bg-gold text-black hover:bg-white"
                    : "bg-brand-black text-white hover:bg-gold hover:text-black"
                }`}
              >
                {srv.cta}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      ))}
    </main>
  );
}
