import { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/modules/Badge";
import TrustSection from "@/components/sections/TrustSection";

export const metadata: Metadata = {
  title: "Desarrollo Web a Medida para Empresas | JMG Tech Consulting",
  description: "Desarrollo web a medida enfocado en rendimiento y captación de clientes. Páginas corporativas y plataformas SaaS ultrarrápidas con Next.js.",
  alternates: {
    canonical: "https://www.jmg-tc.com/servicios/desarrollo-web-medida",
  }
};

export default function DesarrolloWebPage() {
  return (
    <div className="min-h-screen bg-[#060606] pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-gold/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <Badge text="Ingeniería Web" className="mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Desarrollo Web a Medida de <span className="text-gold">Alto Rendimiento</span>
          </h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
            No hacemos plantillas genéricas. Construimos plataformas digitales robustas, seguras y escalables diseñadas específicamente para alcanzar los objetivos de tu negocio.
          </p>
        </div>

        <div className="space-y-16">
          <section className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-6">Más que una web: Un sistema de ventas y gestión</h2>
            <p className="text-white/60 mb-4 leading-relaxed">
              Una presencia digital seria requiere más que un WordPress lento. Especialmente en sectores B2B o comercio corporativo, el tiempo de carga, la seguridad y la experiencia de usuario (UX) determinan si un cliente confía en ti o se marcha a la competencia.
            </p>
            <p className="text-white/60 leading-relaxed">
              Desarrollamos utilizando tecnologías modernas como React, Next.js y bases de datos cloud escalables. El resultado es un producto digital premium que funciona a la perfección en cualquier dispositivo y posiciona mejor en Google.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Nuestras Soluciones Web</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass p-8 rounded-3xl border border-white/5">
                <h3 className="text-xl font-bold text-white mb-3">Páginas Corporativas</h3>
                <p className="text-sm text-white/50 mb-4">Webs rápidas y optimizadas para SEO, diseñadas para captar leads y comunicar el valor de tu marca con autoridad.</p>
                <ul className="text-xs text-white/40 space-y-2">
                  <li>• Arquitectura SEO-friendly</li>
                  <li>• Diseño responsivo y moderno</li>
                  <li>• Integración con CRM y Analytics</li>
                </ul>
              </div>
              <div className="glass p-8 rounded-3xl border border-white/5">
                <h3 className="text-xl font-bold text-white mb-3">Plataformas SaaS y Dashboards</h3>
                <p className="text-sm text-white/50 mb-4">Sistemas completos con autenticación de usuarios, bases de datos y paneles de gestión para operar tu negocio online.</p>
                <ul className="text-xs text-white/40 space-y-2">
                  <li>• Portales de clientes y áreas privadas</li>
                  <li>• Paneles de control a medida</li>
                  <li>• Integraciones de pagos seguras</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="text-center pt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Haz crecer tu presencia digital</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Si tu web actual no te representa o necesitas desarrollar una herramienta interna compleja, estamos aquí para ayudarte.
            </p>
            <Link href="/diagnostico-tecnologico" className="inline-block bg-gold text-black font-bold px-8 py-4 rounded-full hover:bg-white transition-colors">
              Presupuestar mi proyecto web
            </Link>
          </section>
        </div>
      </div>
      <TrustSection />
    </div>
  );
}
