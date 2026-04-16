import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/modules/Header";
import AIConcierge from "@/components/modules/AIConcierge";
import { ClerkProvider } from '@clerk/nextjs';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jmg-tc.com"),
  title: "JMG Tech Consulting | Consultoría IT y Desarrollo AI",
  description: "Socio tecnológico especializado en desarrollo web, automatización con IA y consultoría IT.",
};

import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { client, siteSettingsQuery } from "@/lib/sanity";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await client.fetch(siteSettingsQuery);

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <ClerkProvider>
          <LanguageProvider>
            <Header cmsData={settings} />
            {children}
            <AIConcierge />
          </LanguageProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
