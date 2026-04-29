"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { useLanguage } from "@/components/providers/LanguageProvider";
import Badge from "@/components/modules/Badge";

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

  const title  = language === "es" ? data?.title  : data?.title_en;
  const tag    = language === "es" ? data?.tag    : (data?.tag_en || data?.tag);
  const badge  = language === "es" ? data?.badge  : data?.badge_en;

  // ── Card width helper ──────────────────────────────────────────
  const getCardW = () => {
    const el = trackRef.current;
    if (!el) return 400;
    const first = el.firstElementChild as HTMLElement | null;
    return first ? first.offsetWidth + 28 : 400;
  };

  // ── Scroll → dot sync ─────────────────────────────────────────
  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / getCardW());
    setActiveIndex(Math.min(Math.max(idx, 0), clients.length - 1));
  }, [clients.length]);

  // ── Arrow navigation ──────────────────────────────────────────
  const scrollBy = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "next" ? getCardW() : -getCardW(), behavior: "smooth" });
  };

  // ── Mouse drag ────────────────────────────────────────────────
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
    trackRef.current.scrollLeft = scrollStart.current - (e.pageX - startX.current) * 1.2;
  };
  const stopDrag = () => {
    isDragging.current = false;
    if (trackRef.current) trackRef.current.style.cursor = "grab";
  };

  // ── Dot click ─────────────────────────────────────────────────
  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: getCardW() * i, behavior: "smooth" });
  };

  return (
    <section className="py-32 bg-brand-black border-t border-white/5 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-t from-gold/5 to-transparent pointer-events-none" />

      {/* ── Original header ── */}
      <div className="container mx-auto px-6 mb-16 text-center relative z-10">
        <Badge text={badge || ""} className="mb-6" />
        {tag && (
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] block mb-4">
            {tag}
          </span>
        )}
        <h2 className="text-5xl font-bold uppercase leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-600">
            {title || (language === "es" ? "Nuestros Clientes" : "Our Clients")}
          </span>
        </h2>
      </div>

      {/* ── Premium carousel ── */}
      <div className="relative">
        {/* Arrow prev */}
        <ArrowBtn dir="prev" onClick={() => scrollBy("prev")} />
        {/* Arrow next */}
        <ArrowBtn dir="next" onClick={() => scrollBy("next")} />

        {/* Track */}
        <div
          ref={trackRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onScroll={onScroll}
          className="flex overflow-x-auto"
          style={{
            gap: "28px",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            cursor: "grab",
            paddingLeft:  "clamp(56px, 9vw, 140px)",
            paddingRight: "clamp(56px, 9vw, 140px)",
            paddingTop: "12px",
            paddingBottom: "16px",
          }}
        >
          {clients.map((client, i) => (
            <LogoCard key={client._id ?? i} client={client} />
          ))}
        </div>
      </div>

      {/* ── Dots ── */}
      {clients.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-10">
          {clients.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir al cliente ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width:  i === activeIndex ? "24px" : "6px",
                height: "6px",
                background: i === activeIndex
                  ? "rgba(242,204,82,0.85)"
                  : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// ── Arrow button ──────────────────────────────────────────────────────────────
function ArrowBtn({ dir, onClick }: { dir: "prev" | "next"; onClick: () => void }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      aria-label={dir === "prev" ? "Anterior" : "Siguiente"}
      className="absolute top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200"
      style={{
        [dir === "prev" ? "left" : "right"]: "clamp(12px, 2vw, 24px)",
        background: hov ? "rgba(255,255,255,0.1)"  : "rgba(255,255,255,0.05)",
        border: `1px solid ${hov ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.1)"}`,
        color: hov ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.45)",
        transform: `translateY(-50%) scale(${hov ? 1.08 : 1})`,
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
        {dir === "prev"
          ? <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          : <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        }
      </svg>
    </button>
  );
}

// ── Logo Card (grayscale → color on hover) ────────────────────────────────────
function LogoCard({ client }: { client: any }) {
  const [hov, setHov] = useState(false);

  const logoUrl = client.logo
    ? urlFor(client.logo).width(600).format("webp").url()
    : null;

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        flexShrink: 0,
        scrollSnapAlign: "center",
        width:  "clamp(280px, 34vw, 420px)",
        height: "clamp(240px, 26vw, 360px)",
        borderRadius: "24px",
        background: "#111318",
        border: `1px solid ${hov ? "rgba(255,255,255,0.16)" : "rgba(255,255,255,0.08)"}`,
        boxShadow: hov
          ? "0 0 36px rgba(99,102,241,0.07), 0 8px 28px rgba(0,0,0,0.45)"
          : "0 4px 16px rgba(0,0,0,0.3)",
        transform: hov ? "scale(1.02)" : "scale(1)",
        transition: "all 0.28s cubic-bezier(0.4,0,0.2,1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        userSelect: "none",
        cursor: "default",
      }}
    >
      {logoUrl ? (
        /* White pill — keeps transparent logos visible on dark bg */
        <div
          style={{
            width: "62%",
            height: "60%",
            borderRadius: "14px",
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "14px",
            transition: "box-shadow 0.28s ease",
            boxShadow: hov ? "0 2px 16px rgba(0,0,0,0.15)" : "none",
          }}
        >
          <div style={{ position: "relative", width: "100%", height: "100%" }}>
            <Image
              src={logoUrl}
              alt={client.name || "Cliente"}
              fill
              loading="lazy"
              sizes="(max-width: 640px) 55vw, (max-width: 1024px) 30vw, 280px"
              style={{
                objectFit: "contain",
                filter:  hov ? "none" : "grayscale(100%)",
                opacity: hov ? 1 : 0.82,
                transition: "filter 0.3s ease, opacity 0.3s ease",
              }}
            />
          </div>
        </div>
      ) : (
        <span
          style={{
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            color: hov ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.2)",
            textTransform: "uppercase",
            transition: "color 0.3s ease",
          }}
        >
          {client.name?.slice(0, 2) || "CL"}
        </span>
      )}
    </div>
  );
}
