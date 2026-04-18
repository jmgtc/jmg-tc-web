import { client, aboutPageQuery } from "@/lib/sanity";
import NosotrosContent from "./NosotrosContent";

export const revalidate = 0;

export default async function NosotrosPage() {
  const data = await client.fetch(aboutPageQuery);

  return <NosotrosContent data={data?.about} />;
}
