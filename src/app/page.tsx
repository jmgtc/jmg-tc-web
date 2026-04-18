import Hero from "@/components/sections/Hero";
import Consultorias from "@/components/sections/Consultorias";
import ConsultorIA from "@/components/sections/ConsultorIA";
import Podcast from "@/components/sections/Podcast";
import BlogHighlights from "@/components/sections/BlogHighlights";
import Clients from "@/components/sections/Clients";
import CTASection from "@/components/sections/CTASection";
import { client, landingPageQuery } from "@/lib/sanity";

export const revalidate = 0;

export default async function Home() {
  const { landing, services, clients, settings } = await client.fetch(landingPageQuery);

  return (
    <>
      {/* SECCIÓN 01 — Hero */}
      <Hero data={landing?.hero} />
      
      {/* SECCIÓN 02 — Consultoría IT + Web */}
      <Consultorias 
        headerData={landing?.services_highlights} 
        services={services} 
      />
      
      {/* SECCIÓN 03 — ConsultorIA (Automatización IA) */}
      <ConsultorIA data={landing?.consultoria_ia} />
      
      {/* SECCIÓN 04 — Podcast */}
      <Podcast data={landing?.podcast_section} />
      
      {/* SECCIÓN 05 — Blog Highlights */}
      <BlogHighlights data={landing?.blog_highlights} />

      {/* SECCIÓN 06 — Clientes */}
      <Clients 
        data={landing?.clients_section} 
        clients={clients} 
      />

      {/* SECCIÓN 07 — CTA Final */}
      <CTASection data={landing?.cta_section} />
    </>
  );
}
