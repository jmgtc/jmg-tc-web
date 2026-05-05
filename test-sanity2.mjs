import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "mfth4gqi",
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-01-01",
});

async function run() {
  const query = `*[_type == "post"] | order(publishedAt desc)[0...1] {
    _id,
    title
  }`;
  const data = await client.fetch(query);
  console.log(data[0]._id);
}

run();
