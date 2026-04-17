import { client, servicesPageQuery } from "@/lib/sanity";
import ServiciosContent from "./ServiciosContent";

export const revalidate = 60;

export default async function ServiciosPage() {
  const { header, services, settings } = await client.fetch(servicesPageQuery);

  return (
    <ServiciosContent 
      header={header} 
      services={services} 
      settings={settings} 
    />
  );
}
