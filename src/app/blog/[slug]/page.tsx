// Server Component — renderizado en servidor, metadata dinámica por post
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import BlogShareButtons from "@/components/blog/BlogShareButtons";


const BASE_URL = "https://www.jmg-tc.com";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Revalidar cada minuto

// ─── Queries ────────────────────────────────────────────────────────────────

const slugsQuery = `*[_type == "post"]{ "slug": slug.current }`;

// CDN (useCdn: true) usa GET requests — los params GROQ no se envían por URL.
// Interpolamos el slug directamente en la query (seguro: valor viene de Sanity, no del usuario).
function buildPostQuery(slug: string) {
  return `*[_type == "post" && slug.current == "${slug}"][0] {
  _id,
  title,
  "title_en": title_en,
  publishedAt,
  body,
  body_en,
  mainImage,
  tags,
  "excerpt": pt::text(body),
  "categories": categories[]->title
}`;
}

// ─── generateStaticParams ────────────────────────────────────────────────────
// ─── generateMetadata ────────────────────────────────────────────────────────

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const cookieStore = await cookies();
  const language = (cookieStore.get("NEXT_LOCALE")?.value || "es") as "es" | "en";
  const isEn = language === "en";

  try {
    const post = await client.fetch(buildPostQuery(slug));
    if (!post) {
      return { title: "Artículo no encontrado | JMG Tech Consulting" };
    }

    // Lógica de metadatos dinámica por idioma con validación estricta
    const hasValidTitleEn = post.title_en && 
                           typeof post.title_en === "string" && 
                           post.title_en.trim() !== "" && 
                           post.title_en !== post.title;
    
    const displayTitle = (isEn && hasValidTitleEn) ? post.title_en : (post.title || "Artículo");
    
    const title = `${displayTitle} | JMG Tech Consulting`;

    const description = post.excerpt && typeof post.excerpt === "string"
      ? post.excerpt.replace(/<[^>]*>/g, "").substring(0, 160)
      : "Noticias y análisis sobre IA, tecnología y transformación digital.";

    const imageUrl = post.mainImage?.asset
      ? urlFor(post.mainImage).width(1200).height(630).url()
      : undefined;

    const canonical = `${BASE_URL}/blog/${slug}`;

    return {
      title,
      description,
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: "JMG Tech Consulting",
        type: "article",
        publishedTime: post.publishedAt,
        ...(imageUrl ? { images: [{ url: imageUrl, width: 1200, height: 630, alt: String(post.title || "") }] } : {}),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        ...(imageUrl ? { images: [imageUrl] } : {}),
      },
    };
  } catch (err) {
    console.error("[generateMetadata] Error fatal:", err);
    return { title: "JMG Tech Consulting | Blog" };
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function calculateReadingTime(blocks: any): number {
  if (!blocks) return 1;
  let text = "";
  if (typeof blocks === "string") {
    text = blocks.replace(/<[^>]*>/g, "");
  } else if (Array.isArray(blocks)) {
    blocks.forEach((b: any) => {
      if (b && b.children && Array.isArray(b.children)) {
        b.children.forEach((c: any) => {
          if (c && typeof c.text === "string") {
            text += c.text;
          }
        });
      }
    });
  }
  const wordCount = text.split(/\s+/).filter(Boolean).length;
  return Math.ceil(wordCount / 200) || 1;
}

function renderContent(blocks: any) {
  if (!blocks) return null;

  // Si es un string, puede ser texto plano o HTML crudo (ej: de Make/DeepL)
  if (typeof blocks === "string") {
    // Detectamos si contiene etiquetas HTML para decidir cómo procesar
    const hasHtml = /<[a-z][\s\S]*>/i.test(blocks);

    if (!hasHtml) {
      return (
        <div className="space-y-4">
          {blocks.split('\n\n').map((p, i) => (
            <p key={i} className="text-white/80 leading-relaxed font-light">{p}</p>
          ))}
        </div>
      );
    }

    // Proceso de renderizado seguro de HTML (sin dangerouslySetInnerHTML)
    // Dividimos por etiquetas básicas para un renderizado React controlado
    // Esta es una solución quirúrgica para evitar el HTML crudo visible
    const cleanHtml = (html: string) => {
      // 1. Reemplazamos br por saltos para split
      let processed = html.replace(/<br\s*\/?>/gi, '\n');
      
      // 2. Extraemos párrafos
      const paragraphs = processed.split(/<\/?p>/i).filter(p => p.trim() !== "");
      
      return paragraphs.map((p, i) => {
        // Procesamos negritas y títulos dentro de cada "bloque"
        // Nota: esto es una simplificación segura para los tags reportados
        const parts = p.split(/(<\/?[a-z0-9]+>)/i);
        let isStrong = false;
        let isH3 = false;
        
        const content = parts.map((part, j) => {
          if (part.toLowerCase() === '<strong>') { isStrong = true; return null; }
          if (part.toLowerCase() === '</strong>') { isStrong = false; return null; }
          if (part.toLowerCase() === '<h3>') { isH3 = true; return null; }
          if (part.toLowerCase() === '</h3>') { isH3 = false; return null; }
          if (part.startsWith('<')) return null; // Ignoramos otros tags no soportados por seguridad
          
          if (isStrong) return <strong key={j} className="font-bold text-white">{part}</strong>;
          if (isH3) return <h3 key={j} className="text-2xl font-bold mt-8 mb-4 text-white/90 block">{part}</h3>;
          return part;
        });

        return <p key={i} className="mb-6 text-white/80 leading-relaxed font-light">{content}</p>;
      });
    };

    return <div className="blog-content-html">{cleanHtml(blocks)}</div>;
  }

  // Si no es un array, PortableText fallará
  if (!Array.isArray(blocks)) {
    return null;
  }

  // Componentes personalizados para PortableText
  const components = {
    block: {
      normal: ({ children }: any) => <p className="mb-6 text-white/80 leading-relaxed font-light">{children}</p>,
      h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-12 mb-6 text-white">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-8 mb-4 text-white/90">{children}</h3>,
      blockquote: ({ children }: any) => (
        <blockquote className="border-l-4 border-gold/50 pl-6 my-8 italic text-white/60">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }: any) => <ul className="list-disc pl-6 mb-6 space-y-2 text-white/80 font-light">{children}</ul>,
      number: ({ children }: any) => <ol className="list-decimal pl-6 mb-6 space-y-2 text-white/80 font-light">{children}</ol>,
    },
    marks: {
      strong: ({ children }: any) => <strong className="font-bold text-white">{children}</strong>,
      link: ({ children, value }: any) => {
        const href = value?.href || "";
        const rel = href && !href.startsWith("/") ? "noreferrer noopener" : undefined;
        return (
          <a href={href} rel={rel} className="text-gold hover:underline transition-all">
            {children}
          </a>
        );
      },
    },
  };

  return <PortableText value={blocks} components={components} />;
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const language = (cookieStore.get("NEXT_LOCALE")?.value || "es") as "es" | "en";

  let post: any = null;

  try {
    post = await client.fetch(buildPostQuery(slug));
  } catch (err: any) {
    console.error("[blog/[slug]] Error crítico fetch Sanity:", err);
    // No lanzamos error para evitar el 500, dejamos que !post dispare notFound()
    post = null;
  }

  if (!post) {
    notFound();
  }

  // Lógica de selección de idioma inteligente con validación defensiva
  const isEn = language === "en";
  
  // Validar título EN: debe existir, ser string, no estar vacío y ser diferente al ES
  const hasValidTitleEn = post.title_en && 
                         typeof post.title_en === "string" && 
                         post.title_en.trim() !== "" && 
                         post.title_en !== post.title;
                         
  const displayTitle = (isEn && hasValidTitleEn) ? post.title_en : post.title;

  // Validar cuerpo EN: debe ser un array (PortableText) y tener contenido
  // Si es un string pero diferente al cuerpo original (como texto), lo permitimos vía renderContent hardenizado
  const isBodyEnArray = Array.isArray(post.body_en);
  const isBodyEnString = typeof post.body_en === "string";
  
  const hasValidBodyEn = isEn && (
    (isBodyEnArray && post.body_en.length > 0) || 
    (isBodyEnString && post.body_en.trim() !== "" && post.body_en !== post.body)
  );
  
  const displayBody = hasValidBodyEn ? post.body_en : post.body;

  const readingTime = calculateReadingTime(displayBody);
  const postUrl = `${BASE_URL}/blog/${slug}`;

  return (
    <main className="min-h-screen bg-[#070707] text-white pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">

        {/* Categorías y Tiempo de Lectura */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {Array.isArray(post.categories) && post.categories.map((cat: any) => {
            if (!cat || typeof cat !== "string") return null;
            return (
              <span
                key={cat}
                className="px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] uppercase tracking-widest"
              >
                {cat}
              </span>
            );
          })}
          <span className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {readingTime} min de lectura
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-12">
          {displayTitle}
        </h1>

        {post.mainImage && post.mainImage.asset && (
          <div className="w-full h-auto max-h-[300px] md:max-h-[350px] lg:max-h-[400px] rounded-[2rem] overflow-hidden mb-12 shadow-2xl border border-white/10 group">
            <img
              src={urlFor(post.mainImage).url()}
              alt={displayTitle}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        )}

        <div className="prose prose-invert max-w-none mb-16">
          {renderContent(displayBody)}
        </div>

        {/* Etiquetas */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12 pt-8 border-t border-white/5">
            {post.tags.map((tag: any) => {
              if (typeof tag !== "string") return null;
              return (
                <span key={tag} className="text-xs text-white/40 font-mono">
                  #{tag.replace(/\s+/g, "")}
                </span>
              );
            })}
          </div>
        )}

        {/* Share — Client Component (window, clipboard) */}
        <BlogShareButtons title={displayTitle} url={postUrl} />

        <div className="mt-16 flex justify-center">
          <Link
            href="/blog"
            className="px-8 py-4 rounded-full border border-gold/30 text-gold text-xs uppercase tracking-widest hover:bg-gold hover:text-black transition-all"
          >
            Explorar más noticias
          </Link>
        </div>
      </div>
    </main>
  );
}
