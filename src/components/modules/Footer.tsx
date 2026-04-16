"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import Link from "next/link";

interface FooterProps {
  cmsData?: any;
}

export default function Footer({ cmsData }: FooterProps) {
  const { language } = useLanguage();
  
  const site = cmsData;
  const footer = cmsData?.footer;

  const content = {
    brand_name: site?.logoText || "JMG Tech Consulting",
    brand_accent: site?.logoAccent || "Consulting",
    description: (language === "en" ? footer?.description_en : footer?.description) || (language === "es" 
      ? 'Socio tecnológico especializado en desarrollo web, automatización con IA y consultoría IT.'
      : 'Technology partner specialized in web development, AI automation, and IT consulting.'),
    nav_title: (language === "en" ? footer?.nav_title_en : footer?.nav_title) || (language === "es" ? "Navegar" : "Navigation"),
    cta_title: (language === "en" ? footer?.cta_title_en : footer?.cta_title) || (language === "es" ? "¿Hablamos?" : "Let's talk?"),
    cta_desc: (language === "en" ? footer?.cta_description_en : footer?.cta_description) || (language === "es" 
      ? 'Si tienes alguna pregunta o proyecto en mente, estamos aquí.'
      : 'If you have any questions or a project in mind, we are here.'),
    cta_btn: (language === "en" ? footer?.cta_button_en : footer?.cta_button) || (language === "es" ? "Trabajemos juntos" : "Work together"),
    rights: (language === "es" ? "Todos los derechos reservados." : "All rights reserved."),
    tag: footer?.tag || "Module_Footer // v2.3"
  };

  return (
    <footer className="bg-black border-t border-white/5 py-16 relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold text-white mb-3">
              {content.brand_name.replace(content.brand_accent, '')} <span className="text-gold">{content.brand_accent}</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">
              {content.description}
            </p>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">
              {content.nav_title}
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
               {content.cta_title}
            </h4>
            <p className="text-white/60 text-sm mb-4">
               {content.cta_desc}
            </p>
            <Link
              href="/contacto"
              className="inline-block px-6 py-3 bg-gold text-black font-bold rounded-full text-sm hover:bg-white transition-all transform hover:scale-105"
            >
              {content.cta_btn}
            </Link>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <span>© {new Date().getFullYear()} {content.brand_name}. {content.rights}</span>
          <span className="font-mono opacity-50">{content.tag}</span>
        </div>
      </div>
    </footer>
  );
}
