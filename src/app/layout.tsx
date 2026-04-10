import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/modules/Header";
import AIConcierge from "@/components/modules/AIConcierge";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JMG Tech Consulting | Consultoría IT y Desarrollo AI",
  description: "Socio tecnológico especializado en desarrollo web, automatización con IA y consultoría IT.",
};

import { LanguageProvider } from "@/components/providers/LanguageProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <LanguageProvider>
          <Header />
          {children}
          <AIConcierge />
        </LanguageProvider>
      </body>
    </html>
  );
}
