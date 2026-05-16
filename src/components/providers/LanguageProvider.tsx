"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import es from "@/dictionaries/es.json";
import en from "@/dictionaries/en.json";

type Language = "es" | "en";
type Dictionary = typeof es;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  dict: Dictionary;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ 
  children, 
  initialLanguage = "es" 
}: { 
  children: ReactNode;
  initialLanguage?: Language;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const router = useRouter();

  // Sync state with cookie on mount (mostly for client-side navigation or hydration check)
  React.useEffect(() => {
    const saved = document.cookie
      .split("; ")
      .find((row) => row.startsWith("NEXT_LOCALE="))
      ?.split("=")[1];
    if (saved && (saved === "en" || saved === "es") && saved !== language) {
      setLanguageState(saved as Language);
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    // Persist in cookie for Server Components (365 days)
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    
    // Force refresh of the current route to update Server Components
    router.refresh();
  };

  const dict = language === "es" ? es : en;

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = dict;
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    return typeof value === 'string' ? value : key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, dict, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
