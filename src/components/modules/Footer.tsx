"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import Link from "next/link";
import { Globe, MessageSquare, Send } from "lucide-react";

interface FooterProps {
  cmsData?: any;
}

const getSocialIcon = (platform: string) => {
  const p = (platform || "").toLowerCase();

  if (p.includes("instagram")) return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
  if (p.includes("linkedin")) return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
  if (p.includes("facebook")) return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
  if (p.includes("whatsapp")) return <MessageSquare size={16} />;
  if (p.includes("telegram")) return <Send size={16} />;
  return <Globe size={16} />;
};

export default function Footer({ cmsData }: FooterProps) {
  const { language } = useLanguage();

  const site = cmsData;
  const footer = cmsData?.footer;
  const socialData = footer?.socialLinks || site?.socialLinks || [];
  const tagValue = footer?.tag || site?.tag || "v2.4";

  const brandName = site?.logoText || "JMG Tech Consulting";
  const brandAccent = site?.logoAccent || "Consulting";
  const description =
    (language === "en"
      ? footer?.description_en || site?.description_en
      : footer?.description || site?.description) ||
    (language === "es"
      ? "Socio tecnológico especializado en sistemas digitales, automatización con IA y desarrollo web de alto rendimiento."
      : "Technology partner specialized in digital systems, AI automation and high-performance web development.");

  const services = [
    { es: "Web Profesional", en: "Professional Website", href: "/servicios" },
    { es: "Sistema con IA", en: "AI System", href: "/servicios" },
    { es: "Plataforma a medida", en: "Custom Platform", href: "/servicios" },
    { es: "Consultoría IT", en: "IT Consulting", href: "/servicios" },
  ];

  const platform = [
    { es: "Panel de cliente", en: "Client Dashboard", href: "/dashboard" },
    { es: "Blog", en: "Blog", href: "/blog" },
    { es: "Nosotros", en: "About", href: "/nosotros" },
    { es: "Contacto", en: "Contact", href: "/contacto" },
  ];

  const legal = [
    { es: "Aviso legal", en: "Legal notice", href: "/legal/aviso-legal" },
    { es: "Privacidad", en: "Privacy", href: "/legal/privacidad" },
    { es: "Cookies", en: "Cookies", href: "/legal/cookies" },
  ];

  return (
    <footer className="bg-[#060606] border-t border-white/5 pt-16 relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Col 1 — Brand */}
          <div className="lg:col-span-1">
            <div className="text-xl font-bold text-white mb-3 tracking-tight">
              {brandName.replace(brandAccent, "")}{" "}
              <span className="text-gold">{brandAccent}</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              {description}
            </p>
            {socialData.length > 0 && (
              <div className="flex items-center gap-3">
                {socialData.map((link: any, i: number) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.platform}
                    className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/30 hover:text-gold hover:border-gold/40 transition-all"
                  >
                    {getSocialIcon(link.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Col 2 — Services */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5">
              {language === "es" ? "Servicios" : "Services"}
            </h4>
            <ul className="space-y-2.5">
              {services.map((item) => (
                <li key={item.href + item.es}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/40 hover:text-gold transition-colors"
                  >
                    {language === "es" ? item.es : item.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Platform */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5">
              {language === "es" ? "Plataforma" : "Platform"}
            </h4>
            <ul className="space-y-2.5">
              {platform.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/40 hover:text-gold transition-colors"
                  >
                    {language === "es" ? item.es : item.en}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact CTA */}
          <div>
            <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-5">
              {language === "es" ? "¿Hablamos?" : "Let's talk?"}
            </h4>
            <p className="text-white/40 text-sm mb-5 leading-relaxed">
              {language === "es"
                ? "Cuéntanos tu proyecto. Primera consulta gratuita."
                : "Tell us about your project. First consultation free."}
            </p>
            <Link
              href="/contacto"
              className="inline-block px-5 py-2.5 bg-gold text-black text-xs font-bold rounded-full hover:bg-white transition-all hover:scale-105 mb-4"
            >
              {language === "es" ? "Solicitar diagnóstico" : "Request diagnosis"}
            </Link>
            <p className="text-white/25 text-xs">
              info@jmg-tc.com
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 py-5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/25">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <span>© {new Date().getFullYear()} {brandName}. {language === "es" ? "Todos los derechos reservados." : "All rights reserved."}</span>
            <div className="flex items-center gap-4">
              {legal.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-gold transition-colors">
                  {language === "es" ? item.es : item.en}
                </Link>
              ))}
            </div>
          </div>
          <span className="font-mono text-[9px] uppercase tracking-widest opacity-40">{tagValue}</span>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/34600000000?text=Hola,%20me%20interesa%20un%20diagnóstico%20gratuito"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 left-6 z-40 w-12 h-12 rounded-full flex items-center justify-center shadow-[0_4px_24px_rgba(37,211,102,0.4)] bg-[#25D366] hover:scale-110 transition-all duration-300 group"
        aria-label="Contactar por WhatsApp"
        title="WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
        </svg>
        {/* Tooltip */}
        <span className="absolute left-full ml-3 whitespace-nowrap glass rounded-lg px-3 py-1.5 text-xs text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
          {language === "es" ? "Escríbenos ahora" : "Message us now"}
        </span>
      </a>
    </footer>
  );
}
