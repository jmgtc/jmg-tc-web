"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log sanitizado — sin exponer traza al usuario
    console.error("[blog] Error boundary activated:", error.digest ?? "unknown");
  }, [error]);

  return (
    <main className="min-h-screen bg-black text-white pt-40 pb-24 flex items-center justify-center">
      <div className="flex flex-col items-center gap-8 text-center max-w-md px-6">
        <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="stroke-white/30">
            <path
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold tracking-tight">
            No hemos podido cargar las noticias
          </h2>
          <p className="text-white/50 text-sm font-light leading-relaxed">
            Estamos trabajando para resolverlo. Por favor, inténtalo de nuevo en
            unos momentos.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={reset}
            className="px-6 py-3 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs uppercase tracking-widest hover:bg-gold hover:text-black transition-all"
          >
            Reintentar
          </button>
          <Link
            href="/"
            className="px-6 py-3 rounded-full border border-white/10 text-white/60 text-xs uppercase tracking-widest hover:border-white/30 transition-all"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
