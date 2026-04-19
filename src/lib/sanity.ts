import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mfth4gqi'

export const client = createClient({
  projectId: projectId,
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-01-01",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Query for shared/global settings
export const siteSettingsQuery = `*[_id in ["siteSettings", "drafts.siteSettings"]] | order(_updatedAt desc)[0]`;

// Improved Landing Page Query
export const landingPageQuery = `
  {
    "landing": *[_type == "landingPage"][0],
    "services": *[_type == "serviceItem"] | order(order asc),
    "clients": *[_type == "client"] | order(order asc),
    "settings": *[_id in ["siteSettings", "drafts.siteSettings"]] | order(_updatedAt desc)[0]
  }
`;

export const servicesPageQuery = `
  {
    "header": *[_type == "servicesPage"][0].header,
    "services": *[_type == "serviceItem"] | order(order asc),
    "settings": *[_id in ["siteSettings", "drafts.siteSettings"]] | order(_updatedAt desc)[0]
  }
`;

export const aboutPageQuery = `
  {
    "about": *[_type == "aboutPage"][0],
    "settings": *[_id in ["siteSettings", "drafts.siteSettings"]] | order(_updatedAt desc)[0]
  }
`;

export const contactPageQuery = `
  {
    "info": *[_type == "contactPage"][0],
    "settings": *[_id in ["siteSettings", "drafts.siteSettings"]] | order(_updatedAt desc)[0]
  }
`;
