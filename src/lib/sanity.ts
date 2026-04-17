import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mfth4gqi'

export const client = createClient({
  projectId: projectId,
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-01-01",
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Query for shared/global settings
export const siteSettingsQuery = `*[_type == "siteSettings"][0]`;

// Improved Landing Page Query (Includes AI, Values, CTA, and references to Services)
export const landingPageQuery = `
  {
    "landing": *[_type == "landingPage"][0],
    "services": *[_type == "serviceItem"] | order(order asc),
    "settings": *[_type == "siteSettings"][0]
  }
`;

export const servicesPageQuery = `
  {
    "header": *[_type == "servicesPage"][0],
    "services": *[_type == "serviceItem"] | order(order asc),
    "settings": *[_type == "siteSettings"][0]
  }
`;

export const contactPageQuery = `
  {
    "info": *[_type == "contactPage"][0],
    "settings": *[_type == "siteSettings"][0]
  }
`;
