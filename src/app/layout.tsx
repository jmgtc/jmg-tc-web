import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/modules/Header";
import AIConcierge from "@/components/modules/AIConcierge";
import CookieBanner from "@/components/modules/CookieBanner";
import { ClerkProvider } from "@clerk/nextjs";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { client, siteSettingsQuery } from "@/lib/sanity";
import { cookies } from "next/headers";
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

export const revalidate = 3600; // siteSettings: cache 1h (raramente cambia)

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await client.fetch(siteSettingsQuery);
  const cookieStore = await cookies();
  const initialLanguage = (cookieStore.get("NEXT_LOCALE")?.value || "es") as "es" | "en";

  return (
    <html lang={initialLanguage} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "JMG Tech Consulting",
              "image": "https://jmg-tc.com/og-image.png",
              "url": "https://jmg-tc.com",
              "telephone": "+34639023805",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Getxo",
                "addressRegion": "Bizkaia",
                "addressCountry": "ES"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 43.3444,
                "longitude": -3.0031
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
              },
              "priceRange": "$$$"
            })
          }}
        />
        <ClerkProvider>
          <LanguageProvider initialLanguage={initialLanguage}>
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
