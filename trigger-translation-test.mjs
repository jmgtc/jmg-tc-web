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
    
    console.log("Enviando a traducir array...");
    
    const response = await fetch('http://localhost:3000/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        documentId: "cwB5C6JY2LVPSJSVcwOTwT",
        title: data.title,
        body: data.body
      })
    });
    
    const result = await response.json();
    console.log("Resultado: Success=", result.success);
    if(result.translatedBody) {
       console.log("Translated Body Length:", result.translatedBody.length, "blocks");
    }
  } catch (e) {
    console.error(e);
  }
}

run();
