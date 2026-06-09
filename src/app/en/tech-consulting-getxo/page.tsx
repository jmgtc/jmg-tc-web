import { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/modules/Badge";
import TrustSection from "@/components/sections/TrustSection";

export const metadata: Metadata = {
  title: "Technology Consulting in Getxo | JMG Tech Consulting",
  description: "Technology consulting services in Getxo. Digital transformation, custom web development, AI, and IT support for local businesses and SMEs in Bizkaia.",
  alternates: {
    canonical: "https://www.jmg-tc.com/en/tech-consulting-getxo",
    languages: {
      'es': "https://www.jmg-tc.com/consultoria-tecnologica-getxo",
      'en': "https://www.jmg-tc.com/en/tech-consulting-getxo"
    }
  }
};

export default function TechConsultingGetxoPage() {
  return (
    <div className="min-h-screen bg-[#060606] pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-gold/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <Badge text="Local Consulting" className="mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Technology and Digital Consulting in <span className="text-gold">Getxo</span>
          </h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
            We help SMEs, freelancers, and local businesses in Getxo and Bizkaia take the digital leap with custom web development, artificial intelligence, and process automation solutions.
          </p>
        </div>

        <div className="space-y-16">
          <section className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-6">Why choose a local technology partner?</h2>
            <p className="text-white/60 mb-4 leading-relaxed">
              Working with a technology consultancy in Getxo allows for direct, close, and personalized communication. We understand the local business fabric and adapt technology to the reality of your business, regardless of its size.
            </p>
            <p className="text-white/60 leading-relaxed">
              From basic digitalization to the implementation of complex artificial intelligence systems, we act as your outsourced IT department.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Our IT Services for Businesses in Bizkaia</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link href="/en/services/custom-web-development" className="block glass p-8 rounded-3xl border border-white/5 hover:border-gold/30 transition-colors">
                <h3 className="text-xl font-bold text-white mb-3">Professional Web Development</h3>
                <p className="text-sm text-white/50">Fast, local SEO-optimized websites designed to attract clients in Bizkaia.</p>
              </Link>
              <Link href="/en/services/ai-for-business" className="block glass p-8 rounded-3xl border border-white/5 hover:border-gold/30 transition-colors">
                <h3 className="text-xl font-bold text-white mb-3">Artificial Intelligence</h3>
                <p className="text-sm text-white/50">Virtual assistants and data analysis to make your company more competitive.</p>
              </Link>
              <Link href="/en/services/process-automation" className="block glass p-8 rounded-3xl border border-white/5 hover:border-gold/30 transition-colors">
                <h3 className="text-xl font-bold text-white mb-3">Process Automation</h3>
                <p className="text-sm text-white/50">Eliminate manual and repetitive tasks, saving time and money every month.</p>
              </Link>
              <Link href="/en/services/mac-support-business" className="block glass p-8 rounded-3xl border border-white/5 hover:border-gold/30 transition-colors">
                <h3 className="text-xl font-bold text-white mb-3">Mac Support for Business</h3>
                <p className="text-sm text-white/50">Apple fleet management and specialized technical assistance for corporate environments.</p>
              </Link>
            </div>
          </section>

          <section className="text-center pt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Shall we discuss your business?</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Request a free audit and discover how the right technology can boost your business in Getxo to the next level.
            </p>
            <Link href="/en/tech-diagnosis" className="inline-block bg-gold text-black font-bold px-8 py-4 rounded-full hover:bg-white transition-colors">
              Request free diagnosis
            </Link>
          </section>
        </div>
      </div>
      <TrustSection />
    </div>
  );
}
