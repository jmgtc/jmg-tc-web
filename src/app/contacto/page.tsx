"use client";

import { useState } from "react";
import { submitContactForm } from "@/lib/actions";

const servicios = [
  "Gestión Informática",
  "Desarrollo Web",
  "ConsultorIA / Automatización",
  "Otro",
];

export default function ContactoPage() {
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCargando(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);
    
    if (result.success) {
      setEnviado(true);
    }
    setCargando(false);
  };

  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">

          {/* Left — Info */}
          <div>
            <span className="text-[10px] font-mono text-brand-gray-body/50 uppercase tracking-[0.4em] block mb-3">
              Page_Contacto // Conecta
            </span>
            <h1 className="text-5xl font-bold text-brand-gray-title mb-6">
              Trabajemos<br /><span className="text-gold">juntos</span>
            </h1>
            <p className="text-brand-gray-body text-lg leading-relaxed mb-10">
              Si tienes un proyecto, una idea o simplemente quieres explorar cómo la tecnología puede transformar tu negocio, cuéntanos.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-black/5">
                <span className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold">📧</span>
                <div>
                  <p className="text-xs text-brand-gray-body/60 uppercase tracking-wider">Email</p>
                  <p className="font-bold text-brand-gray-title text-sm">info@jmg-tc.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-black/5">
                <span className="w-10 h-10 bg-gold/10 rounded-full flex items-center justify-center text-gold">📅</span>
                <div>
                  <p className="text-xs text-brand-gray-body/60 uppercase tracking-wider">Reservar cita</p>
                  <a href="https://jmg-tc.com/reservar" target="_blank" rel="noopener noreferrer" className="font-bold text-gold text-sm hover:underline">Agendar una sesión →</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-white rounded-3xl p-8 border border-black/5 shadow-sm">
            <span className="text-[10px] font-mono text-brand-gray-body/50 uppercase tracking-[0.4em] block mb-6">
              Module_Contacto // Formulario
            </span>

            {enviado ? (
              <div className="text-center py-12">
                <span className="text-4xl block mb-4">✅</span>
                <h2 className="text-2xl font-bold text-brand-gray-title mb-2">¡Mensaje enviado!</h2>
                <p className="text-brand-gray-body text-sm">Nos pondremos en contacto contigo en las próximas 24h.</p>
                <button 
                  onClick={() => setEnviado(false)}
                  className="mt-6 text-gold text-xs font-bold uppercase tracking-widest hover:underline"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-brand-gray-body block mb-1">Nombre</label>
                    <input
                      required name="nombre" type="text" placeholder="Tu nombre"
                      className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-gold transition-colors bg-white text-black"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-brand-gray-body block mb-1">Email</label>
                    <input
                      required name="email" type="email" placeholder="tu@email.com"
                      className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-gold transition-colors bg-white text-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-brand-gray-body block mb-1">Teléfono (opcional)</label>
                  <input
                    name="telefono" type="tel" placeholder="+34 600 000 000"
                    className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-gold transition-colors bg-white text-black"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-brand-gray-body block mb-1">Servicio de interés</label>
                  <select
                    name="servicio"
                    className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-gold transition-colors bg-white text-black"
                  >
                    <option value="">Selecciona un servicio</option>
                    {servicios.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-brand-gray-body block mb-1">Mensaje</label>
                  <textarea
                    required name="mensaje" rows={4} placeholder="Cuéntanos tu proyecto..."
                    className="w-full px-4 py-3 rounded-xl border border-black/10 text-sm focus:outline-none focus:border-gold transition-colors resize-none bg-white text-black"
                  />
                </div>

                <button
                  type="submit"
                  disabled={cargando}
                  className="w-full py-4 bg-gold text-black font-bold rounded-xl hover:bg-brand-black hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {cargando ? "Enviando..." : "Enviar mensaje"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
