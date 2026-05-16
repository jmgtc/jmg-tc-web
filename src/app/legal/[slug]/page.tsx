import { client } from "@/lib/sanity";
import { notFound } from "next/navigation";
import LegalContent from "./LegalContent";

interface LegalPageProps {
  params: {
    slug: string;
  };
}

export const revalidate = 3600; // cache 1h (textos legales, raramente cambian)

export default async function LegalPage({ params }: LegalPageProps) {
  const { slug } = params;

  const query = `
    {
      "page": *[_type == "legalPage" && slug.current == $slug][0],
      "settings": *[_type == "siteSettings"][0]
    }
  `;

  const { page, settings } = await client.fetch(query, { slug });

  if (!page) {
    notFound();
  }

  return <LegalContent page={page} settings={settings} />;
}
