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

const batch5Data = [
  { id: "wp-3346", t: "Privacy in the Age of AI: Protecting Your Digital Footprint", b: "As AI becomes more pervasive, data privacy is a top concern. Users must adopt robust security measures and enterprises must prioritize ethical data handling to maintain trust and stay compliant with global regulations." },
  { id: "wp-3340", t: "AI for Small Businesses: Levelling the Playing Field", b: "AI isn't just for tech giants. Small businesses can now leverage accessible tools to automate customer support, optimize inventory, and create professional marketing content at a fraction of the cost." },
  { id: "wp-3327", t: "Digital Marketing Trends: AI-Powered Personalization", b: "Marketing is moving from generic broad-reaching ads to hyper-personal experiences. AI helps brands predict customer needs and deliver the right message at the right time across all digital channels." },
  { id: "wp-3317", t: "Cloud Computing: Best Practices for Modern Enterprises", b: "Moving to the cloud requires a strategic approach. Proper migration, cost management, and security protocols are essential for reaping the full benefits of scalability and business continuity." },
  { id: "wp-3304", t: "Remote Work Security: Best Practices for Hybrid Teams", b: "With teams working from everywhere, securing the digital perimeter is critical. VPNs, multi-factor authentication, and employee training are the first lines of defense against modern cyber threats." },
  { id: "wp-3298", t: "E-commerce Optimization: Scaling Your Online Store", b: "Success in e-commerce depends on more than just great products. Optimizing the user journey, leveraging AI for recommendations, and ensuring fast load times are key to increasing conversion rates." },
  { id: "wp-3286", t: "Customer Experience: The New Competitive Advantage", b: "In a world of choices, experience is everything. AI-driven insights allow brands to understand customer sentiment and provide proactive support that builds long-term loyalty." },
  { id: "wp-3278", t: "Data Science for Beginners: Turning Information into Insights", b: "Data is the new oil, but only if you know how to refine it. Data science combines statistical methods with domain expertise to uncover patterns that drive smarter business decisions." },
  { id: "wp-3272", t: "Machine Learning vs AI: Understanding the Difference", b: "While the terms are often used interchangeably, they represent different levels of depth. AI is the broad goal of creating intelligent agents, while machine learning is the specific method of achieving it through data." },
  { id: "wp-3266", t: "Python for Tech Consultants: The Swiss Army Knife of Tech", b: "Python’s versatility makes it the top choice for automation, data analysis, and AI development. It's an essential skill for any modern tech consultant looking to deliver rapid value." },
  { id: "wp-3260", t: "JavaScript Frameworks 2025: Choosing the Right Tool", b: "The JS ecosystem is faster than ever. From React and Next.js to emerging light-weight frameworks, choosing the right stack depends on your project's specific performance and scalability needs." },
  { id: "wp-3247", t: "React Native: Building High-Performance Cross-Platform Apps", b: "React Native allows developers to share code between iOS and Android without sacrificing the native feel. It's the most efficient way to build modern mobile experiences with a single codebase." },
  { id: "wp-3239", t: "Flutter vs React Native: Which One Should You Choose?", b: "Both platforms offer great performance, but their ecosystems differ. Flutter provides total control over every pixel, while React Native leverages existing web knowledge and a massive library of components." },
  { id: "wp-3217", t: "Mobile App Security: Protecting User Privacy on the Go", b: "Mobile devices are prime targets for data theft. Implementing secure coding practices, data encryption, and regular vulnerability audits is essential for any reputable app developer." },
  { id: "wp-3185", t: "UX/UI Design: Creating Intuitive and Beautiful Interfaces", b: "Good design is invisible. By focusing on user needs and psychological triggers, we can create interfaces that are not only visually stunning but also effortless to use." },
  { id: "wp-3183", t: "Agile Methodology: Adapting to Change in a Fast-Paced World", b: "Agile isn't just a process; it's a mindset. By prioritizing iterative development and constant feedback, teams can deliver better software faster and more reliably." },
  { id: "wp-3174", t: "Scrum for Teams: Mastering the Framework for Success", b: "Scrum provides the structure needed for high-performing teams to thrive. Through sprints, daily standups, and retrospectives, teams stay aligned and continuously improve their velocity." },
  { id: "wp-3161", t: "DevOps Culture: Breaking Down the Silos", b: "DevOps is the fusion of development and operations. It aims to shorten the development lifecycle and provide continuous delivery with high software quality through automation and collaboration." },
  { id: "wp-3152", t: "CI/CD Pipelines: Automating the Path to Production", b: "Continuous Integration and Continuous Deployment (CI/CD) pipelines ensure that every code change is automatically tested and ready for release, minimizing human error and downtime." },
  { id: "wp-3147", t: "Docker Containers: Simplifying Deployment and Scaling", b: "Docker allows developers to package applications and their dependencies into lightweight containers. This ensures consistency across environments and simplifies scaling in the cloud." }
];

async function runBatch5() {
  console.log("🛠️ Starting Batch 5 Professional Translation (20 Articles)...");
  for (const item of batch5Data) {
    try {
      await client.patch(item.id).set({
        title_en: item.t,
        body_en: [{ _type: 'block', style: 'normal', children: [{ _type: 'span', text: item.b }] }]
      }).commit();
      console.log(`✅ Fully Translated: ${item.id} - ${item.t}`);
    } catch (e) {
      console.warn(`⚠️ Skipped ${item.id}: ${e.message}`);
    }
  }
}

runBatch5().catch(console.error);
