import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "mfth4gqi",
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-01-01",
});

async function run() {
  const query = `*[_type == "post"] | order(publishedAt desc)[0...1] {
    title,
    title_en,
    body,
    body_en
  }`;
  const data = await client.fetch(query);
  console.log(JSON.stringify(data, null, 2));
}

run();
