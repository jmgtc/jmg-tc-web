import { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/modules/Badge";
import TrustSection from "@/components/sections/TrustSection";

export const metadata: Metadata = {
  title: "Mac Support for Businesses and Companies in Bizkaia | Specialized IT",
  description: "Specialized technical support and IT management in Apple ecosystems (Mac, iPad, iPhone) for businesses in Getxo and Bizkaia. MDM, security, networks, and macOS optimization.",
  alternates: {
    canonical: "https://www.jmg-tc.com/en/services/mac-support-business",
    languages: {
      'es': "https://www.jmg-tc.com/servicios/soporte-mac-negocios",
      'en': "https://www.jmg-tc.com/en/services/mac-support-business"
    }
  }
};

export default function MacSupportBusinessPage() {
  return (
    <div className="min-h-screen bg-[#060606] pt-32 pb-24 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-gold/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        <div className="text-center mb-16">
          <Badge text="IT Maintenance" className="mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Specialized <span className="text-gold">Mac</span> Technical Support for Businesses
          </h1>
          <p className="text-lg text-white/60 leading-relaxed max-w-2xl mx-auto">
            Ensure the maximum performance of your Apple fleet. We provide centralized administration, preventive technical support, and secure deployments for businesses in Getxo and throughout Bizkaia operating in the Mac ecosystem.
          </p>
        </div>

        <div className="space-y-16">
          <section className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/5">
            <h2 className="text-2xl font-bold text-white mb-6">Centralized Device Management (MDM)</h2>
            <p className="text-white/60 mb-4 leading-relaxed">
              Modern IT support is not about fixing broken computers one by one. It's about foresight and control. With our MDM (Mobile Device Management) solutions for macOS and iOS, we manage your computer fleet remotely and at scale.
            </p>
            <p className="text-white/60 leading-relaxed">
              We configure new Macs without touching them (Zero-Touch Deployment), enforce corporate security policies, manage updates, and encrypt hard drives imperceptibly to the user.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Our Apple Support Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass p-8 rounded-3xl border border-white/5">
                <h3 className="text-xl font-bold text-white mb-3">macOS Security</h3>
                <p className="text-sm text-white/50 mb-4">Deployment of FileVault, corporate firewall control, next-generation antivirus adapted to Apple Silicon, and conditional access policies.</p>
              </div>
              <div className="glass p-8 rounded-3xl border border-white/5">
                <h3 className="text-xl font-bold text-white mb-3">Comprehensive Technical Support</h3>
                <p className="text-sm text-white/50 mb-4">Fast resolution of software incidents, network configurations, data recovery, and consulting on migrations to new M-series chips.</p>
              </div>
              <div className="glass p-8 rounded-3xl border border-white/5">
                <h3 className="text-xl font-bold text-white mb-3">Networks and Storage</h3>
                <p className="text-sm text-white/50 mb-4">Configuration of NAS (Synology, QNAP) perfectly integrated with Apple's SMB protocol, Time Machine backups, and enterprise permissions management.</p>
              </div>
              <div className="glass p-8 rounded-3xl border border-white/5">
                <h3 className="text-xl font-bold text-white mb-3">Local Consulting</h3>
                <p className="text-sm text-white/50 mb-4">As <Link href="/en/tech-consulting-getxo" className="text-gold hover:underline">local consultants</Link>, we offer direct and strategic relationships to align your Apple technology investment with your company's growth objectives.</p>
              </div>
            </div>
          </section>

          <section className="text-center pt-8">
            <h2 className="text-2xl font-bold text-white mb-6">Professionalize your Apple ecosystem</h2>
            <p className="text-white/60 mb-8 max-w-xl mx-auto">
              Stop dealing with technical problems and ensure the uninterrupted operability of your work team.
            </p>
            <Link href="/en/tech-diagnosis" className="inline-block bg-gold text-black font-bold px-8 py-4 rounded-full hover:bg-white transition-colors">
              Request Apple infrastructure diagnosis
            </Link>
          </section>
        </div>
      </div>
      <TrustSection />
    </div>
  );
}
