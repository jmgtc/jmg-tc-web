export default function Consultorias() {
  const servicios = [
    {
      id: "01",
      tag: "Section_02 // Gestión IT",
      titulo: "Gestión Informática",
      subtitulo: "Infraestructura robusta, siempre activa.",
      fases: [
        { num: "01", label: "Diagnóstico", desc: "Analizamos tu infraestructura actual para detectar vulnerabilidades y oportunidades de mejora." },
        { num: "02", label: "Objetivos", desc: "Definimos metas claras y un plan de acción medible adaptado a tu negocio." },
        { num: "03", label: "Solución", desc: "Implementamos las herramientas y procesos necesarios para operar con eficiencia." },
        { num: "04", label: "Seguimiento", desc: "Monitorizamos de forma continua para garantizar el rendimiento óptimo." },
      ],
    },
    {
      id: "02",
      tag: "Section_02 // Desarrollo Web",
      titulo: "Desarrollo Web y Apps",
      subtitulo: "Presencia digital que convierte visitantes en clientes.",
      fases: [
        { num: "01", label: "Requerimiento", desc: "Escuchamos tu visión y definimos los requisitos funcionales y de diseño." },
        { num: "02", label: "Diseño", desc: "Creamos prototipos y maquetas que reflejan la identidad de tu marca." },
        { num: "03", label: "Desarrollo", desc: "Construimos con tecnologías modernas, rápidas y escalables." },
        { num: "04", label: "Monitoreo", desc: "Aseguramos el funcionamiento y rendimiento tras el lanzamiento." },
      ],
    },
  ];

  return (
    <section className="bg-black py-24">
      {servicios.map((srv, i) => (
        <div
          key={srv.id}
          className={`container mx-auto px-6 mb-24 flex flex-col ${i % 2 !== 0 ? "md:flex-row-reverse" : "md:flex-row"} items-center gap-16`}
        >
          {/* Text side */}
          <div className="flex-1">
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] block mb-4">
              {srv.tag}
            </span>
            <h2 className="text-4xl font-bold text-white mb-2">{srv.titulo}</h2>
            <p className="text-white/70 mb-10 text-lg leading-relaxed">{srv.subtitulo}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {srv.fases.map((fase) => (
                <div key={fase.num} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/50 transition-all group backdrop-blur-xl">
                  <span className="text-gold font-bold text-xs tracking-widest">{fase.num}</span>
                  <h3 className="font-bold text-white mt-1 mb-1 group-hover:text-gold transition-colors">{fase.label}</h3>
                  <p className="text-xs text-white/60 leading-relaxed font-light">{fase.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual side */}
          <div className="flex-1 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gold/5 blur-[100px] rounded-full" />
            <div className="w-80 h-80 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-3xl flex items-center justify-center shadow-2xl relative z-10 group overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-gold font-bold text-9xl opacity-20 group-hover:opacity-40 transition-all transform group-hover:scale-110">{srv.id}</span>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
