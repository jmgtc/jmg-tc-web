import { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/modules/Badge";
import TrustSection from "@/components/sections/TrustSection";

export const metadata: Metadata = {
  title: "Custom Web Development for Businesses | JMG Tech Consulting",
  description: "Custom web development focused on performance and lead generation. Ultra-fast corporate websites and SaaS platforms with Next.js.",
  alternates: {
    canonical: "https://www.jmg-tc.com/en/services/custom-web-development",
    languages: {
      'es': "https://www.jmg-tc.com/servicios/desarrollo-web-medida",
      'en': "https://www.jmg-tc.com/en/services/custom-web-development"
    }
  }
};

export default function CustomWebDevelopmentPage() {
  return (
    <div className="min-h-screen bg-[#060606] pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-gold/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <Badge text="Web Engineering" className="mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            <span className="text-gold">High-Performance</span> Custom Web Development
          </h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
            We don't do generic templates. We build robust, secure, and scalable digital platforms designed specifically to achieve your business goals.
          </p>
        </div>

        <div className="space-y-16">
          <section className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-6">More than a website: A sales and management system</h2>
            <p className="text-white/60 mb-4 leading-relaxed">
              A serious digital presence requires more than a slow WordPress site. Especially in B2B sectors or corporate commerce, loading time, security, and user experience (UX) determine whether a client trusts you or leaves for the competition.
            </p>
            <p className="text-white/60 leading-relaxed">
              We develop using modern technologies like React, Next.js, and scalable cloud databases. The result is a premium digital product that works perfectly on any device and ranks better on Google.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Our Web Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass p-8 rounded-3xl border border-white/5">
                <h3 className="text-xl font-bold text-white mb-3">Corporate Websites</h3>
                <p className="text-sm text-white/50 mb-4">Fast and SEO-optimized websites designed to capture leads and communicate your brand's value with authority.</p>
                <ul className="text-xs text-white/40 space-y-2">
                  <li>• SEO-friendly architecture</li>
                  <li>• Responsive and modern design</li>
                  <li>• CRM and Analytics integration</li>
                </ul>
              </div>
              <div className="glass p-8 rounded-3xl border border-white/5">
                <h3 className="text-xl font-bold text-white mb-3">SaaS Platforms and Dashboards</h3>
                <p className="text-sm text-white/50 mb-4">Complete systems with user authentication, databases, and management panels to operate your business online.</p>
                <ul className="text-xs text-white/40 space-y-2">
                  <li>• Client portals and private areas</li>
                  <li>• Custom control panels</li>
                  <li>• Secure payment integrations</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="text-center pt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Grow your digital presence</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              If your current website doesn't represent you or you need to develop a complex internal tool, we are here to help.
            </p>
            <Link href="/en/tech-diagnosis" className="inline-block bg-gold text-black font-bold px-8 py-4 rounded-full hover:bg-white transition-colors">
              Quote my web project
            </Link>
          </section>
        </div>
      </div>
      <TrustSection />
    </div>
  );
}
