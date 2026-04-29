import Hero from "@/components/sections/Hero";
import SystemBlocks from "@/components/sections/SystemBlocks";
import Consultorias from "@/components/sections/Consultorias";
import AIConciergeFeature from "@/components/sections/AIConciergeFeature";
import SystemDemo from "@/components/sections/SystemDemo";
import TrustSection from "@/components/sections/TrustSection";
import Podcast from "@/components/sections/Podcast";
import BlogHighlights from "@/components/sections/BlogHighlights";
import Clients from "@/components/sections/Clients";
import CTASection from "@/components/sections/CTASection";
import { client, landingPageQuery } from "@/lib/sanity";

export const revalidate = 60;

export default async function Home() {
  const { landing, services, clients, settings } = await client.fetch(landingPageQuery);

  return (
    <>
      {/* S01 — Hero: titular de conversión + mockup dashboard + 2 CTAs */}
      <Hero data={landing?.hero} />

      {/* S02 — "No es solo una web": arquitectura modular en bloques */}
      <SystemBlocks />

      {/* S03 — Servicios productizados: problema → incluye → resultado → CTA */}
      <Consultorias
        headerData={landing?.services_highlights}
        services={services}
      />

      {/* S04 — AI Concierge como diferenciador: demo visual + copy conversión */}
      <AIConciergeFeature />

      {/* S05 — Demo del sistema: flujo completo cliente en 5 pasos */}
      <SystemDemo />

      {/* S06 — Confianza: por qué JMG TC + proceso 4 pasos */}
      <TrustSection />

      {/* S07 — Podcast */}
      <Podcast data={landing?.podcast_section} />

      {/* S08 — Blog Highlights */}
      <BlogHighlights data={landing?.blog_highlights} />

      {/* S09 — Clientes (marquee) */}
      <Clients
        data={landing?.clients_section}
        clients={clients}
      />

      {/* S10 — CTA Final */}
      <CTASection data={landing?.cta_section} />
    </>
  );
}
