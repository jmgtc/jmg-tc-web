import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/modules/Header";
import AIConcierge from "@/components/modules/AIConcierge";
import CookieBanner from "@/components/modules/CookieBanner";
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
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-favicon.png", sizes: "any",  type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon-32.png",
  },
};

import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { client, siteSettingsQuery } from "@/lib/sanity";
import Footer from "@/components/modules/Footer";

export const revalidate = 60;

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
            <main>{children}</main>
            <Footer cmsData={settings} />
            <AIConcierge />
            <CookieBanner />
          </LanguageProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
