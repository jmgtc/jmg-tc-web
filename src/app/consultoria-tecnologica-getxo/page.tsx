import { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/modules/Badge";
import TrustSection from "@/components/sections/TrustSection";

export const metadata: Metadata = {
  title: "Consultoría Tecnológica en Getxo | JMG Tech Consulting",
  description: "Servicios de consultoría tecnológica en Getxo. Transformación digital, desarrollo web, IA y soporte IT a medida para negocios locales y pymes en Bizkaia.",
  alternates: {
    canonical: "https://www.jmg-tc.com/consultoria-tecnologica-getxo",
  }
};

export default function ConsultoriaGetxoPage() {
  return (
    <div className="min-h-screen bg-[#060606] pt-32 pb-24 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-gold/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <Badge text="Consultoría Local" className="mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Consultoría Tecnológica y Digital en <span className="text-gold">Getxo</span>
          </h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
            Ayudamos a pymes, autónomos y empresas locales en Getxo y Bizkaia a dar el salto digital con soluciones de desarrollo web, inteligencia artificial y automatización de procesos.
          </p>
        </div>

        <div className="space-y-16">
          <section className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-6">¿Por qué elegir un partner tecnológico local?</h2>
            <p className="text-white/60 mb-4 leading-relaxed">
              Trabajar con una consultora tecnológica en Getxo te permite tener un trato directo, cercano y personalizado. Entendemos el tejido empresarial local y adaptamos la tecnología a la realidad de tu negocio, sin importar su tamaño.
            </p>
            <p className="text-white/60 leading-relaxed">
              Desde la digitalización básica hasta la implementación de sistemas de inteligencia artificial complejos, somos tu departamento IT externalizado en la margen derecha.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Nuestros Servicios IT para Negocios en Bizkaia</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/servicios/desarrollo-web-medida" className="block glass p-8 rounded-3xl border border-white/5 hover:border-gold/30 transition-colors">
                <h3 className="text-xl font-bold text-white mb-3">Desarrollo Web Profesional</h3>
                <p className="text-sm text-white/50">Páginas web rápidas, optimizadas para SEO local y enfocadas en captar clientes en Bizkaia.</p>
              </Link>
              <Link href="/servicios/inteligencia-artificial-empresas" className="block glass p-8 rounded-3xl border border-white/5 hover:border-gold/30 transition-colors">
                <h3 className="text-xl font-bold text-white mb-3">Inteligencia Artificial</h3>
                <p className="text-sm text-white/50">Asistentes virtuales y análisis de datos para hacer tu empresa más competitiva.</p>
              </Link>
              <Link href="/servicios/automatizacion-procesos" className="block glass p-8 rounded-3xl border border-white/5 hover:border-gold/30 transition-colors">
                <h3 className="text-xl font-bold text-white mb-3">Automatización de Procesos</h3>
                <p className="text-sm text-white/50">Elimina tareas manuales y repetitivas, ahorrando tiempo y dinero todos los meses.</p>
              </Link>
              <Link href="/servicios/soporte-mac-negocios" className="block glass p-8 rounded-3xl border border-white/5 hover:border-gold/30 transition-colors">
                <h3 className="text-xl font-bold text-white mb-3">Soporte Mac para Negocios</h3>
                <p className="text-sm text-white/50">Gestión de flotas Apple y asistencia técnica especializada para entornos corporativos.</p>
              </Link>
            </div>
          </section>

          <section className="text-center pt-8">
            <h2 className="text-2xl font-bold text-white mb-6">¿Hablamos de tu empresa?</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Solicita una auditoría gratuita y descubre cómo la tecnología adecuada puede impulsar tu negocio en Getxo al siguiente nivel.
            </p>
            <Link href="/diagnostico-tecnologico" className="inline-block bg-gold text-black font-bold px-8 py-4 rounded-full hover:bg-white transition-colors">
              Solicitar diagnóstico gratuito
            </Link>
          </section>
        </div>
      </div>
      <TrustSection />
    </div>
  );
}
