"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import Link from "next/link";

export default function AIConciergeFeature() {
  const { language } = useLanguage();

  const bubbles = [
    {
      role: "user",
      textEs: "Hola, necesito mejorar mis ventas online",
      textEn: "Hi, I need to improve my online sales",
    },
    {
      role: "ai",
      textEs: "Entendido. ¿Tu mayor reto es captar nuevos clientes o convertir los que ya visitan tu web?",
      textEn: "Got it. Is your biggest challenge attracting new clients or converting those already visiting your website?",
    },
    {
      role: "user",
      textEs: "Convertir los que ya entran a la web",
      textEn: "Converting the ones already on the website",
    },
    {
      role: "ai",
      textEs: "Perfecto. Podemos implementar un asistente como yo que cualifique leads en tiempo real y los guíe a contratar. ¿Te interesa verlo en acción?",
      textEn: "Perfect. We can implement an assistant like me that qualifies leads in real time and guides them to purchase. Want to see it in action?",
    },
  ];

  const stats = [
    { valueEs: "24/7", labelEs: "Disponibilidad", labelEn: "Availability" },
    { valueEs: "< 1s", labelEs: "Tiempo de respuesta", labelEn: "Response time" },
    { valueEs: "↑ 3x", labelEs: "Captación de leads", labelEn: "Lead capture" },
  ];

  return (
    <section className="py-28 bg-black relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {/* Ambient */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Chat Demo */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Glow */}
              <div className="absolute -inset-4 bg-gold/8 blur-[50px] rounded-[2rem]" />
              <div className="relative glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                {/* Chat header */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10 bg-white/5">
                  <div className="w-8 h-8 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gold">
                      <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .721.544l.813 2.846a3.75 3.75 0 0 0 2.576 2.576l2.846.813a.75.75 0 0 1 0 1.442l-2.846.813a3.75 3.75 0 0 0-2.576 2.576l-.813 2.846a.75.75 0 0 1-1.442 0l-.813-2.846a3.75 3.75 0 0 0-2.576-2.576l-2.846-.813a.75.75 0 0 1 0-1.442l2.846-.813A3.75 3.75 0 0 0 7.466 7.89l.813-2.846A.75.75 0 0 1 9 4.5Z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold leading-none">JMG Asistente IA</p>
                    <p className="text-green-400 text-[10px] font-mono mt-0.5">● {language === "es" ? "En línea" : "Online"}</p>
                  </div>
                  <div className="ml-auto text-[9px] font-mono text-white/20 uppercase tracking-widest">
                    Powered by Gemini
                  </div>
                </div>

                {/* Messages */}
                <div className="px-5 py-5 space-y-3 bg-[#080808]">
                  {bubbles.map((b, i) => (
                    <div
                      key={i}
                      className={`flex ${b.role === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
                      style={{ animationDelay: `${i * 0.3}s` }}
                    >
                      <div
                        className={`max-w-[82%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                          b.role === "user"
                            ? "bg-gold text-black font-medium rounded-br-sm"
                            : "bg-white/10 text-white/90 rounded-bl-sm"
                        }`}
                      >
                        {language === "es" ? b.textEs : b.textEn}
                      </div>
                    </div>
                  ))}

                  {/* Typing indicator */}
                  <div className="flex justify-start">
                    <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                      <span className="w-1.5 h-1.5 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-gold/60 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>

                {/* Input mockup */}
                <div className="px-5 pb-5 pt-3 border-t border-white/10 bg-[#080808]">
                  <div className="flex items-center gap-2 bg-white/5 rounded-xl px-4 py-2.5 border border-white/10">
                    <span className="flex-1 text-white/20 text-sm">
                      {language === "es" ? "Prueba el asistente ahora →" : "Try the assistant now →"}
                    </span>
                    <div className="w-7 h-7 bg-gold rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-black">
                        <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-3 -right-3 glass rounded-full px-3 py-1.5 border border-gold/40 shadow-lg">
                <span className="text-[10px] font-mono text-gold">✦ Activo en tu web</span>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-6 mt-8 pt-6 border-t border-white/10">
              {stats.map((s, i) => (
                <div key={i} className="text-center">
                  <p className="text-xl font-bold text-gold">{s.valueEs}</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">
                    {language === "es" ? s.labelEs : s.labelEn}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Copy */}
          <div className="order-1 lg:order-2">
            <span className="text-[10px] font-mono text-gold/60 uppercase tracking-[0.5em] block mb-4">
              Section_04 // AI Concierge
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              {language === "es" ? (
                <>Tu web con un asistente inteligente <span className="text-gold">que vende por ti</span></>
              ) : (
                <>Your website with an intelligent assistant <span className="text-gold">that sells for you</span></>
              )}
            </h2>
            <p className="text-white/60 text-lg mb-8 leading-relaxed">
              {language === "es"
                ? "Instalamos un asistente de IA real (no un chatbot de guion) en tu web. Entiende a tus clientes, responde sus dudas, los cualifica como leads y los guía a contratar."
                : "We install a real AI assistant (not a scripted chatbot) on your website. It understands your clients, answers their questions, qualifies them as leads and guides them to purchase."}
            </p>

            {/* Feature list */}
            <ul className="space-y-4 mb-10">
              {[
                {
                  iconPath: "M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
                  titleEs: "Disponible 24/7",
                  titleEn: "Available 24/7",
                  descEs: "Responde a cualquier hora, nunca pierdas un lead por horario.",
                  descEn: "Responds at any time, never lose a lead due to business hours.",
                },
                {
                  iconPath: "M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155",
                  titleEs: "Capta y cualifica leads",
                  titleEn: "Captures and qualifies leads",
                  descEs: "Pregunta, filtra y guarda la información clave de cada interacción.",
                  descEn: "Asks, filters and saves key information from each interaction.",
                },
                {
                  iconPath: "M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z",
                  titleEs: "IA real, no guiones",
                  titleEn: "Real AI, not scripts",
                  descEs: "Powered by Google Gemini. Conversaciones naturales, no menús rígidos.",
                  descEn: "Powered by Google Gemini. Natural conversations, not rigid menus.",
                },
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gold">
                      <path strokeLinecap="round" strokeLinejoin="round" d={f.iconPath} />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1">{language === "es" ? f.titleEs : f.titleEn}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{language === "es" ? f.descEs : f.descEn}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contacto"
                className="px-6 py-3 bg-gold text-black font-bold rounded-full text-sm hover:bg-white transition-all hover:scale-105 shadow-[0_0_20px_rgba(242,204,82,0.25)] text-center"
              >
                {language === "es" ? "Quiero esto en mi web" : "I want this on my website"}
              </Link>
              <button
                onClick={() => {
                  const btn = document.querySelector('[aria-label="Abrir asistente de IA"]') as HTMLButtonElement;
                  btn?.click();
                }}
                className="px-6 py-3 glass border border-gold/30 text-gold font-semibold rounded-full text-sm hover:bg-gold/10 transition-all text-center"
              >
                {language === "es" ? "Probar el asistente ahora →" : "Try the assistant now →"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
