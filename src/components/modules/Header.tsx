"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

// Eliminamos navLinks estático y lo manejamos dentro del componente con el diccionario

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Header() {
  const { language, setLanguage, dict } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const h = dict.header;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Ocultar header en el panel de administración para evitar solapamientos visuales
  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-6xl">
      <div
        className={`glass rounded-[50px] px-6 py-2 flex items-center justify-between transition-all duration-500 ${
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
            JMG Tech <span className="text-gold">Consulting</span>
          </span>
        </Link>

        {/* Nav escritorio */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/nosotros" className={`text-sm font-medium transition-colors ${pathname === "/nosotros" ? "text-gold" : "hover:text-gold"}`}>
            {h.about}
          </Link>
          <Link href="/servicios" className={`text-sm font-medium transition-colors ${pathname === "/servicios" ? "text-gold" : "hover:text-gold"}`}>
            {h.services}
          </Link>
          <Link href="/blog" className={`text-sm font-medium transition-colors ${pathname === "/blog" ? "text-gold" : "hover:text-gold"}`}>
            {h.blog}
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

          <Link
            href="/contacto"
            className="bg-gold text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-white transition-all transform hover:scale-105"
          >
            {h.cta}
          </Link>
        </nav>

        {/* Botón móvil */}
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
      </div>

      {/* Menú móvil desplegable */}
      {mobileOpen && (
        <div className="mt-2 glass rounded-3xl p-6 flex flex-col gap-4 md:hidden">
          <Link href="/nosotros" onClick={() => setMobileOpen(false)} className={`text-sm font-medium ${pathname === "/nosotros" ? "text-gold" : ""}`}>
            {h.about}
          </Link>
          <Link href="/servicios" onClick={() => setMobileOpen(false)} className={`text-sm font-medium ${pathname === "/servicios" ? "text-gold" : ""}`}>
            {h.services}
          </Link>
          <Link href="/blog" onClick={() => setMobileOpen(false)} className={`text-sm font-medium ${pathname === "/blog" ? "text-gold" : ""}`}>
            {h.blog}
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
            {h.cta}
          </Link>
        </div>
      )}
    </header>
  );
}
