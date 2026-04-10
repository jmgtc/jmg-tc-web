import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-brand-black border-t border-white/5 py-16">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold text-white mb-3">
              JMG Tech <span className="text-gold">Consulting</span>
            </div>
            <p className="text-brand-gray-body text-sm leading-relaxed">
              Socio tecnológico especializado en desarrollo web, automatización con IA y consultoría IT.
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Navegar</h4>
            <ul className="space-y-2 text-sm text-brand-gray-body">
              {["Inicio", "Nosotros", "Servicios", "Blog", "Contacto"].map((item) => (
                <li key={item}>
                  <Link href={`/${item === "Inicio" ? "" : item.toLowerCase()}`} className="hover:text-gold transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">¿Hablamos?</h4>
            <p className="text-brand-gray-body text-sm mb-4">Si tienes alguna pregunta o proyecto en mente, estamos aquí.</p>
            <Link
              href="/contacto"
              className="inline-block px-6 py-3 bg-gold text-black font-bold rounded-full text-sm hover:bg-white transition-all"
            >
              Trabajemos juntos
            </Link>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-brand-gray-body/40">
          <span>© {new Date().getFullYear()} JMG Tech Consulting. Todos los derechos reservados.</span>
          <span className="font-mono">Module_Footer // v2.0</span>
        </div>
      </div>
    </footer>
  );
}
