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

const batch6Data = [
  { id: "wp-3136", t: "Serverless Architecture: Focus on Code, Not Infrastructure", b: "Serverless computing allows developers to build and run applications without managing servers. It automatically scales with demand, providing a highly cost-efficient and agile way to deploy modern software." },
  { id: "wp-3125", t: "Kubernetes Orchestration: Managing Complex Microservices", b: "Kubernetes has become the standard for container orchestration. It automates deployment, scaling, and management of containerized applications, ensuring high availability in complex distributed systems." },
  { id: "wp-3114", t: "Microservices Design: Building Scalable and Resilient Systems", b: "By breaking large applications into smaller, independent services, teams can develop and deploy faster. Microservices architecture improves fault tolerance and allows for the use of different technology stacks." },
  { id: "wp-3098", t: "GraphQL vs REST: Choosing the Right API Style", b: "GraphQL provides a more flexible and efficient way to query data compared to traditional REST APIs. It allows clients to request exactly what they need, reducing over-fetching and improving performance." },
  { id: "wp-3086", t: "API Security: Safeguarding Your Digital Bridges", b: "APIs are the most targeted entry point for modern cyberattacks. Implementing OAuth, rate limiting, and continuous monitorization is essential for protecting the data flowing between your systems." },
  { id: "wp-3074", t: "SQL vs NoSQL: Selecting the Right Database for Your Needs", b: "Choosing between relational (SQL) and non-relational (NoSQL) databases depends on your data structure. SQL is ideal for complex queries and ACID compliance, while NoSQL offers superior scalability for unstructured data." },
  { id: "wp-3062", t: "Big Data Analytics: Unlocking Value at Scale", b: "Big data isn't just about volume; it's about speed and variety. Using modern analytics platforms allows organizations to process terabytes of data to find actionable insights that drive competitive advantage." },
  { id: "wp-3050", t: "Cybersecurity for Remote Teams: A Guide for 2024", b: "Securing a remote workforce requires a multi-layered approach. From encrypted communications to employee security awareness, organizations must adapt to a landscape where the perimeter is everywhere." },
  { id: "wp-3038", t: "AI Ethics and Society: Balancing Progress and Responsibility", b: "As AI influence grows, we must address the ethical implications. Ensuring transparency, accountability, and human-centric design is key to building a future where technology benefits everyone." },
  { id: "wp-3026", t: "Blockchain Beyond Crypto: Transforming Industries", b: "Blockchain is revolutionizing more than just finance. From supply chain transparency to secure voting systems, its decentralized ledger technology provides a foundation for truth in the digital age." },
  { id: "wp-3014", t: "Web3 Potential: The Future of the Decentralized Web", b: "Web3 promises a more user-centric internet where individuals own their data and identity. Through smart contracts and dApps, we are moving toward a web that is open, permissionless, and trustless." },
  { id: "wp-3002", t: "Fintech Innovation: The Technology Disrupting Finance", b: "Fintech is reshaping how we pay, save, and invest. By leveraging AI, blockchain, and cloud computing, new financial platforms are providing more accessible and efficient services to millions worldwide." }
];

async function runBatch6() {
  console.log("🛠️ Starting FINAL Batch 6 Professional Translation (12 Articles)...");
  for (const item of batch6Data) {
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

runBatch6().catch(console.error);
