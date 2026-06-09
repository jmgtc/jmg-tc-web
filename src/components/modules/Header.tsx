"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Fingerprint, User } from "lucide-react";
import { SignInButton, UserButton, useAuth } from '@clerk/nextjs';

// Eliminamos navLinks estático y lo manejamos dentro del componente con el diccionario

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Header({ cmsData }: { cmsData?: any }) {
  const { language, setLanguage, dict } = useLanguage();
  
  const h = cmsData?.header;
  const site = cmsData;

  const labels = {
    home: (language === "en" ? h?.home_en : h?.home) || (language === "es" ? "Inicio" : "Home"),
    about: (language === "en" ? h?.about_en : h?.about) || dict.header.about,
    services: (language === "en" ? h?.services_en : h?.services) || dict.header.services,
    blog: (language === "en" ? h?.blog_en : h?.blog) || dict.header.blog,
    login: (language === "en" ? h?.login_en : h?.login) || dict.header.login,
    panel: (language === "en" ? h?.panel_en : h?.panel) || dict.header.panel,
    cta: (language === "en" ? h?.cta_en : h?.cta) || dict.header.cta,
    brand_main: site?.logoText?.replace(site?.logoAccent || "Consulting", "") || "JMG Tech ",
    brand_accent: site?.logoAccent || "Consulting"
  };

  const { isLoaded, isSignedIn } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServiciosOpen, setMobileServiciosOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isMaintenance = pathname === "/maintenance";

  const bilingualRoutes: Record<string, string> = {
    "/consultoria-tecnologica-getxo": "/en/tech-consulting-getxo",
    "/diagnostico-tecnologico": "/en/tech-diagnosis",
    "/servicios/inteligencia-artificial-empresas": "/en/services/ai-for-business",
    "/servicios/desarrollo-web-medida": "/en/services/custom-web-development",
    "/servicios/automatizacion-procesos": "/en/services/process-automation",
    "/servicios/soporte-mac-negocios": "/en/services/mac-support-business",
  };

  const handleLanguageChange = (lang: "es" | "en") => {
    setLanguage(lang);
    if (!pathname) return;

    if (lang === "en" && bilingualRoutes[pathname]) {
      router.push(bilingualRoutes[pathname]);
    } else if (lang === "es") {
      const esRoute = Object.keys(bilingualRoutes).find(key => bilingualRoutes[key] === pathname);
      if (esRoute) router.push(esRoute);
    }
  };

  const serviciosDropdown = language === "en" ? [
    { name: "Tech Consulting", href: "/consultoria-tecnologica-getxo" },
    { name: "Artificial Intelligence", href: "/servicios/inteligencia-artificial-empresas" },
    { name: "Web Development", href: "/servicios/desarrollo-web-medida" },
    { name: "Automation", href: "/servicios/automatizacion-procesos" },
    { name: "Mac Support", href: "/servicios/soporte-mac-negocios" },
    { name: "All services", href: "/servicios" },
  ] : [
    { name: "Consultoría tecnológica", href: "/consultoria-tecnologica-getxo" },
    { name: "Inteligencia Artificial", href: "/servicios/inteligencia-artificial-empresas" },
    { name: "Desarrollo Web", href: "/servicios/desarrollo-web-medida" },
    { name: "Automatización", href: "/servicios/automatizacion-procesos" },
    { name: "Soporte Mac", href: "/servicios/soporte-mac-negocios" },
    { name: "Todos los servicios", href: "/servicios" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ocultar header en el panel de administración para evitar solapamientos visuales
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      {/* Botón Secreto Admin - Fuera del header para libertad total */}
      <Link 
        href="/admin" 
        className="fixed top-1 right-1 z-[100] text-gold/40 hover:text-gold transition-all duration-500 p-1"
        title="Admin Access"
      >
        <Fingerprint size={20} strokeWidth={1.5} />
      </Link>

      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-6xl">

      <div
        className={`glass bg-black/70 backdrop-blur-[60px] saturate-[200%] rounded-[50px] px-6 py-3 flex items-center justify-between border border-white/20 shadow-2xl transition-all duration-300 ${
          isScrolled ? "scale-[0.97] shadow-2xl" : "scale-100"
        }`}
      >
        {/* Logo real */}
        <Link href="/" className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.webp"
            alt="JMG Tech Consulting"
            className="h-10 w-10 object-contain rounded-full"
          />
          <span className="hidden lg:block text-sm font-bold text-white/80 whitespace-nowrap">
            {labels.brand_main} <span className="text-gold">{labels.brand_accent}</span>
          </span>
        </Link>

        {/* Nav escritorio - Oculto en mantenimiento */}
        {!isMaintenance && (
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            <Link href="/" className={`text-sm font-medium transition-colors whitespace-nowrap ${pathname === "/" ? "text-gold" : "hover:text-gold"}`}>
              {labels.home}
            </Link>
            <Link href="/nosotros" className={`text-sm font-medium transition-colors whitespace-nowrap ${pathname === "/nosotros" ? "text-gold" : "hover:text-gold"}`}>
              {labels.about}
            </Link>

            {/* Menú Servicios con Desplegable */}
            <div className="relative group py-4 -my-4">
              <Link href="/servicios" className={`text-sm font-medium transition-colors whitespace-nowrap flex items-center gap-1 ${pathname?.startsWith("/servicios") || pathname === "/consultoria-tecnologica-getxo" ? "text-gold" : "hover:text-gold"}`}>
                {labels.services}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 opacity-50 group-hover:rotate-180 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
              </Link>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-0 pt-2 w-[240px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0">
                <div className="glass bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-2xl flex flex-col gap-1">
                  {serviciosDropdown.map((s, i) => (
                    <Link key={i} href={s.href} className="text-sm text-white/70 hover:text-gold hover:bg-white/5 px-4 py-2.5 rounded-xl transition-colors">
                      {s.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link href="/blog" className={`text-sm font-medium transition-colors whitespace-nowrap ${pathname === "/blog" ? "text-gold" : "hover:text-gold"}`}>
              {labels.blog}
            </Link>
            
            <Link href="/diagnostico-tecnologico" className={`text-sm font-medium transition-colors whitespace-nowrap ${pathname === "/diagnostico-tecnologico" ? "text-gold" : "hover:text-gold"}`}>
              {language === "en" ? "Diagnosis" : "Diagnóstico"}
            </Link>
  
            {/* Selector de idioma */}
            <div className="flex items-center gap-2 mr-4 text-xs font-bold border-r border-white/10 pr-4">
              <button 
                onClick={() => handleLanguageChange("es")}
                className={language === "es" ? "text-gold" : "text-white/40 hover:text-white"}
              >ES</button>
              <span className="text-white/20">|</span>
              <button 
                onClick={() => handleLanguageChange("en")}
                className={language === "en" ? "text-gold" : "text-white/40 hover:text-white"}
              >EN</button>
            </div>
 
            {/* Acceso de Usuario */}
            <div className="flex items-center gap-4 mr-2">
              {!isLoaded ? (
                <div className="w-8 h-8 rounded-full bg-white/5 animate-pulse" />
              ) : !isSignedIn ? (
                <SignInButton mode="modal">
                  <button className="text-sm font-medium hover:text-gold transition-colors flex items-center gap-2">
                    <User size={18} strokeWidth={1.5} />
                    {labels.login}
                  </button>
                </SignInButton>
              ) : (
                <>
                  <Link href="/dashboard" className={`text-sm font-medium transition-colors ${pathname === "/dashboard" ? "text-gold" : "hover:text-gold"}`}>
                    {labels.panel}
                  </Link>
                  <UserButton />
                </>
              )}
            </div>
  
            <Link
              href="/contacto"
              className="bg-gold text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-white transition-all transform hover:scale-105"
            >
              {labels.cta}
            </Link>
          </nav>
        )}

        {/* Botón móvil - Oculto en mantenimiento */}
        {!isMaintenance && (
          <button
            className="lg:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menú"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              {mobileOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              }
            </svg>
          </button>
        )}
      </div>

      {/* Menú móvil desplegable */}
      {mobileOpen && (
        <div className="mt-2 glass rounded-3xl p-6 flex flex-col gap-4 lg:hidden">
          <Link href="/" onClick={() => setMobileOpen(false)} className={`text-sm font-medium ${pathname === "/" ? "text-gold" : ""}`}>
            {labels.home}
          </Link>
          <Link href="/nosotros" onClick={() => setMobileOpen(false)} className={`text-sm font-medium ${pathname === "/nosotros" ? "text-gold" : ""}`}>
            {labels.about}
          </Link>

          {/* Menú Servicios Mobile */}
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => setMobileServiciosOpen(!mobileServiciosOpen)} 
              className={`text-sm font-medium flex justify-between items-center ${pathname?.startsWith("/servicios") || pathname === "/consultoria-tecnologica-getxo" ? "text-gold" : ""}`}
            >
              {labels.services}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 transition-transform ${mobileServiciosOpen ? "rotate-180" : ""}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {mobileServiciosOpen && (
              <div className="flex flex-col pl-4 gap-3 py-2 border-l border-white/10 ml-1">
                {serviciosDropdown.map((s, i) => (
                  <Link key={i} href={s.href} onClick={() => setMobileOpen(false)} className="text-sm text-white/60 hover:text-gold">
                    {s.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/blog" onClick={() => setMobileOpen(false)} className={`text-sm font-medium ${pathname === "/blog" ? "text-gold" : ""}`}>
            {labels.blog}
          </Link>

          <Link href="/diagnostico-tecnologico" onClick={() => setMobileOpen(false)} className={`text-sm font-medium ${pathname === "/diagnostico-tecnologico" ? "text-gold" : ""}`}>
            {language === "en" ? "Diagnosis" : "Diagnóstico"}
          </Link>
          
          <div className="flex justify-center gap-4 py-2 border-y border-white/5 my-2">
            <button 
              onClick={() => handleLanguageChange("es")}
              className={`text-sm font-bold ${language === "es" ? "text-gold" : "text-white/40"}`}
            >Español</button>
            <span className="text-white/20">|</span>
            <button 
              onClick={() => handleLanguageChange("en")}
              className={`text-sm font-bold ${language === "en" ? "text-gold" : "text-white/40"}`}
            >English</button>
          </div>
          <Link
            href="/contacto"
            onClick={() => setMobileOpen(false)}
            className="bg-gold text-black px-5 py-3 rounded-full text-sm font-bold text-center hover:bg-white transition-all"
          >
            {labels.cta}
          </Link>
        </div>
      )}
    </header>
    </>
  );
}
