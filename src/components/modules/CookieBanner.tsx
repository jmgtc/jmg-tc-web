"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/components/providers/LanguageProvider';

export default function CookieBanner() {
  const { language } = useLanguage();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setShow(false);
  };

  if (!show) return null;

  const content = {
    title: language === 'es' ? 'Control de Cookies' : 'Cookie Control',
    text: language === 'es' 
      ? 'Utilizamos cookies propias y de terceros para mejorar tu experiencia y analizar el tráfico. Al continuar navegando, aceptas nuestra política de cookies.' 
      : 'We use our own and third-party cookies to improve your experience and analyze traffic. By continuing to browse, you accept our cookie policy.',
    accept: language === 'es' ? 'Aceptar' : 'Accept',
    legal: language === 'es' ? 'Saber más' : 'Read more',
  };

  return (
    <div className="fixed bottom-6 left-6 right-6 z-[200] md:max-w-md">
      <div className="glass bg-black/80 backdrop-blur-xl border border-white/10 p-6 rounded-[2.5rem] shadow-2xl">
        <h4 className="text-white font-bold mb-2 flex items-center gap-2">
          <span className="w-2 h-2 bg-gold rounded-full" />
          {content.title}
        </h4>
        <p className="text-white/60 text-xs leading-relaxed mb-6">
          {content.text}
        </p>
        <div className="flex items-center gap-4">
          <button 
            onClick={accept}
            className="flex-1 bg-gold text-black font-bold py-3 rounded-full text-xs hover:bg-white transition-all transform hover:scale-105"
          >
            {content.accept}
          </button>
          <Link 
            href="/legal/cookies" 
            className="flex-1 text-center text-white/40 hover:text-white transition-colors text-xs font-medium"
          >
            {content.legal}
          </Link>
        </div>
      </div>
    </div>
  );
}
