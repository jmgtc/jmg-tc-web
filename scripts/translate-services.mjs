import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

const translationsSet = {
  "Gestión Informática": {
    title: "IT Management",
    tag: "Services // Infrastructure",
    description: "Robust and always-on infrastructure. We manage your systems so you can focus entirely on your business without technical friction.",
    features: [
      "24/7 Monitoring & Support",
      "Network Infrastructure Security",
      "Cloud Migration & Management",
      "Backup & Recovery Strategies"
    ],
    phases: [
      { label: "Audit", desc: "Assessing your current technical debt and infrastructure health." },
      { label: "Planning", desc: "Designing a scalable roadmap for your growing needs." },
      { label: "Deployment", desc: "Implementing solutions with zero downtime." },
      { label: "Optimization", desc: "Continuously refining performance and security." }
    ],
    priceLabel: "from",
    cta: "Request IT Audit"
  },
  "Desarrollo Web y Apps": {
    title: "Web & App Development",
    tag: "Services // Digital Core",
    description: "Premium digital presence that converts visitors into customers. Modern technologies and conversion-oriented design for a competitive edge.",
    features: [
      "Custom Next.js & React Apps",
      "High-Conversion UI/UX Design",
      "Headless CMS Integration",
      "SEO & Performance Optimization"
    ],
    phases: [
      { label: "Discovery", desc: "Defining your vision and technical requirements." },
      { label: "UI Design", desc: "Creating high-fidelity interactive prototypes." },
      { label: "Engineering", desc: "Building fast, scalable, and secure code." },
      { label: "Continuous Delivery", desc: "Iterative improvements after the official launch." }
    ],
    priceLabel: "from",
    cta: "Start Your Project"
  },
  "ConsultorIA": {
    title: "AI Consulting",
    tag: "Services // Automation",
    description: "Intelligent automation to power a 24/7 operation. We identify repetitive tasks, implement AI agents, and measure real ROI.",
    features: [
      "Custom AI Agents & Workflows",
      "Process Automation (RPA)",
      "LLM & API Integrations",
      "Data-Driven Business Intelligence"
    ],
    phases: [
      { label: "Process Mapping", desc: "Identifying bottlenecks and automation targets." },
      { label: "PoC / Prototyping", desc: "Building a proof of concept for validation." },
      { label: "Native Integration", desc: "Connecting AI with your existing software stack." },
      { label: "Continuous AI Learning", desc: "Refining models based on real-world performance." }
    ],
    priceLabel: "from",
    cta: "Automate My Business"
  }
};

async function translateServices() {
  const services = await client.fetch('*[_type == "serviceItem"]');
  console.log(`Found ${services.length} services to translate.`);

  for (const service of services) {
    const trans = translationsSet[service.title] || translationsSet["ConsultorIA"]; // Fallback if name slightly differs

    const patch = {
      title_en: trans.title,
      tag_en: trans.tag,
      description_en: trans.description,
      features_en: trans.features,
      priceLabel_en: trans.priceLabel,
      cta_en: trans.cta,
    };

    if (service.phases) {
      service.phases.forEach((phase, index) => {
        const pTrans = trans.phases[index];
        if (pTrans) {
          patch[`phases[${index}].label_en`] = pTrans.label;
          patch[`phases[${index}].desc_en`] = pTrans.desc;
        }
      });
    }

    await client.patch(service._id).set(patch).commit();
    console.log(`Translated service: ${service.title}`);
  }
}

translateServices().catch(console.error);
