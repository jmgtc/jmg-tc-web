"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Fingerprint, User } from "lucide-react";
import { SignInButton, UserButton, useAuth } from '@clerk/nextjs';

// Eliminamos navLinks estático y lo manejamos dentro del componente con el diccionario

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Header({ cmsData }: { cmsData?: any }) {
  const { language, setLanguage, dict } = useLanguage();
  
  const h = cmsData?.header;
  const site = cmsData;

  const labels = {
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
  const pathname = usePathname();
  const isMaintenance = pathname === "/maintenance";

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
          <span className="hidden md:block text-sm font-bold text-white/80">
            {labels.brand_main} <span className="text-gold">{labels.brand_accent}</span>
          </span>
        </Link>

        {/* Nav escritorio - Oculto en mantenimiento */}
        {!isMaintenance && (
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/nosotros" className={`text-sm font-medium transition-colors ${pathname === "/nosotros" ? "text-gold" : "hover:text-gold"}`}>
              {labels.about}
            </Link>
            <Link href="/servicios" className={`text-sm font-medium transition-colors ${pathname === "/servicios" ? "text-gold" : "hover:text-gold"}`}>
              {labels.services}
            </Link>
            <Link href="/blog" className={`text-sm font-medium transition-colors ${pathname === "/blog" ? "text-gold" : "hover:text-gold"}`}>
              {labels.blog}
            </Link>
  
            {/* Selector de idioma */}
            <div className="flex items-center gap-2 mr-4 text-xs font-bold border-r border-white/10 pr-4">
              <button 
                onClick={() => setLanguage("es")}
                className={language === "es" ? "text-gold" : "text-white/40 hover:text-white"}
              >ES</button>
              <span className="text-white/20">|</span>
              <button 
                onClick={() => setLanguage("en")}
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
                  <UserButton afterSignOutUrl="/" />
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
            className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors"
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
        <div className="mt-2 glass rounded-3xl p-6 flex flex-col gap-4 md:hidden">
          <Link href="/nosotros" onClick={() => setMobileOpen(false)} className={`text-sm font-medium ${pathname === "/nosotros" ? "text-gold" : ""}`}>
            {labels.about}
          </Link>
          <Link href="/servicios" onClick={() => setMobileOpen(false)} className={`text-sm font-medium ${pathname === "/servicios" ? "text-gold" : ""}`}>
            {labels.services}
          </Link>
          <Link href="/blog" onClick={() => setMobileOpen(false)} className={`text-sm font-medium ${pathname === "/blog" ? "text-gold" : ""}`}>
            {labels.blog}
          </Link>
          
          <div className="flex justify-center gap-4 py-2 border-y border-white/5 my-2">
            <button 
              onClick={() => setLanguage("es")}
              className={`text-sm font-bold ${language === "es" ? "text-gold" : "text-white/40"}`}
            >Español</button>
            <span className="text-white/20">|</span>
            <button 
              onClick={() => setLanguage("en")}
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
