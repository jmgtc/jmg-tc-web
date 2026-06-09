import { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/modules/Badge";
import TrustSection from "@/components/sections/TrustSection";

export const metadata: Metadata = {
  title: "Automatización de Procesos Empresariales | JMG Tech Consulting",
  description: "Ahorra cientos de horas al mes con nuestra automatización de procesos. Conectamos tus herramientas para que tu empresa funcione en piloto automático.",
  alternates: {
    canonical: "https://www.jmg-tc.com/servicios/automatizacion-procesos",
  }
};

export default function AutomatizacionProcesosPage() {
  return (
    <div className="min-h-screen bg-[#060606] pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-gold/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <Badge text="Eficiencia Operativa" className="mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Automatización de Procesos Empresariales
          </h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
            Elimina el trabajo manual repetitivo. Conectamos tus plataformas para que la información fluya sin intervención humana, reduciendo errores y costes operativos.
          </p>
        </div>

        <div className="space-y-16">
          <section className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-6">Tareas que deberías estar automatizando</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-gold font-bold mb-2">Ventas y Onboarding</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Envíos de emails automáticos tras registro, creación de clientes en el CRM, firmas de contratos y generación de facturas sin tocar un solo botón.
                </p>
              </div>
              <div>
                <h3 className="text-gold font-bold mb-2">Gestión de Leads</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Cualificación de prospectos automatizada y alertas directas al equipo comercial por Slack o WhatsApp.
                </p>
              </div>
              <div>
                <h3 className="text-gold font-bold mb-2">Sincronización de Datos</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Si pasas datos de un Excel a una herramienta web, estás perdiendo dinero. Hacemos que tus sistemas se hablen entre sí mediante integraciones API.
                </p>
              </div>
              <div>
                <h3 className="text-gold font-bold mb-2">Informes y Reportes</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Recopilación de KPIs semanales y generación de dashboards automatizados para la dirección.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Herramientas que Conectamos</h2>
            <p className="text-center text-white/60 mb-8 max-w-2xl mx-auto">
              Utilizamos plataformas como Make (Integromat), Zapier y desarrollos a medida en <Link href="/servicios/desarrollo-web-medida" className="text-gold hover:underline">Next.js y Node</Link> para integrar todo tu ecosistema de software.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['HubSpot', 'Salesforce', 'Stripe', 'Holded', 'Slack', 'WhatsApp API', 'Notion', 'Airtable', 'Google Workspace'].map((tool) => (
                <span key={tool} className="px-4 py-2 rounded-full border border-white/10 text-white/50 text-sm">
                  {tool}
                </span>
              ))}
            </div>
          </section>

          <section className="text-center pt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Recupera el tiempo de tu equipo</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              La automatización es la clave para escalar sin inflar tu estructura de costes. Analizamos tu operativa y te proponemos un plan de eficiencia.
            </p>
            <Link href="/diagnostico-tecnologico" className="inline-block bg-gold text-black font-bold px-8 py-4 rounded-full hover:bg-white transition-colors">
              Solicitar diagnóstico de automatización
            </Link>
          </section>
        </div>
      </div>
      <TrustSection />
    </div>
  );
}
