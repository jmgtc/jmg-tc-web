import Hero from "@/components/sections/Hero";
import Consultorias from "@/components/sections/Consultorias";
import ConsultorIA from "@/components/sections/ConsultorIA";
import BlogHighlights from "@/components/sections/BlogHighlights";
import Footer from "@/components/modules/Footer";
import { client, landingPageQuery } from "@/lib/sanity";

export const revalidate = 60;

export default async function Home() {
  const { landing, services, settings } = await client.fetch(landingPageQuery);

  return (
    <main>
      {/* SECCIÓN 01 — Hero */}
      <Hero data={landing?.hero} />
      
      {/* SECCIÓN 02 — Consultoría IT + Web */}
      <Consultorias 
        headerData={landing?.services_highlights} 
        services={services} 
      />
      
      {/* SECCIÓN 03 — ConsultorIA (Automatización IA) */}
      <ConsultorIA data={landing?.consultoria_ia} />
      
      {/* SECCIÓN 04 — Blog Highlights */}
      <BlogHighlights data={landing?.blog_highlights} />
      
      {/* MÓDULO — Footer */}
      <Footer cmsData={settings} />
    </main>
  );
}
