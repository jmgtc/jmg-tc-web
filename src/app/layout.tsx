import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/modules/Header";
import AIConcierge from "@/components/modules/AIConcierge";
import CookieBanner from "@/components/modules/CookieBanner";
import { ClerkProvider } from "@clerk/nextjs";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { client, siteSettingsQuery } from "@/lib/sanity";
import Footer from "@/components/modules/Footer";

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
  title: {
    default: "JMG Tech Consulting | Sistemas Digitales, IA y Desarrollo Web para Empresas",
    template: "%s | JMG Tech Consulting",
  },
  description:
    "Desarrollamos webs profesionales para captar clientes, automatizaciones con IA para ahorrar tiempo y plataformas digitales a medida. Tu socio tecnológico de alto nivel.",
  keywords: [
    "desarrollo web para empresas",
    "automatización con IA para negocios",
    "sistemas digitales empresariales",
    "consultoría tecnológica",
    "desarrollo Next.js",
    "asistente IA para empresas",
    "plataforma SaaS a medida",
    "JMG Tech Consulting",
  ],
  authors: [{ name: "JMG Tech Consulting", url: "https://jmg-tc.com" }],
  creator: "JMG Tech Consulting",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://jmg-tc.com",
    siteName: "JMG Tech Consulting",
    title: "JMG Tech Consulting | Sistemas Digitales e IA para Empresas",
    description:
      "Desde una web que capta clientes hasta un sistema completo con IA, pagos y dashboard. Tu plataforma tecnológica lista para escalar.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JMG Tech Consulting — Sistemas Digitales e IA para Empresas",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JMG Tech Consulting | Sistemas Digitales e IA para Empresas",
    description:
      "Desde una web que capta clientes hasta un sistema completo con IA, pagos y dashboard.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-favicon.png", sizes: "any", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/favicon-32.png",
  },
};

export const revalidate = 60;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await client.fetch(siteSettingsQuery);

  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
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
