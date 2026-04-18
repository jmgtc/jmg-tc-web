import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
  apiVersion: '2023-05-03',
});

const featuredTranslations = [
  {
    id: "wp-2287",
    title_en: "Experience, Evolution, and New Opportunities",
    body_en: [
      {
        _type: "block",
        style: "normal",
        children: [{ _type: "span", text: "I am a software engineer with over 20 years of experience across various areas of the technology sector. Throughout my career, I have supported companies and organizations from different industries and countries in their digital transformation, providing strategic solutions tailored to their real needs." }]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Computing engineering" , marks: ["strong"] },
          { _type: "span", text: " is not just a technical discipline: it is analysis, strategy, innovation, and, above all, " },
          { _type: "span", text: "creativity", marks: ["strong"] },
          { _type: "span", text: ". Creating efficient, secure, and sustainable solutions requires not only knowledge but also the ability to constantly reinvent oneself. In a world where technology evolves at great speed, that skill makes the difference." }
        ]
      },
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Today, more than ever, that evolution has a key name: " },
          { _type: "span", text: "Artificial Intelligence", marks: ["strong"] },
          { _type: "span", text: ". What once seemed like science fiction is now part of our everyday tools. Automation, predictive analysis, virtual assistants... AI is redefining the role of the computer professional and many other disciplines." }
        ]
      }
    ]
  },
  {
    id: "wp-2796",
    title_en: "Microsoft Store Expands Opportunities for Windows App Developers",
    body_en: [
      {
        _type: "block",
        style: "normal",
        children: [
          { _type: "span", text: "Microsoft", marks: ["strong"] },
          { _type: "span", text: " has announced a series of new features for the " },
          { _type: "span", text: "Microsoft Store", marks: ["strong"] },
          { _type: "span", text: " that represent a significant improvement for " },
          { _type: "span", text: "Windows application developers", marks: ["strong"] },
          { _type: "span", text: ". These changes are designed to facilitate distribution, improve app visibility, and ultimately foster business growth within the Windows ecosystem." }
        ]
      }
    ]
  }
];

async function updateFeaturedPosts() {
  for (const post of featuredTranslations) {
    await client.patch(post.id).set({
      title_en: post.title_en,
      body_en: post.body_en
    }).commit();
    console.log(`Updated featured post: ${post.title_en}`);
  }
}

updateFeaturedPosts().catch(console.error);
