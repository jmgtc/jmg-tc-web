import { client, aboutPageQuery } from "@/lib/sanity";
import NosotrosContent from "./NosotrosContent";

export const revalidate = 3600; // cache 1h (contenido estático)

export default async function NosotrosPage() {
  const data = await client.fetch(aboutPageQuery);

  return <NosotrosContent data={data?.about} />;
}
