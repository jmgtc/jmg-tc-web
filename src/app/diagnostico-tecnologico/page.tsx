import { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/modules/Badge";
import TrustSection from "@/components/sections/TrustSection";

export const metadata: Metadata = {
  title: "Diagnóstico Tecnológico Gratuito en Bizkaia | JMG Tech Consulting",
  description: "Solicita un diagnóstico tecnológico gratuito para tu negocio en Getxo o Bizkaia. Analizamos tu web, procesos manuales, y potencial de IA para optimizar tu empresa.",
  alternates: {
    canonical: "https://www.jmg-tc.com/diagnostico-tecnologico",
    languages: {
      'es': "https://www.jmg-tc.com/diagnostico-tecnologico",
      'en': "https://www.jmg-tc.com/en/tech-diagnosis"
    }
  }
};

export default function DiagnosticoPage() {
  return (
    <div className="min-h-screen bg-[#060606] pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-gold/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <Badge text="Auditoría Gratuita" className="mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Diagnóstico Tecnológico para <span className="text-gold">Tu Negocio</span>
          </h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
            ¿Sientes que tu empresa pierde tiempo en tareas manuales o que tu web no capta suficientes clientes? Diseñamos una hoja de ruta para negocios locales en Getxo y Bizkaia.
          </p>
        </div>

        <div className="space-y-16">
          <section className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">¿Qué revisamos en el diagnóstico?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-gold font-bold mb-2">Presencia y Rendimiento Web</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Analizamos la velocidad de tu web actual, su posicionamiento local en Google y si la estructura está diseñada para convertir visitantes en clientes reales.
                </p>
              </div>
              <div>
                <h3 className="text-gold font-bold mb-2">Procesos Manuales</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Identificamos cuellos de botella en tu día a día: traspaso de datos manuales, correos repetitivos o flujos de trabajo que deberían estar <Link href="/servicios/automatizacion-procesos" className="text-gold hover:underline">automatizados</Link>.
                </p>
              </div>
              <div>
                <h3 className="text-gold font-bold mb-2">Potencial de IA</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Evaluamos si tu negocio puede beneficiarse de <Link href="/servicios/inteligencia-artificial-empresas" className="text-gold hover:underline">agentes de inteligencia artificial</Link> para atención al cliente o análisis de datos.
                </p>
              </div>
              <div>
                <h3 className="text-gold font-bold mb-2">Infraestructura IT y Seguridad</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Si usas Apple, revisamos tu <Link href="/servicios/soporte-mac-negocios" className="text-gold hover:underline">flota de ordenadores Mac</Link>, copias de seguridad y protocolos de seguridad.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-8 text-center">¿Para quién es este servicio?</h2>
            <p className="text-center text-white/60 mb-8 max-w-2xl mx-auto">
              Como expertos en <Link href="/consultoria-tecnologica-getxo" className="text-gold hover:underline">consultoría tecnológica local</Link>, este diagnóstico está pensado exclusivamente para:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-6 py-3 rounded-full border border-white/10 text-white/70 font-medium">Pymes y empresas consolidadas</span>
              <span className="px-6 py-3 rounded-full border border-white/10 text-white/70 font-medium">Comercios con presencia online</span>
              <span className="px-6 py-3 rounded-full border border-white/10 text-white/70 font-medium">Startups y proyectos escalables</span>
              <span className="px-6 py-3 rounded-full border border-white/10 text-white/70 font-medium">Autónomos y profesionales</span>
            </div>
          </section>

          <section className="text-center pt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Da el primer paso hacia la digitalización</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Rellena nuestro formulario de contacto para reservar una reunión de 30 minutos, donde te entregaremos una evaluación sin compromiso.
            </p>
            <Link href="/contacto" className="inline-block bg-gold text-black font-bold px-8 py-4 rounded-full hover:bg-white transition-colors">
              Ir al formulario de contacto
            </Link>
          </section>
        </div>
      </div>
      <TrustSection />
    </div>
  );
}
