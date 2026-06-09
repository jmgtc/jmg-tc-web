import { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/modules/Badge";
import TrustSection from "@/components/sections/TrustSection";

export const metadata: Metadata = {
  title: "Free Technology Diagnosis in Bizkaia | JMG Tech Consulting",
  description: "Request a free technology diagnosis for your business in Getxo or Bizkaia. We analyze your website, manual processes, and AI potential to optimize your company.",
  alternates: {
    canonical: "https://www.jmg-tc.com/en/tech-diagnosis",
    languages: {
      'es': "https://www.jmg-tc.com/diagnostico-tecnologico",
      'en': "https://www.jmg-tc.com/en/tech-diagnosis"
    }
  }
};

export default function TechDiagnosisPage() {
  return (
    <div className="min-h-screen bg-[#060606] pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-gold/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <Badge text="Free Audit" className="mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Technology Diagnosis for <span className="text-gold">Your Business</span>
          </h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
            Do you feel your company wastes time on manual tasks or your website doesn't attract enough clients? We design a technology roadmap for local businesses in Getxo and Bizkaia.
          </p>
        </div>

        <div className="space-y-16">
          <section className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">What do we review in the diagnosis?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-gold font-bold mb-2">Web Presence & Performance</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  We analyze the speed of your current website, its local SEO ranking on Google, and whether its structure is designed to convert visitors into real clients.
                </p>
              </div>
              <div>
                <h3 className="text-gold font-bold mb-2">Manual Processes</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  We identify bottlenecks in your day-to-day: manual data entry, repetitive emails, or workflows that should be <Link href="/en/services/process-automation" className="text-gold hover:underline">automated</Link>.
                </p>
              </div>
              <div>
                <h3 className="text-gold font-bold mb-2">AI Potential</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  We evaluate if your business can benefit from <Link href="/en/services/ai-for-business" className="text-gold hover:underline">artificial intelligence agents</Link> for customer service or data analysis.
                </p>
              </div>
              <div>
                <h3 className="text-gold font-bold mb-2">IT Infrastructure & Security</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  If you use Apple, we review your <Link href="/en/services/mac-support-business" className="text-gold hover:underline">Mac computer fleet</Link>, backups, and security protocols.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Who is this service for?</h2>
            <p className="text-center text-white/60 mb-8 max-w-2xl mx-auto">
              As experts in <Link href="/en/tech-consulting-getxo" className="text-gold hover:underline">local technology consulting</Link>, this diagnosis is exclusively designed for:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="px-6 py-3 rounded-full border border-white/10 text-white/70 font-medium">SMEs and consolidated companies</span>
              <span className="px-6 py-3 rounded-full border border-white/10 text-white/70 font-medium">Businesses with online presence</span>
              <span className="px-6 py-3 rounded-full border border-white/10 text-white/70 font-medium">Startups and scalable projects</span>
              <span className="px-6 py-3 rounded-full border border-white/10 text-white/70 font-medium">Freelancers and professionals</span>
            </div>
          </section>

          <section className="text-center pt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Take the first step towards digitalization</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Fill out our contact form to book a 30-minute meeting, where we will deliver a no-obligation evaluation.
            </p>
            <Link href="/contacto" className="inline-block bg-gold text-black font-bold px-8 py-4 rounded-full hover:bg-white transition-colors">
              Go to contact form
            </Link>
          </section>
        </div>
      </div>
      <TrustSection />
    </div>
  );
}
