import { client, landingPageQuery } from "@/lib/sanity";
import NosotrosContent from "./NosotrosContent";

export default async function NosotrosPage() {
  const landingData = await client.fetch(landingPageQuery);

  return <NosotrosContent data={landingData?.about} />;
}
