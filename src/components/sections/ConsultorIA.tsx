export default function ConsultorIA() {
  const fases = [
    { num: "01", label: "Identificar", desc: "Mapeamos los procesos repetitivos de tu empresa que pueden automatizarse con IA." },
    { num: "02", label: "Tecnología", desc: "Seleccionamos las herramientas de IA más adecuadas: LLMs, agentes, APIs y workflows." },
    { num: "03", label: "Diseño", desc: "Diseñamos el flujo de automatización adaptado a tu equipo y sin interrumpir operaciones." },
    { num: "04", label: "Monitoreo", desc: "Medimos el impacto real y optimizamos continuamente el sistema inteligente." },
  ];

  return (
    <section className="bg-brand-black py-28 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[140px]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] font-mono text-gold/60 uppercase tracking-[0.5em] block mb-4">
            Section_03 // ConsultorIA
          </span>
          <h2 className="text-5xl font-bold text-white mb-4">
            Consultor<span className="text-gold">IA</span>
          </h2>
          <p className="text-brand-gray-body max-w-xl mx-auto text-lg">
            Automatización inteligente para que tu negocio opere 24/7 sin intervención manual.
          </p>
        </div>

        {/* Phases Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {fases.map((fase, i) => (
            <div key={fase.num} className="glass rounded-2xl p-6 border border-white/5 hover:border-gold/30 transition-all group">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold font-bold text-xs group-hover:bg-gold/20 transition-colors">
                  {fase.num}
                </span>
                {i < fases.length - 1 && (
                  <div className="flex-1 h-px bg-white/10 hidden md:block" />
                )}
              </div>
              <h3 className="font-bold text-white mb-2 group-hover:text-gold transition-colors">{fase.label}</h3>
              <p className="text-xs text-brand-gray-body leading-relaxed">{fase.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/contacto"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-black font-bold rounded-full hover:bg-white transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(242,204,82,0.25)]"
          >
            <span>Automatiza tu empresa</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
