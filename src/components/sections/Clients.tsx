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
  const [activeIndex, setActiveIndex] = useState(0);

  // Drag
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);

  if (!clients || clients.length === 0) return null;

  const title =
    (language === "es" ? data?.title : data?.title_en) ||
    (language === "es" ? "Nuestros Clientes" : "Our Clients");

  // ── Scroll → dot sync ──────────────────────────────────────────
  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const cardW = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 28
      : 400;
    const idx = Math.round(el.scrollLeft / cardW);
    setActiveIndex(Math.min(Math.max(idx, 0), clients.length - 1));
  }, [clients.length]);

  // ── Arrow navigation ───────────────────────────────────────────
  const scrollBy = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const cardW = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 28
      : 400;
    el.scrollBy({ left: dir === "next" ? cardW : -cardW, behavior: "smooth" });
  };

  // ── Mouse drag ─────────────────────────────────────────────────
  const onMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX;
    scrollStart.current = el.scrollLeft;
    el.style.cursor = "grabbing";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const diff = (e.pageX - startX.current) * 1.3;
    trackRef.current.scrollLeft = scrollStart.current - diff;
  };

  const onMouseUp = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  // ── Dot click ──────────────────────────────────────────────────
  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cardW = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 28
      : 400;
    el.scrollTo({ left: cardW * i, behavior: "smooth" });
  };

  return (
    <section className="py-28 relative overflow-hidden" style={{ background: "#0a0b0e" }}>
      {/* Top separator */}
      <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }} />

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.04) 0%, transparent 70%)" }} />

      {/* Title */}
      <div className="text-center mb-14 px-6">
        <span className="block text-[10px] font-mono tracking-[0.5em] uppercase mb-4"
          style={{ color: "rgba(255,255,255,0.2)" }}>
          {language === "es" ? "Confían en nosotros" : "They trust us"}
        </span>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight" style={{ color: "rgba(255,255,255,0.92)" }}>
          {title}
        </h2>
      </div>

      {/* Carousel container */}
      <div className="relative">
        {/* Arrow prev */}
        <button
          onClick={() => scrollBy("prev")}
          aria-label="Anterior"
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-20
            w-11 h-11 rounded-full flex items-center justify-center
            transition-all duration-200 hover:scale-110"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Arrow next */}
        <button
          onClick={() => scrollBy("next")}
          aria-label="Siguiente"
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-20
            w-11 h-11 rounded-full flex items-center justify-center
            transition-all duration-200 hover:scale-110"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
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
          onScroll={onScroll}
          className="flex gap-7 overflow-x-auto"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            cursor: "grab",
            paddingLeft: "clamp(60px, 8vw, 140px)",
            paddingRight: "clamp(60px, 8vw, 140px)",
            paddingTop: "16px",
            paddingBottom: "20px",
          }}
        >
          {clients.map((client, i) => (
            <LogoCard key={client._id ?? i} client={client} />
          ))}
        </div>
      </div>

      {/* Dots */}
      {clients.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          {clients.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir al cliente ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === activeIndex ? "24px" : "6px",
                height: "6px",
                background: i === activeIndex
                  ? "rgba(242,204,82,0.9)"
                  : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// ── Logo-only Card ─────────────────────────────────────────────────────────────
function LogoCard({ client }: { client: any }) {
  const [hovered, setHovered] = useState(false);

  const logoUrl = client.logo
    ? urlFor(client.logo).width(600).format("webp").url()
    : null;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        scrollSnapAlign: "center",
        /* Responsive width via clamp */
        width: "clamp(280px, 36vw, 420px)",
        height: "clamp(240px, 28vw, 360px)",
        borderRadius: "24px",
        background: "#111318",
        border: hovered
          ? "1px solid rgba(255,255,255,0.18)"
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: hovered
          ? "0 0 40px rgba(99,102,241,0.08), 0 8px 32px rgba(0,0,0,0.4)"
          : "0 4px 20px rgba(0,0,0,0.3)",
        transform: hovered ? "scale(1.025)" : "scale(1)",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(28px, 6%, 56px)",
        cursor: "default",
        userSelect: "none",
      }}
    >
      {logoUrl ? (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <Image
            src={logoUrl}
            alt={client.name || "Cliente"}
            fill
            loading="lazy"
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 40vw, 420px"
            style={{
              objectFit: "contain",
              filter: "brightness(1.4) contrast(0.9)",
              opacity: hovered ? 1 : 0.75,
              transition: "opacity 0.3s ease",
            }}
          />
        </div>
      ) : (
        /* Fallback: initials */
        <span
          style={{
            fontSize: "clamp(32px, 6vw, 56px)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: "rgba(255,255,255,0.25)",
            textTransform: "uppercase",
            userSelect: "none",
          }}
        >
          {client.name?.slice(0, 2) || "CL"}
        </span>
      )}
    </div>
  );
}
