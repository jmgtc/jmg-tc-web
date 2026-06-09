import { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/modules/Badge";
import TrustSection from "@/components/sections/TrustSection";

export const metadata: Metadata = {
  title: "Soporte Mac para Negocios y Empresas en Bizkaia | IT Especializado",
  description: "Soporte técnico y gestión IT especializada en ecosistemas Apple (Mac, iPad, iPhone) para empresas en Getxo y Bizkaia. MDM, seguridad, redes y optimización macOS.",
  alternates: {
    canonical: "https://www.jmg-tc.com/servicios/soporte-mac-negocios",
    languages: {
      'es': "https://www.jmg-tc.com/servicios/soporte-mac-negocios",
      'en': "https://www.jmg-tc.com/en/services/mac-support-business"
    }
  }
};

export default function SoporteMacPage() {
  return (
    <div className="min-h-screen bg-[#060606] pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-gold/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <Badge text="Mantenimiento IT" className="mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Soporte Técnico Especializado en <span className="text-gold">Mac</span> para Empresas
          </h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
            Asegura el máximo rendimiento de tu flota Apple. Proveemos administración centralizada, soporte técnico preventivo y despliegues seguros para negocios en Getxo y toda Bizkaia que operan en ecosistema Mac.
          </p>
        </div>

        <div className="space-y-16">
          <section className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-6">Gestión Centralizada de Equipos (MDM)</h2>
            <p className="text-white/60 mb-4 leading-relaxed">
              El soporte IT moderno no trata de ir arreglando ordenadores rotos uno por uno. Se trata de previsión y control. Con nuestras soluciones de MDM (Mobile Device Management) para macOS y iOS, administramos tu parque informático en remoto y a escala.
            </p>
            <p className="text-white/60 leading-relaxed">
              Configuramos nuevos Mac sin tocarlos (Zero-Touch Deployment), forzamos políticas de seguridad corporativas, gestionamos actualizaciones, y encriptamos discos duros de manera imperceptible para el usuario.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Nuestras Áreas de Soporte Apple</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass p-8 rounded-3xl border border-white/5">
                <h3 className="text-xl font-bold text-white mb-3">Seguridad en macOS</h3>
                <p className="text-sm text-white/50 mb-4">Despliegue de FileVault, control de firewall corporativo, antivirus de nueva generación adaptado a Apple Silicon y políticas de acceso condicional.</p>
              </div>
              <div className="glass p-8 rounded-3xl border border-white/5">
                <h3 className="text-xl font-bold text-white mb-3">Soporte Técnico Integral</h3>
                <p className="text-sm text-white/50 mb-4">Resolución rápida de incidencias de software, configuraciones de red, recuperación de datos y consultoría sobre migraciones a nuevos chips M-series.</p>
              </div>
              <div className="glass p-8 rounded-3xl border border-white/5">
                <h3 className="text-xl font-bold text-white mb-3">Redes y Almacenamiento</h3>
                <p className="text-sm text-white/50 mb-4">Configuración de NAS (Synology, QNAP) perfectamente integrados con el protocolo SMB de Apple, copias de seguridad Time Machine y gestión de permisos empresariales.</p>
              </div>
              <div className="glass p-8 rounded-3xl border border-white/5">
                <h3 className="text-xl font-bold text-white mb-3">Consultoría Local</h3>
                <p className="text-sm text-white/50 mb-4">Como <Link href="/consultoria-tecnologica-getxo" className="text-gold hover:underline">consultores locales</Link>, ofrecemos trato directo y estratégico para alinear la inversión en tecnología Apple con los objetivos de crecimiento de tu empresa.</p>
              </div>
            </div>
          </section>

          <section className="text-center pt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Profesionaliza tu ecosistema Apple</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Deja de lidiar con problemas técnicos y asegura la operatividad ininterrumpida de tu equipo de trabajo.
            </p>
            <Link href="/diagnostico-tecnologico" className="inline-block bg-gold text-black font-bold px-8 py-4 rounded-full hover:bg-white transition-colors">
              Solicitar diagnóstico de infraestructura Apple
            </Link>
          </section>
        </div>
      </div>
      <TrustSection />
    </div>
  );
}
