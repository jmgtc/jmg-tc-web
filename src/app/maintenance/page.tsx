import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Lock, HardHat, Settings, Mail, Send, Phone, User } from 'lucide-react';
import { submitContactForm } from '@/lib/actions';

export default async function MaintenancePage() {
  async function login(formData: FormData) {
    'use server';
    const username = formData.get('username');
    const password = formData.get('password');
    
    const adminUser = process.env.ADMIN_USER || 'jgutierrez';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Pescadit05';

    if (username === adminUser && password === adminPassword) {
      const cookieStore = await cookies();
      cookieStore.set('admin_access', 'true', {
        maxAge: 60 * 60 * 24 * 7, // 1 week
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      });
      redirect('/');
    }
  }

  async function handleContact(formData: FormData) {
    'use server';
    await submitContactForm(formData);
    // In a real app we might redirect to a success state, 
    // but for maintenance we'll just let the action finish.
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-start md:justify-center p-4 pt-32 md:pt-24 relative overflow-hidden font-sans">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold/15 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-gold/5 rounded-full blur-[120px]" />

      <div className="max-w-4xl w-full grid md:grid-cols-2 gap-8 items-stretch relative z-10 mb-12">
        
        {/* Left Side: Info & Admin Access */}
        <div className="glass p-8 rounded-3xl flex flex-col justify-between space-y-8 border-gold/20">
          <div className="space-y-6">
            <div className="p-4 bg-gold/10 rounded-2xl border border-gold/30 w-fit">
              <HardHat className="w-10 h-10 text-gold" />
            </div>
            <div className="space-y-3">
              <h1 className="text-4xl font-bold tracking-tight text-white">Mantenimiento y actualización</h1>
              <p className="text-zinc-400 text-lg leading-relaxed">
                Estamos trabajando en mejoras importantes para JMG-TC. 
                Nuestra plataforma estará disponible muy pronto con nuevas funcionalidades.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent w-full" />
            
            <form action={login} className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold/60 flex items-center gap-2">
                <Lock className="w-3 h-3" /> Acceso Restringido
              </p>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    name="username"
                    placeholder="Usuario"
                    className="w-full bg-white/5 border border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all shadow-inner"
                    required
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="w-full bg-white/5 border border-zinc-800 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-gold/50 transition-all shadow-inner"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-gold text-black font-bold py-2.5 rounded-xl hover:bg-gold-light hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4" /> Validar Credenciales
              </button>
            </form>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="glass p-8 rounded-3xl space-y-6 border-white/5 bg-white/[0.02]">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-gold" /> Formulario de contacto
            </h2>
            <p className="text-sm text-zinc-500">¿Necesitas algo urgente? Déjanos un mensaje:</p>
          </div>

          <form action={handleContact} className="space-y-4">
            <div className="space-y-4">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre completo"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/50 transition-all"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email de contacto"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/50 transition-all"
                required
              />
              <input
                type="tel"
                name="telefono"
                placeholder="Teléfono (opcional)"
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/50 transition-all"
              />
              <textarea
                name="mensaje"
                placeholder="¿En qué podemos ayudarte?"
                rows={3}
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-gold/50 resize-none transition-all"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full border border-gold/50 text-gold font-semibold py-3 rounded-xl hover:bg-gold/10 transition-all flex items-center justify-center gap-3 group"
            >
              Enviar Mensaje <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <div className="flex items-center justify-center gap-6 pt-2">
               <span className="text-[10px] text-zinc-600 flex items-center gap-1">
                 <Phone className="w-2.5 h-2.5" /> +34 639 023 805
               </span>
               <span className="text-[10px] text-zinc-600 flex items-center gap-1">
                 <Mail className="w-2.5 h-2.5" /> info@jmg-tc.com
               </span>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
