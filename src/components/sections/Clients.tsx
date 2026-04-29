"use client";

import React from "react";
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
  
  if (!clients || clients.length === 0) return null;

  const title = language === "es" ? data?.title : data?.title_en;
  const tag = language === "es" ? data?.tag : (data?.tag_en || data?.tag);
  const badge = language === "es" ? data?.badge : data?.badge_en;

  // Duplicate items for seamless loop
  const marqueeItems = [...clients, ...clients, ...clients];

  return (
    <section className="py-32 bg-brand-black border-t border-white/5 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-t from-gold/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 mb-20 text-center relative z-10">
        <Badge text={badge || ""} className="mb-6" />
        {tag && (
          <span className="text-[10px] font-mono text-white/20 uppercase tracking-[0.5em] block mb-4">
            {tag}
          </span>
        )}
        <h2 className="text-5xl font-bold uppercase leading-tight">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-300 via-zinc-400 to-zinc-600">
            {title || (language === "es" ? "Clientes" : "Clients")}
          </span>
        </h2>
      </div>

      <div className="relative flex overflow-x-hidden group/marquee">
        <div className="flex animate-marquee whitespace-nowrap py-10 items-center">
          {marqueeItems.map((client, i) => (
            <div 
              key={`${client._id}-${i}`} 
              className="mx-12 flex-shrink-0 flex items-center justify-center transition-all duration-500 transform hover:scale-110"
            >
              <div className="relative h-16 w-44 transition-all duration-700 filter grayscale brightness-200 opacity-20 hover:grayscale-0 hover:opacity-100 hover:brightness-100">
                {client.logo ? (
                  <Image
                    src={urlFor(client.logo).width(300).format('webp').url() || ""}
                    alt={client.name || "Logo"}
                    fill
                    className="object-contain"
                    sizes="200px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-black text-white text-2xl tracking-tighter uppercase select-none opacity-20">
                      {client.name}
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
