import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nosotros | JMG Tech Consulting",
  description: "Conoce a Jose y la misión de JMG Tech Consulting: simplificar y automatizar negocios con tecnología de élite.",
};

const valores = [
  { icon: "⚡", label: "Innovación", desc: "Adoptamos las últimas tecnologías para darte ventaja competitiva real." },
  { icon: "🔒", label: "Seguridad", desc: "Tu infraestructura y datos protegidos bajo los más altos estándares." },
  { icon: "🤝", label: "Cercanía", desc: "Somos tu socio, no un proveedor. Entendemos tu negocio en profundidad." },
  { icon: "🔍", label: "Transparencia", desc: "Comunicación clara, presupuestos sin sorpresas y resultados medibles." },
];

export default function NosotrosPage() {
  return (
    <main className="min-h-screen bg-brand-white-offset pt-32 pb-24">
      <div className="container mx-auto px-6">

        {/* Hero Nosotros */}
        <div className="max-w-4xl mx-auto mb-24">
          <span className="text-[10px] font-mono text-brand-gray-body/50 uppercase tracking-[0.4em] block mb-3">
            Page_Nosotros // Quiénes somos
          </span>
          <h1 className="text-5xl font-bold text-brand-gray-title mb-6">
            Tu tecnología,<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-black to-brand-gray">
              en manos de un experto
            </span>
          </h1>
          <p className="text-lg text-brand-gray-body leading-relaxed max-w-2xl">
            JMG Tech Consulting nace de la convicción de que cualquier negocio, independientemente de su tamaño, merece acceder a tecnología de élite. Simplificamos y automatizamos para que puedas crecer sin fricciones.
          </p>
        </div>

        {/* Perfil Jose */}
        <div className="bg-brand-black rounded-3xl p-10 md:p-16 mb-24 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-40 h-40 rounded-full bg-gold/10 border-2 border-gold/30 flex items-center justify-center flex-shrink-0">
            <span className="text-5xl">👨‍💻</span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-gold/60 uppercase tracking-widest block mb-2">Module_Perfil // Jose</span>
            <h2 className="text-3xl font-bold text-white mb-3">Jose Gutiérrez</h2>
            <p className="text-gold text-sm font-bold mb-4">Ingeniero Informático · Fundador</p>
            <p className="text-brand-gray-body leading-relaxed text-sm">
              Con más de una década de experiencia en infraestructura IT, desarrollo web y automatización con IA,
              Jose actúa como socio tecnológico de sus clientes: una figura de confianza que entiende su negocio
              y aporta soluciones de impacto real, no propuestas genéricas.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="max-w-4xl mx-auto">
          <span className="text-[10px] font-mono text-brand-gray-body/50 uppercase tracking-[0.4em] block mb-6">
            Module_Valores // Pilares
          </span>
          <h2 className="text-3xl font-bold text-brand-gray-title mb-10">Nuestros valores</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {valores.map((v) => (
              <div key={v.label} className="bg-white rounded-2xl p-6 border border-black/5 hover:border-gold/50 transition-all group">
                <span className="text-3xl block mb-4">{v.icon}</span>
                <h3 className="font-bold text-brand-gray-title mb-2 group-hover:text-gold transition-colors">{v.label}</h3>
                <p className="text-xs text-brand-gray-body leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="max-w-4xl mx-auto mt-24 text-center">
          <p className="text-brand-gray-body mb-6 text-lg">¿Tu negocio necesita más que tecnología?</p>
          <a
            href="/contacto"
            className="inline-block px-8 py-4 bg-gold text-black font-bold rounded-full hover:bg-brand-black hover:text-white transition-all"
          >
            Hablemos
          </a>
        </div>
      </div>
    </main>
  );
}
