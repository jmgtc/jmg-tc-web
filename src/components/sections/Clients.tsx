"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface ClientProps {
  data: any;
  clients: any[];
}

export default function Clients({ data, clients }: ClientProps) {
  const { language } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);

  // Drag state
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [dragged, setDragged] = useState(false);

  // Active index for dot indicators
  const [activeIndex, setActiveIndex] = useState(0);

  if (!clients || clients.length === 0) return null;

  const title =
    (language === "es" ? data?.title : data?.title_en) ||
    (language === "es" ? "Clientes" : "Clients");

  const subtitle =
    language === "es"
      ? "Empresas que confían en nosotros"
      : "Companies that trust us";

  // ─── Drag handlers ───────────────────────────────────────────────
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeft.current = trackRef.current.scrollLeft;
    setDragged(false);
    trackRef.current.style.cursor = "grabbing";
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    if (Math.abs(walk) > 4) setDragged(true);
    trackRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  }, []);

  // ─── Scroll sync → active dot ────────────────────────────────────
  const handleScroll = useCallback(() => {
    if (!trackRef.current) return;
    const cardW = trackRef.current.offsetWidth * 0.78 + 24; // approx card + gap
    const idx = Math.round(trackRef.current.scrollLeft / cardW);
    setActiveIndex(Math.min(idx, clients.length - 1));
  }, [clients.length]);

  // ─── Arrow navigation ────────────────────────────────────────────
  const scrollTo = (dir: "prev" | "next") => {
    if (!trackRef.current) return;
    const cardW = trackRef.current.offsetWidth * 0.78 + 24;
    trackRef.current.scrollBy({ left: dir === "next" ? cardW : -cardW, behavior: "smooth" });
  };

  // Category fallback label
  const getCategory = (client: any) =>
    client.category ||
    client.tipo ||
    (language === "es" ? "Cliente" : "Client");

  return (
    <section className="py-28 bg-brand-black relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-gold/4 rounded-full blur-[150px] pointer-events-none" />

      {/* Header */}
      <div className="container mx-auto px-6 mb-14 text-center relative z-10">
        <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.5em] block mb-4">
          Section_09 // Clientes
        </span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">{title}</h2>
        <p className="text-white/40 text-base">{subtitle}</p>
      </div>

      {/* Carousel wrapper */}
      <div className="relative">
        {/* Arrow prev */}
        <button
          onClick={() => scrollTo("prev")}
          aria-label="Anterior"
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass border border-white/15 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold/40 transition-all hover:scale-110 shadow-xl"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Arrow next */}
        <button
          onClick={() => scrollTo("next")}
          aria-label="Siguiente"
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full glass border border-white/15 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold/40 transition-all hover:scale-110 shadow-xl"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </button>

        {/* Track */}
        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 px-[11vw] md:px-[12vw]"
          style={{
            cursor: "grab",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {clients.map((client, i) => (
            <ClientCard
              key={client._id ?? i}
              client={client}
              language={language}
              getCategory={getCategory}
              index={i}
              isActive={i === activeIndex}
            />
          ))}
          {/* Trailing spacer so last card can reach center */}
          <div className="flex-shrink-0 w-[10vw] md:w-[11vw]" />
        </div>
      </div>

      {/* Dot indicators */}
      {clients.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8">
          {clients.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (!trackRef.current) return;
                const cardW = trackRef.current.offsetWidth * 0.78 + 24;
                trackRef.current.scrollTo({ left: cardW * i, behavior: "smooth" });
              }}
              className={`rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-6 h-1.5 bg-gold"
                  : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Ir al cliente ${i + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Card Component ───────────────────────────────────────────────────────────
function ClientCard({
  client,
  language,
  getCategory,
  index,
  isActive,
}: {
  client: any;
  language: string;
  getCategory: (c: any) => string;
  index: number;
  isActive: boolean;
}) {
  const logoUrl = client.logo
    ? urlFor(client.logo).width(400).format("webp").url()
    : null;

  const year = client.year || client.ano || null;
  const category = getCategory(client);

  return (
    <div
      className={`
        flex-shrink-0 w-[78vw] sm:w-[60vw] md:w-[42vw] lg:w-[32vw] xl:w-[26vw]
        rounded-[20px] border transition-all duration-500 select-none
        bg-white/[0.03] backdrop-blur-sm
        flex flex-col items-center justify-center
        px-10 py-14 gap-6
        ${isActive
          ? "border-white/20 shadow-[0_0_40px_rgba(255,255,255,0.04)] scale-[1.02]"
          : "border-white/8 hover:border-white/15 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.03)]"
        }
      `}
    >
      {/* Logo */}
      <div className="w-full flex items-center justify-center h-24 relative">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt={client.name || "Logo cliente"}
            fill
            className="object-contain filter brightness-150 opacity-80 hover:opacity-100 transition-opacity duration-300"
            sizes="(max-width: 640px) 70vw, (max-width: 1024px) 45vw, 30vw"
            loading="lazy"
          />
        ) : (
          <span className="text-3xl font-black text-white/50 uppercase tracking-tighter">
            {client.name?.slice(0, 2) || "CL"}
          </span>
        )}
      </div>

      {/* Divider */}
      <div className="w-12 h-px bg-white/10" />

      {/* Name */}
      <div className="text-center space-y-2">
        <h3 className="text-white font-semibold text-lg leading-tight">
          {client.name || "—"}
        </h3>

        {/* Category + Year */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest px-2.5 py-1 rounded-full border border-white/10">
            {category}
          </span>
          {year && (
            <span className="text-[10px] font-mono text-gold/50">
              {year}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
