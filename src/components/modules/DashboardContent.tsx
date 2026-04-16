"use client";

import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/components/providers/LanguageProvider';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

interface DashboardContentProps {
  user: {
    firstName: string | null;
    email: string;
  };
  userId: string;
  dbUser: any;
}

export default function DashboardContent({ user, userId, dbUser }: DashboardContentProps) {
  const { language } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showNotification, setShowNotification] = useState(true);

  const success = searchParams.get('success');
  const canceled = searchParams.get('canceled');

  const content = language === "es"
    ? {
        welcome: "Bienvenido,",
        default_name: "Cliente",
        subtitle: "Gestiona tus servicios, facturas y proyectos en curso.",
        account_status: "Estado de cuenta",
        premium: "Premium",
        free: "Plan Gratuito",
        hired_services: "Servicios Contratados",
        no_services: "Aún no has contratado ningún servicio técnico.",
        explore: "Explorar Soluciones IT →",
        ia_title: "Consultas IA Disponibles",
        ia_badge: "Soporte Prioritario",
        ia_desc: "Como cliente, tienes acceso total a nuestro asistente inteligente avanzado para resolver dudas técnicas inmediatas.",
        ia_btn: "Abrir Asistente",
        account_info: "Información de Cuenta",
        email_label: "Email Principal",
        client_id: "ID de Cliente",
        edit_profile: "Editar Perfil",
        help_title: "¿Necesitas ayuda técnica?",
        help_desc: "Agenda una videollamada de 15 min con nuestro equipo de soporte.",
        help_btn: "Solicitar Soporte"
      }
    : {
        welcome: "Welcome,",
        default_name: "Client",
        subtitle: "Manage your services, invoices, and ongoing projects.",
        account_status: "Account Status",
        premium: "Premium",
        free: "Free Plan",
        hired_services: "Hired Services",
        no_services: "You haven't hired any technical service yet.",
        explore: "Explore IT Solutions →",
        ia_title: "Available AI Consultations",
        ia_badge: "Priority Support",
        ia_desc: "As a client, you have full access to our advanced intelligent assistant to solve immediate technical doubts.",
        ia_btn: "Open Assistant",
        account_info: "Account Information",
        email_label: "Primary Email",
        client_id: "Client ID",
        edit_profile: "Edit Profile",
        help_title: "Need technical help?",
        help_desc: "Schedule a 15-min video call with our support team.",
        help_btn: "Request Support",
        payment_success: "Payment Successful!",
        payment_success_desc: "Your service has been activated. You can see it in 'Hired Services'.",
        payment_canceled: "Payment Canceled",
        payment_canceled_desc: "The transaction was not completed. If you had any issues, contact us."
      };

  if (language === "es") {
    content.payment_success = "¡Pago Completado!";
    content.payment_success_desc = "Tu servicio ha sido activado. Puedes verlo en 'Servicios Contratados'.";
    content.payment_canceled = "Pago Cancelado";
    content.payment_canceled_desc = "La transacción no se completó. Si tuviste algún problema, contáctanos.";
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Notificaciones de Pago */}
        {showNotification && (success || canceled) && (
          <div className={`mb-8 p-4 rounded-2xl border backdrop-blur-xl flex items-center justify-between animate-in fade-in slide-in-from-top-4 duration-500 ${
            success 
              ? "bg-green-500/10 border-green-500/20 text-green-400" 
              : "bg-red-500/10 border-red-500/20 text-red-400"
          }`}>
            <div className="flex items-center gap-3">
              {success ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <div>
                <p className="text-sm font-bold">{success ? content.payment_success : content.payment_canceled}</p>
                <p className="text-xs opacity-80">{success ? content.payment_success_desc : content.payment_canceled_desc}</p>
              </div>
            </div>
            <button 
              onClick={() => {
                setShowNotification(false);
                router.replace('/dashboard');
              }}
              className="p-1 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Header del Dashboard */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {content.welcome} <span className="text-gold">{user.firstName || content.default_name}</span>
            </h1>
            <p className="text-white/60">{content.subtitle}</p>
          </div>
          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-3xl backdrop-blur-xl">
             <div className="text-right">
                <p className="text-xs text-white/40 uppercase font-bold tracking-widest">{content.account_status}</p>
                <p className="text-sm font-medium">{dbUser?.subscriptions.length ? content.premium : content.free}</p>
             </div>
             <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold border border-gold/30">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21a3.745 3.745 0 0 1-3.296-1.593 3.745 3.745 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.745 3.745 0 0 1 3.296-1.043A3.745 3.745 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.745 3.745 0 0 1 3.296 1.043 3.745 3.745 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
             </div>
          </div>
        </div>

        {/* Grid de Contenido */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Columna Principal: Servicios y Pedidos */}
          <div className="lg:col-span-2 space-y-8">
            <section className="glass rounded-[40px] border border-white/10 p-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-gold"></span>
                {content.hired_services}
              </h2>
              
              {!dbUser?.orders || dbUser.orders.length === 0 ? (
                <div className="py-10 text-center border-2 border-dashed border-white/5 rounded-3xl">
                  <p className="text-white/40 mb-4">{content.no_services}</p>
                  <a href="/servicios" className="text-gold hover:underline text-sm font-bold">{content.explore}</a>
                </div>
              ) : (
                <div className="space-y-4">
                  {dbUser?.orders.map((order: any) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors border border-transparent hover:border-white/10">
                      <div>
                        <p className="font-bold">{order.serviceName}</p>
                        <p className="text-xs text-white/40">{new Date(order.createdAt).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gold">{(order.amount / 100).toFixed(2)} €</p>
                        <p className="text-[10px] uppercase tracking-tighter text-white/30">{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            <section className="glass rounded-[40px] border border-white/10 p-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                {content.ia_title}
              </h2>
              <div className="p-6 bg-gradient-to-br from-gold/10 to-transparent border border-gold/20 rounded-3xl">
                <p className="text-sm text-gold mb-2 font-bold uppercase tracking-widest">{content.ia_badge}</p>
                <p className="text-white/80 mb-4 text-sm">{content.ia_desc}</p>
                <button className="text-xs font-bold bg-gold text-black px-4 py-2 rounded-full">{content.ia_btn}</button>
              </div>
            </section>
          </div>

          {/* Columna Lateral: Info y Acciones */}
          <div className="space-y-8">
             <section className="glass rounded-[40px] border border-white/10 p-8">
                <h3 className="font-bold mb-4">{content.account_info}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-white/40">{content.email_label}</p>
                    <p className="text-sm truncate">{user.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/40">{content.client_id}</p>
                    <p className="text-[10px] font-mono text-white/30 uppercase">{userId.split('_')[1]}</p>
                  </div>
                </div>
                <hr className="my-6 border-white/5" />
                <button className="w-full py-3 rounded-full border border-white/10 text-sm hover:bg-white/5 transition-all">
                  {content.edit_profile}
                </button>
             </section>

             <section className="bg-white text-black rounded-[40px] p-8 shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="font-bold mb-2">{content.help_title}</h3>
                  <p className="text-xs text-black/60 mb-6">{content.help_desc}</p>
                  <button className="w-full bg-black text-white py-3 rounded-full text-sm font-bold group-hover:scale-105 transition-transform">
                    {content.help_btn}
                  </button>
                </div>
                {/* Decoración premium */}
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gold/20 rounded-full blur-3xl group-hover:bg-gold/40 transition-all"></div>
             </section>
          </div>

        </div>
      </div>
    </div>
  );
}
