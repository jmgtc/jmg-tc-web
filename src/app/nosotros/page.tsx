import { client, landingPageQuery } from "@/lib/sanity";
import NosotrosContent from "./NosotrosContent";

export const revalidate = 60;

export default async function NosotrosPage() {
  const landingData = await client.fetch(landingPageQuery);

  return <NosotrosContent data={landingData?.about} />;
}
