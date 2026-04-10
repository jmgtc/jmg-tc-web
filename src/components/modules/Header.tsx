"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Nosotros", href: "/nosotros" },
  { label: "Servicios", href: "/servicios" },
  { label: "Blog", href: "/blog" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href ? "text-gold" : "hover:text-gold"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            className="bg-gold text-black px-5 py-2 rounded-full text-sm font-bold hover:bg-white transition-all transform hover:scale-105"
          >
            Agendar Cita
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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`text-sm font-medium transition-colors ${pathname === link.href ? "text-gold" : "hover:text-gold"}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contacto"
            onClick={() => setMobileOpen(false)}
            className="bg-gold text-black px-5 py-3 rounded-full text-sm font-bold text-center hover:bg-white transition-all"
          >
            Agendar Cita
          </Link>
        </div>
      )}
    </header>
  );
}
