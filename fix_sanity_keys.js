const { createClient } = require('@sanity/client');
const crypto = require('crypto');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mfth4gqi',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-01-01',
  token: process.env.SANITY_WRITE_TOKEN
});

const generateKey = () => crypto.randomBytes(6).toString('hex');

async function fixKeys() {
  try {
    const posts = await client.fetch('*[_type == "post"]{ _id, body, body_en }');
    console.log(`Checking ${posts.length} posts for missing keys...`);

    for (const post of posts) {
      let needsUpdate = false;
      const patchedBody = post.body ? post.body.map(block => {
        if (!block._key) { block._key = generateKey(); needsUpdate = true; }
        if (block.children) {
          block.children = block.children.map(child => {
            if (!child._key) { child._key = generateKey(); needsUpdate = true; }
            return child;
          });
        }
        return block;
      }) : null;

      const patchedBodyEn = post.body_en ? post.body_en.map(block => {
        if (!block._key) { block._key = generateKey(); needsUpdate = true; }
        if (block.children) {
          block.children = block.children.map(child => {
            if (!child._key) { child._key = generateKey(); needsUpdate = true; }
            return child;
          });
        }
        return block;
      }) : null;

      if (needsUpdate) {
        console.log(`Fixing keys for: ${post._id}`);
        const updateData = {};
        if (patchedBody) updateData.body = patchedBody;
        if (patchedBodyEn) updateData.body_en = patchedBodyEn;
        
        await client.patch(post._id).set(updateData).commit();
      }
    }
    console.log("All keys have been fixed.");
  } catch (err) {
    console.error("Error fixing keys:", err);
  }
}

fixKeys();
