"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import Badge from "@/components/modules/Badge";

interface PodcastProps {
  data?: any;
}

export default function Podcast({ data }: PodcastProps) {
  const { language } = useLanguage();

  const content = {
    badge: (language === "en" ? data?.badge_en : data?.badge) || "",
    tag: (language === 'en' ? data?.tag_en : data?.tag) || "Section_04 // Podcast",
    title: (language === 'en' ? data?.title_en : data?.title) || (language === "es" ? "Nuestra Visión en" : "Our Vision in"),
    title_accent: (language === "es" ? "Audio" : "Audio"),
    desc: (language === 'en' ? data?.description_en : data?.description) || (language === "es" 
      ? "Este espacio comparte herramientas, ideas y soluciones tecnológicas reales para impulsar negocios y personas. Ideal para quienes buscan adaptarse, innovar y crecer con inteligencia artificial y transformación digital."
      : "This space shares real tools, ideas, and technological solutions to boost businesses and individuals. Ideal for those looking to adapt, innovate, and grow with artificial intelligence and digital transformation."),
    spotify_url: data?.spotify_url || "https://open.spotify.com/embed/show/6ZKSjFOyxUXArvpjYXwGl6?utm_source=generator&theme=0"
  };

  return (
    <section className="bg-black py-24 relative overflow-hidden border-t border-white/5">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center lg:text-left">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Content side */}
          <div className="flex-1 flex flex-col items-center lg:items-start">
            <Badge text={content.badge} className="mb-6" />
            
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.5em] block mb-4">
              {content.tag}
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              {content.title} <span className="text-gold">{content.title_accent}</span>
            </h2>
            
            <p className="text-white/70 text-lg leading-relaxed font-light max-w-xl mx-auto lg:mx-0">
              {content.desc}
            </p>
          </div>

          {/* Player side */}
          <div className="w-full lg:w-[500px]">
            <div className="relative group">
              {/* Decorative Frame */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/30 to-white/5 rounded-[14px] blur-sm opacity-50 group-hover:opacity-100 transition duration-700" />
              
              <div className="relative bg-brand-black rounded-[12px] overflow-hidden shadow-2xl">
                <iframe 
                  style={{ borderRadius: "12px" }} 
                  src={content.spotify_url}
                  width="100%" 
                  height="152" 
                  frameBorder="0" 
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                  loading="lazy"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
