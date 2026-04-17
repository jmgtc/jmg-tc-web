import json
import os

filepath = 'contents/blog/posts.json'
with open(filepath, 'r') as f:
    posts = json.load(f)

translations = {
  "asi-transforma-gemini-3-tus-ideas-en-experiencias-interactiva": {
    "title_en": "How Gemini 3 transforms your ideas into interactive experiences",
    "excerpt_en": "<p>Gemini 3 is Google's new artificial intelligence model, designed so anyone can learn faster, create interactive experiences, and plan complex projects with a single prompt. Integrated into products like the Gemini app, AI Mode in Search, and Google AI Studio, it becomes an advanced assistant always available, for both individuals and businesses.</p>\n"
  },
  "adobe-integra-chatgpt-en-photoshop-y-acrobat": {
    "title_en": "Adobe integrates ChatGPT into Photoshop and Acrobat",
    "excerpt_en": "<p>Adobe has launched Adobe Photoshop, Adobe Express, and Adobe Acrobat directly within ChatGPT, allowing its 800 million weekly users to edit images, design invitations, and transform documents with simple conversational instructions. This integration combines the power of Adobe's leading tools with ChatGPT's intuitive interface.</p>\n"
  },
  "como-comet-assistant-potencia-tu-control-sobre-la-ia": {
    "title_en": "How Comet Assistant boosts your control over AI",
    "excerpt_en": "<p>Comet Assistant: more control and precision in your searches</p><p>Perplexity's Comet Assistant revolutionizes the browsing experience by offering unprecedented control and precision in searches, thanks to its AI integrated directly into the browser. This tool not only allows complex queries, but also understands and acts simultaneously across multiple tabs.</p>\n"
  },
  "google-potencia-notebooklm-con-1-millon-de-tokens-de-contexto": {
    "title_en": "Google supercharges NotebookLM with a 1 million token context window",
    "excerpt_en": "<p>Google has made a significant leap by boosting NotebookLM with a 1 million token context window thanks to Gemini integration. This update enables analyzing large document collections and improves the conversational experience, offering much more coherent and useful interactions in extended projects.</p>\n"
  },
  "como-adobe-revoluciona-la-creatividad-con-ia-en-max-2025": {
    "title_en": "How Adobe revolutionizes creativity with AI at MAX 2025",
    "excerpt_en": "<p>AI and creativity: the latest from Adobe at MAX 2025</p><p>At Adobe MAX 2025, Adobe presented AI advancements that transform digital creativity. The event highlights Firefly's consolidation as a complete AI studio to generate and edit images, videos, and audio with just written instructions, minimizing technical barriers.</p>\n"
  },
  "microsoft-convierte-cada-pc-con-windows-11-en-un-pc-con-ia": {
    "title_en": "Microsoft turns every Windows 11 PC into an AI PC",
    "excerpt_en": "<p>Microsoft turns every Windows 11 PC into an AI PC through deep Copilot integration, transforming the traditional computing experience into a conversational and natural interaction.</p><p>The new update allows natural interaction by voice or text, visual analysis of on-screen content, and automated actions with user permission.</p>\n"
  },
  "openai-refuerza-la-innovacion-en-inteligencia-artificial-europea": {
    "title_en": "OpenAI reinforces artificial intelligence innovation in Europe",
    "excerpt_en": "<p>OpenAI accelerates AI adoption across Europe</p><p>OpenAI is intensifying its commitment to drive AI adoption in Europe through strategic initiatives. The company launched \"OpenAI for countries\" to help build AI infrastructures, including data centers, professional training, and startup ecosystem support.</p>\n"
  },
  "meta-presenta-vibes-ai-inteligencia-artificial-para-videos": {
    "title_en": "Meta introduces Vibes AI, artificial intelligence for videos",
    "excerpt_en": "<p>Meta takes a step forward in digital creativity with Vibes, its new AI-powered platform to create and share AI-generated short videos easily. Vibes is integrated into the Meta AI app and web, offering a dynamic feed to explore, edit, and publish fully customized visual content.</p>\n"
  },
  "made-on-youtube-2025-evoluciona-la-creatividad-con-ia": {
    "title_en": "Made on YouTube 2025: creativity evolves with AI",
    "excerpt_en": "<p>The 2025 edition of Made on YouTube revolutionizes the creative universe with new AI-based tools. YouTube Shorts is renewed with powerful AI features, like Veo 3 Fast integration and Speech to Song, transforming how short video stories are told.</p>\n"
  },
  "google-chrome-se-reinventa-con-inteligencia-artificial-integrada": {
    "title_en": "Google Chrome reinvents itself with integrated artificial intelligence",
    "excerpt_en": "<p>Google Chrome reinvents itself with integrated artificial intelligence, taking the browsing experience to a smarter and more personalized level. The browser now takes a qualitative leap with functions that transform its nature.</p>\n"
  },
  "claude-incorpora-creacion-automatica-de-archivos-con-ia-avanzada": {
    "title_en": "Claude incorporates automatic file creation with advanced AI",
    "excerpt_en": "<p>Claude, developed by Anthropic, has added automatic file creation via advanced AI, revolutionizing productivity. It's now possible to generate and edit files like Excel spreadsheets, documents, PowerPoint presentations, and PDFs directly from Claude.ai.</p>\n"
  },
  "asi-ayuda-notebooklm-de-google-a-mejorar-el-aprendizaje": {
    "title_en": "Here's how Google's NotebookLM helps improve learning",
    "excerpt_en": "<p>Google's NotebookLM revolutionizes modern learning acting as a personal AI partner for research in any subject. It recently added new features that transform passive reading into active learning for both students and professionals.</p>\n"
  },
  "gemini-2-5-flash-image-crea-imagenes-con-precision": {
    "title_en": "Gemini 2.5 Flash Image: create images with precision",
    "excerpt_en": "<p>Gemini 2.5 Flash Image is Google's latest advance in AI image generation, standing out for its speed, precision, and natively multimodal architecture, capable of handling text and images together coherently.</p>\n"
  },
  "whatsapp-lanza-asistente-de-escritura-privada-con-inteligencia-artificial": {
    "title_en": "WhatsApp launches private writing assistant with artificial intelligence",
    "excerpt_en": "<p>New WhatsApp feature: private help for writing messages</p><p>WhatsApp announced Writing Help, an AI writing tool designed to help users strike the perfect tone in their messages while maintaining absolute privacy thanks to Private Processing technology.</p>\n"
  },
  "anthropic-impulsa-la-educacion-superior-con-inteligencia-artificial": {
    "title_en": "Anthropic boosts higher education with artificial intelligence",
    "excerpt_en": "<p>Anthropic reinforces higher education through advanced AI</p><p>Anthropic launched initiatives aimed at transforming higher education. The company announced collaborations with universities to integrate its generative AI solutions to improve learning and teaching efficiency.</p>\n"
  },
  "busqueda-avanzada-google-ai-mode-gestiona-reservas-por-ti": {
    "title_en": "Advanced search: Google AI Mode manages bookings for you",
    "excerpt_en": "<p>GOOGLE transformed its search engine with AI, introducing the new AI Mode, which now includes \"agentic\" functionalities to simplify everyday tasks and bookings with a single request.</p>\n"
  },
  "transforma-imagenes-solo-con-tu-voz-o-texto-en-google-photos": {
    "title_en": "Transform images just with your voice or text in Google Photos",
    "excerpt_en": "<p>Edit your photos with AI just by asking in Google Photos</p><p>Image editing in Google Photos takes a revolutionary leap allowing any user to request modifications via text or voice. Simply describe changes like \"erase cars from background\" and Google Photos AI executes them instantly.</p>\n"
  },
  "evita-estafas-en-whatsapp-con-estas-nuevas-herramientas": {
    "title_en": "Avoid scams on WhatsApp with these new tools",
    "excerpt_en": "<p>WhatsApp reinforces defense against scams in chats and groups</p><p>WhatsApp launched new tools to protect you against messaging scams, including a new safety view feature for groups when added by unknown people.</p>\n"
  },
  "google-lanza-mle-star-agentes-avanzados-para-ingenieria-ia": {
    "title_en": "Google launches MLE-STAR, advanced agents for AI engineering",
    "excerpt_en": "<p>Google sets a new milestone in AI with MLE-Star, an advanced agent designed to revolutionize Machine Learning engineering. It acts as an autonomous ML engineer capable of addressing complex tasks.</p>\n"
  },
  "startups-aceleran-su-desarrollo-con-llama-y-amazon-web-services": {
    "title_en": "Startups accelerate their development with Llama and Amazon Web Services",
    "excerpt_en": "<p>AWS and Meta Llama: Boost your Startup with AI Program</p><p>AWS and Meta announced a powerful collaboration to boost the AI startup ecosystem, expanding their program to integrate Llama 3 to build and scale innovative generative AI solutions.</p>\n"
  },
  "google-search-descubre-web-guides-ia-potencia-tu-busqueda": {
    "title_en": "Google Search: Discover Web Guides. AI Boosts Your Search.",
    "excerpt_en": "<p>Google Search: Discover Web Guides. AI Boosts Your Search.</p><p>Google is elevating the search experience with \"Web Guides\", an experimental feature offering meticulously selected web page collections to explore complex topics in depth.</p>\n"
  },
  "novedades-en-youtube-shorts-edicion-rapida-y-creativa": {
    "title_en": "What's new in YouTube Shorts: quick and creative editing",
    "excerpt_en": "<p>YouTube is setting the course for short content creation with advanced AI tools, including \"Dream Screen\" to generate custom backgrounds via text descriptions.</p>\n"
  },
  "microsoft-refuerza-windows-11-con-inteligencia-artificial-avanzada": {
    "title_en": "Microsoft reinforces Windows 11 with advanced artificial intelligence",
    "excerpt_en": "<p>Windows 11 consolidates as the epicenter of AI on the PC. At the heart of this evolution is Copilot, a personal AI assistant integrated into everyday tasks to optimize productivity.</p>\n"
  },
  "google-y-la-ia-el-futuro-de-la-ciberseguridad-en-2025": {
    "title_en": "Google and AI: The Future of Cybersecurity in 2025",
    "excerpt_en": "<p>Google is setting the course for cybersecurity in 2025, firmly betting on Artificial Intelligence as a fundamental pillar of its defenses against sophisticated threats.</p>\n"
  },
  "notebooklm-mejora-con-cuadernos-ia-para-aprender-mas-rapido": {
    "title_en": "NotebookLM improves with AI notebooks for faster learning",
    "excerpt_en": "<p>NotebookLM significantly elevates the learning experience by integrating \"Featured Notebooks\", offering access to high-quality curated study materials and sources.</p>\n"
  },
  "openai-y-ue-juntos-por-ia-responsable-y-confiable": {
    "title_en": "OpenAI and EU: Together for Responsible and Trustworthy AI",
    "excerpt_en": "<p>The collaboration between OpenAI and the European Union marks a crucial milestone in the pursuit of responsible AI, reaffirming the commitment to combat digital misinformation.</p>\n"
  }
}

for post in posts:
    slug = post.get('slug')
    if slug in translations:
        post['title_en'] = translations[slug]['title_en']
        post['excerpt_en'] = translations[slug]['excerpt_en']
    else:
        post['title_en'] = post.get('title', '')
        post['excerpt_en'] = post.get('excerpt', '')

with open(filepath, 'w') as f:
    json.dump(posts, f, indent=2, ensure_ascii=False)

print("done")
