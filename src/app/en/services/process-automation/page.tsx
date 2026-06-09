import { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/modules/Badge";
import TrustSection from "@/components/sections/TrustSection";

export const metadata: Metadata = {
  title: "Business Process Automation | JMG Tech Consulting",
  description: "Save hundreds of hours a month with our process automation. We connect your tools so your company runs on autopilot.",
  alternates: {
    canonical: "https://www.jmg-tc.com/en/services/process-automation",
    languages: {
      'es': "https://www.jmg-tc.com/servicios/automatizacion-procesos",
      'en': "https://www.jmg-tc.com/en/services/process-automation"
    }
  }
};

export default function ProcessAutomationPage() {
  return (
    <div className="min-h-screen bg-[#060606] pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-gold/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <Badge text="Operational Efficiency" className="mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Business Process <span className="text-gold">Automation</span>
          </h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
            Eliminate repetitive manual work. We connect your platforms so information flows without human intervention, reducing errors and operational costs.
          </p>
        </div>

        <div className="space-y-16">
          <section className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-6">Tasks you should be automating</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-gold font-bold mb-2">Sales and Onboarding</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Automatic email sending after registration, client creation in the CRM, contract signing, and invoice generation without touching a single button.
                </p>
              </div>
              <div>
                <h3 className="text-gold font-bold mb-2">Lead Management</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Automated prospect qualification and direct alerts to the sales team via Slack or WhatsApp.
                </p>
              </div>
              <div>
                <h3 className="text-gold font-bold mb-2">Data Synchronization</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  If you are moving data from an Excel to a web tool, you are losing money. We make your systems talk to each other through API integrations.
                </p>
              </div>
              <div>
                <h3 className="text-gold font-bold mb-2">Reporting and Analytics</h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  Collection of weekly KPIs and generation of automated dashboards for management.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Tools We Connect</h2>
            <p className="text-center text-white/60 mb-8 max-w-2xl mx-auto">
              We use platforms like Make (Integromat), Zapier, and custom development in <Link href="/en/services/custom-web-development" className="text-gold hover:underline">Next.js and Node</Link> to integrate your entire software ecosystem.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['HubSpot', 'Salesforce', 'Stripe', 'Holded', 'Slack', 'WhatsApp API', 'Notion', 'Airtable', 'Google Workspace'].map((tool) => (
                <span key={tool} className="px-4 py-2 rounded-full border border-white/10 text-white/50 text-sm">
                  {tool}
                </span>
              ))}
            </div>
          </section>

          <section className="text-center pt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Reclaim your team's time</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Automation is the key to scaling without inflating your cost structure. We analyze your operations and propose an efficiency plan.
            </p>
            <Link href="/en/tech-diagnosis" className="inline-block bg-gold text-black font-bold px-8 py-4 rounded-full hover:bg-white transition-colors">
              Request automation diagnosis
            </Link>
          </section>
        </div>
      </div>
      <TrustSection />
    </div>
  );
}
