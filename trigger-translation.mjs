import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "mfth4gqi",
  dataset: "production",
  useCdn: false,
  apiVersion: "2023-01-01",
});

async function run() {
  try {
    const query = `*[_type == "post" && _id == "cwB5C6JY2LVPSJSVcwOTwT"][0] {
      title,
      body
    }`;
    const data = await client.fetch(query);
    
    const title = data.title;
    const bodyText = data.body?.map((b) => b.children?.map((c) => c.text).join('')).join('\n') || '';

    console.log("Enviando a traducir...");
    
    const response = await fetch('http://localhost:3000/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        documentId: "cwB5C6JY2LVPSJSVcwOTwT",
        title,
        body: bodyText
      })
    });
    
    const result = await response.json();
    console.log("Resultado:", result);
  } catch (e) {
    console.error(e);
  }
}

run();
