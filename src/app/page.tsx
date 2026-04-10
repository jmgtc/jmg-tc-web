import Hero from "@/components/sections/Hero";
import Consultorias from "@/components/sections/Consultorias";
import ConsultorIA from "@/components/sections/ConsultorIA";
import BlogHighlights from "@/components/sections/BlogHighlights";
import Footer from "@/components/modules/Footer";

export default function Home() {
  return (
    <main>
      {/* SECCIÓN 01 — Hero */}
      <Hero />
      {/* SECCIÓN 02 — Consultoría IT + Web */}
      <Consultorias />
      {/* SECCIÓN 03 — ConsultorIA (Automatización IA) */}
      <ConsultorIA />
      {/* SECCIÓN 04 — Blog Highlights */}
      <BlogHighlights />
      {/* MÓDULO — Footer */}
      <Footer />
    </main>
  );
}
