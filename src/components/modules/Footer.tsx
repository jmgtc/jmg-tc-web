"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import Link from "next/link";
import { Globe, ArrowUpRight, MessageSquare, Send } from "lucide-react";

interface FooterProps {
  cmsData?: any;
}

const getSocialIcon = (platform: string) => {
  const p = platform.toLowerCase();
  
  if (p.includes('instagram')) return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
    </svg>
  );
  
  if (p.includes('linkedin')) return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
      <rect x="2" y="9" width="4" height="12"></rect>
      <circle cx="4" cy="4" r="2"></circle>
    </svg>
  );

  if (p.includes('facebook')) return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
    </svg>
  );

  if (p.includes('whatsapp')) return <MessageSquare size={18} />;
  if (p.includes('telegram') || p.includes('send')) return <Send size={18} />;
  
  return <Globe size={18} />;
};

export default function Footer({ cmsData }: FooterProps) {
  const { language } = useLanguage();
  
  const site = cmsData;
  // Intento buscar tanto en el objeto footer como en la raíz por si no se han migrado los datos
  const footer = cmsData?.footer;
  const tagValue = footer?.tag || site?.tag || "v2.3";
  const socialData = footer?.socialLinks || site?.socialLinks || [];

  const content = {
    brand_name: site?.logoText || "JMG Tech Consulting",
    brand_accent: site?.logoAccent || "Consulting",
    description: (language === "en" ? (footer?.description_en || site?.description_en) : (footer?.description || site?.description)) || (language === "es" 
      ? 'Socio tecnológico especializado en desarrollo web, automatización con IA y consultoría IT.'
      : 'Technology partner specialized in web development, AI automation, and IT consulting.'),
    nav_title: (language === "en" ? (footer?.nav_title_en || site?.nav_title_en) : (footer?.nav_title || site?.nav_title)) || (language === "es" ? "Navegar" : "Navigation"),
    cta_title: (language === "en" ? (footer?.cta_title_en || site?.cta_title_en) : (footer?.cta_title || site?.cta_title)) || (language === "es" ? "¿Hablamos?" : "Let's talk?"),
    cta_desc: (language === "en" ? (footer?.cta_description_en || site?.cta_description_en) : (footer?.cta_description || site?.cta_description)) || (language === "es" 
      ? 'Si tienes alguna pregunta o proyecto en mente, estamos aquí.'
      : 'If you have any questions or a project in mind, we are here.'),
    cta_btn: (language === "en" ? (footer?.cta_button_en || site?.cta_button_en) : (footer?.cta_button || site?.cta_button)) || (language === "es" ? "Trabajemos juntos" : "Work together"),
    rights: (language === "es" ? "Todos los derechos reservados." : "All rights reserved."),
    tag: tagValue,
    social: socialData
  };

  return (
    <footer className="bg-black border-t border-white/5 pt-16 relative">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold text-white mb-3">
              {content.brand_name.replace(content.brand_accent, '')} <span className="text-gold">{content.brand_accent}</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-6">
              {content.description}
            </p>
            {/* Social Links */}
            {content.social.length > 0 && (
              <div className="flex items-center gap-4">
                {content.social.map((link: any, i: number) => (
                  <a 
                    key={i} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-gold hover:border-gold/50 transition-all"
                    title={link.platform}
                  >
                    {getSocialIcon(link.platform)}
                  </a>
                ))}
              </div>
            )}
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

        <div className="border-t border-white/5 py-[22px] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40 min-h-[22px]">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 h-full">
            <span className="flex items-center">© {new Date().getFullYear()} {content.brand_name}. {content.rights}</span>
            <div className="flex items-center gap-4 h-full">
              <Link href="/legal/aviso-legal" className="hover:text-gold transition-colors">
                {language === 'es' ? 'Aviso Legal' : 'Legal Notice'}
              </Link>
              <Link href="/legal/privacidad" className="hover:text-gold transition-colors">
                {language === 'es' ? 'Privacidad' : 'Privacy'}
              </Link>
              <Link href="/legal/cookies" className="hover:text-gold transition-colors">
                {language === 'es' ? 'Cookies' : 'Cookies'}
              </Link>
            </div>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest opacity-30">{content.tag}</span>
        </div>
      </div>
    </footer>
  );
}
