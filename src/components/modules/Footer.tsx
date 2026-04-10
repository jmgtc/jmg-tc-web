"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import Link from "next/link";

export default function Footer() {
  const { language, dict } = useLanguage();
  const t = dict.header;

  return (
    <footer className="bg-black border-t border-white/5 py-16 relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold text-white mb-3">
              JMG Tech <span className="text-gold">Consulting</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              {language === 'es' 
                ? 'Socio tecnológico especializado en desarrollo web, automatización con IA y consultoría IT.'
                : 'Technology partner specialized in web development, AI automation, and IT consulting.'}
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
              {language === 'es' ? 'Navegar' : 'Navigation'}
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              {[
                { es: "Inicio", en: "Home", href: "/" },
                { es: "Nosotros", en: "About", href: "/nosotros" },
                { es: "Servicios", en: "Services", href: "/servicios" },
                { es: "Blog", en: "Blog", href: "/blog" },
                { es: "Contacto", en: "Contact", href: "/contacto" }
              ].map((item) => (
                <li key={item.es}>
                  <Link href={item.href} className="hover:text-gold transition-colors">
                    {language === 'es' ? item.es : item.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
               {language === 'es' ? '¿Hablamos?' : 'Let\'s talk?'}
            </h4>
            <p className="text-white/60 text-sm mb-4">
               {language === 'es' 
                ? 'Si tienes alguna pregunta o proyecto en mente, estamos aquí.'
                : 'If you have any questions or a project in mind, we are here.'}
            </p>
            <Link
              href="/contacto"
              className="inline-block px-6 py-3 bg-gold text-black font-bold rounded-full text-sm hover:bg-white transition-all transform hover:scale-105"
            >
              {language === 'es' ? 'Trabajemos juntos' : 'Work together'}
            </Link>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <span>© {new Date().getFullYear()} JMG Tech Consulting. {language === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}</span>
          <span className="font-mono opacity-50">Module_Footer // v2.1</span>
        </div>
      </div>
    </footer>
  );
}
