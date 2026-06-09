import { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/modules/Badge";
import TrustSection from "@/components/sections/TrustSection";

export const metadata: Metadata = {
  title: "Inteligencia Artificial para Empresas en Bizkaia | JMG Tech Consulting",
  description: "Implementamos soluciones de Inteligencia Artificial para empresas en Getxo y Bizkaia. Automatiza procesos, reduce costes y escala tu negocio con IA a medida.",
  alternates: {
    canonical: "https://www.jmg-tc.com/servicios/inteligencia-artificial-empresas",
  }
};

export default function IAEmpresasPage() {
  return (
    <div className="min-h-screen bg-[#060606] pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-gold/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <Badge text="Soluciones Empresariales" className="mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Soluciones de <span className="text-gold">Inteligencia Artificial</span> para tu Empresa
          </h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
            Transforma la manera en que operas. Desarrollamos e integramos IA para automatizar flujos de trabajo, mejorar la atención al cliente y analizar datos de forma inteligente, para empresas en Bizkaia y a nivel nacional.
          </p>
        </div>

        <div className="space-y-16">
          <section className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-6">Beneficios reales de la IA B2B</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-gold font-bold mb-2">Reducción de Costes</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Automatizar procesos recurrentes disminuye horas invertidas en tareas manuales, permitiendo a tu equipo enfocarse en trabajo de alto valor estratégico.
                </p>
              </div>
              <div>
                <h3 className="text-gold font-bold mb-2">Atención 24/7</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Implementa asistentes de IA que resuelvan dudas de clientes, capten leads y agenden reuniones de forma ininterrumpida.
                </p>
              </div>
              <div>
                <h3 className="text-gold font-bold mb-2">Análisis de Datos</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Convierte grandes volúmenes de datos en decisiones accionables rápidamente sin depender de análisis manuales largos.
                </p>
              </div>
              <div>
                <h3 className="text-gold font-bold mb-2">Escalabilidad Sin Límites</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Tu negocio puede procesar un volumen 10x mayor de trabajo sin necesidad de multiplicar proporcionalmente tus costes de personal.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Nuestro Proceso de Implementación</h2>
            <div className="space-y-6">
              <div className="glass p-6 rounded-3xl flex gap-4 items-start border border-white/5">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="text-white font-bold mb-2">Auditoría y Viabilidad</h3>
                  <p className="text-white/60 text-sm">Analizamos tus procesos actuales para identificar cuellos de botella donde la inteligencia artificial puede tener un ROI positivo inmediato.</p>
                </div>
              </div>
              <div className="glass p-6 rounded-3xl flex gap-4 items-start border border-white/5">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="text-white font-bold mb-2">Desarrollo de Agentes y Automatizaciones</h3>
                  <p className="text-white/60 text-sm">Integramos modelos avanzados (LLMs) con tus herramientas actuales (<Link href="/servicios/automatizacion-procesos" className="text-gold hover:underline">automatización de procesos</Link>) de forma segura y privada.</p>
                </div>
              </div>
              <div className="glass p-6 rounded-3xl flex gap-4 items-start border border-white/5">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="text-white font-bold mb-2">Despliegue y Entrenamiento</h3>
                  <p className="text-white/60 text-sm">Lanzamos la solución, formamos a tu equipo y ajustamos el modelo con interacciones reales para maximizar su eficacia.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="text-center pt-8">
            <h2 className="text-2xl font-bold text-white mb-6">¿Preparado para integrar IA en tu negocio?</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Descubre qué procesos de tu empresa se pueden automatizar hoy mismo con Inteligencia Artificial.
            </p>
            <Link href="/diagnostico-tecnologico" className="inline-block bg-gold text-black font-bold px-8 py-4 rounded-full hover:bg-white transition-colors">
              Agendar diagnóstico de viabilidad IA
            </Link>
          </section>
        </div>
      </div>
      <TrustSection />
    </div>
  );
}
