import { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/modules/Badge";
import TrustSection from "@/components/sections/TrustSection";

export const metadata: Metadata = {
  title: "Artificial Intelligence for Businesses in Bizkaia | JMG Tech Consulting",
  description: "We implement Artificial Intelligence solutions for businesses in Getxo and Bizkaia. Automate processes, reduce costs, and scale your business with custom AI.",
  alternates: {
    canonical: "https://www.jmg-tc.com/en/services/ai-for-business",
    languages: {
      'es': "https://www.jmg-tc.com/servicios/inteligencia-artificial-empresas",
      'en': "https://www.jmg-tc.com/en/services/ai-for-business"
    }
  }
};

export default function AIForBusinessPage() {
  return (
    <div className="min-h-screen bg-[#060606] pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-gold/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <Badge text="Enterprise Solutions" className="mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            <span className="text-gold">Artificial Intelligence</span> Solutions for Your Company
          </h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
            Transform the way you operate. We develop and integrate AI to automate workflows, improve customer service, and analyze data intelligently for businesses in Bizkaia and nationwide.
          </p>
        </div>

        <div className="space-y-16">
          <section className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-6">Real Benefits of B2B AI</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h3 className="text-gold font-bold mb-2">Cost Reduction</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Automating recurring processes decreases the hours invested in manual tasks, allowing your team to focus on high-value strategic work.
                </p>
              </div>
              <div>
                <h3 className="text-gold font-bold mb-2">24/7 Support</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Implement AI assistants that answer customer queries, capture leads, and schedule meetings uninterruptedly.
                </p>
              </div>
              <div>
                <h3 className="text-gold font-bold mb-2">Data Analysis</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Convert large volumes of data into actionable decisions quickly without relying on long manual analyses.
                </p>
              </div>
              <div>
                <h3 className="text-gold font-bold mb-2">Limitless Scalability</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Your business can process a 10x greater volume of work without proportionally multiplying your personnel costs.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Our Implementation Process</h2>
            <div className="space-y-6">
              <div className="glass p-6 rounded-3xl flex gap-4 items-start border border-white/5">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold flex-shrink-0">1</div>
                <div>
                  <h3 className="text-white font-bold mb-2">Audit and Feasibility</h3>
                  <p className="text-white/60 text-sm">We analyze your current processes to identify bottlenecks where artificial intelligence can have an immediate positive ROI.</p>
                </div>
              </div>
              <div className="glass p-6 rounded-3xl flex gap-4 items-start border border-white/5">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold flex-shrink-0">2</div>
                <div>
                  <h3 className="text-white font-bold mb-2">Development of Agents and Automations</h3>
                  <p className="text-white/60 text-sm">We integrate advanced models (LLMs) with your current tools (<Link href="/en/services/process-automation" className="text-gold hover:underline">process automation</Link>) securely and privately.</p>
                </div>
              </div>
              <div className="glass p-6 rounded-3xl flex gap-4 items-start border border-white/5">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold flex-shrink-0">3</div>
                <div>
                  <h3 className="text-white font-bold mb-2">Deployment and Training</h3>
                  <p className="text-white/60 text-sm">We launch the solution, train your team, and fine-tune the model with real interactions to maximize its effectiveness.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="text-center pt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Ready to integrate AI into your business?</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Discover which of your company's processes can be automated today with Artificial Intelligence.
            </p>
            <Link href="/en/tech-diagnosis" className="inline-block bg-gold text-black font-bold px-8 py-4 rounded-full hover:bg-white transition-colors">
              Schedule AI feasibility diagnosis
            </Link>
          </section>
        </div>
      </div>
      <TrustSection />
    </div>
  );
}
