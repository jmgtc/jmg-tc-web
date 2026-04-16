import { client, contactPageQuery } from "@/lib/sanity";
import ContactContent from "@/components/sections/ContactContent";
import Footer from "@/components/modules/Footer";

export default async function ContactoPage() {
  const { info, settings } = await client.fetch(contactPageQuery);

  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6">
        <ContactContent cmsData={info} />
      </div>
      <Footer cmsData={settings} />
    </main>
  );
}
