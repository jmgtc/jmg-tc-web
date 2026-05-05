import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "mfth4gqi",
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-01-01",
});

async function run() {
  const query = `*[_id == "drafts.cwB5C6JY2LVPSJSVcwOTwT"][0] {
    title,
    title_en,
    body,
    body_en
  }`;
  const data = await client.fetch(query);
  console.log(JSON.stringify(data, null, 2));
}

run();
