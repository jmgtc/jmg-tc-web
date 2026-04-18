import { client, contactPageQuery } from "@/lib/sanity";
import ContactContent from "@/components/sections/ContactContent";
export default async function ContactoPage() {
  const { info, settings } = await client.fetch(contactPageQuery);

  return (
    <div className="container mx-auto px-6 pt-32 pb-24">
      <ContactContent cmsData={info} />
    </div>
  );
}
