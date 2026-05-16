import type { MetadataRoute } from "next";
import { client } from "@/lib/sanity";

const BASE_URL = "https://www.jmg-tc.com";

// Rutas estáticas (siempre presentes aunque Sanity falle)
const staticRoutes: MetadataRoute.Sitemap = [
  { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
  { url: `${BASE_URL}/servicios`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE_URL}/contacto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
  { url: `${BASE_URL}/nosotros`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  { url: `${BASE_URL}/legal/privacidad`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  { url: `${BASE_URL}/legal/cookies`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  { url: `${BASE_URL}/legal/aviso-legal`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let postEntries: MetadataRoute.Sitemap = [];

  try {
    const posts: { slug: string; publishedAt: string }[] = await client.fetch(
      `*[_type == "post"] | order(publishedAt desc) { "slug": slug.current, publishedAt }`
    );

    postEntries = posts.map((p) => ({
      url: `${BASE_URL}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch (err) {
    // Si Sanity falla, el sitemap responde igualmente con las rutas estáticas
    console.error("[sitemap] Error fetching posts from Sanity:", err);
  }

  return [...staticRoutes, ...postEntries];
}
