"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Podcast() {
  const { language } = useLanguage();

  return (
    <section className="bg-black py-24 relative overflow-hidden border-t border-white/5">
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Content side */}
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-white/50">Section_04 // Podcast</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight leading-tight">
              {language === 'es' ? 'Nuestra Visión en' : 'Our Vision in'} <span className="text-gold">Audio</span>
            </h2>
            
            <p className="text-white/70 text-lg leading-relaxed font-light max-w-xl">
              {language === 'es' 
                ? "Este espacio comparte herramientas, ideas y soluciones tecnológicas reales para impulsar negocios y personas. Ideal para quienes buscan adaptarse, innovar y crecer con inteligencia artificial y transformación digital."
                : "This space shares real tools, ideas, and technological solutions to boost businesses and individuals. Ideal for those looking to adapt, innovate, and grow with artificial intelligence and digital transformation."}
            </p>
          </div>

          {/* Player side */}
          <div className="w-full lg:w-[500px]">
            <div className="relative group">
              {/* Decorative Frame */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/30 to-white/5 rounded-[14px] blur-sm opacity-50 group-hover:opacity-100 transition duration-700" />
              
              <div className="relative bg-black rounded-[12px] overflow-hidden shadow-2xl">
                <iframe 
                  style={{ borderRadius: "12px" }} 
                  src="https://open.spotify.com/embed/show/6ZKSjFOyxUXArvpjYXwGl6?utm_source=generator&theme=0" 
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
