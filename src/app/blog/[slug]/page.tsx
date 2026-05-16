// Server Component — renderizado en servidor, metadata dinámica por post
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { client, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import type { Metadata } from "next";
import BlogShareButtons from "@/components/blog/BlogShareButtons";

export const revalidate = 3600; // ISR: revalida cada 1h

const BASE_URL = "https://www.jmg-tc.com";

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

// dynamicParams = true: permite generar slugs on-demand aunque no estén en generateStaticParams
// Esto evita que el build de Vercel falle con 402 al intentar pre-generar todos los posts
export const dynamicParams = true;

export async function generateStaticParams() {
  // Devolvemos [] intencionalmente para que el build NO pre-genere ningún post.
  // Los slugs se generan on-demand (ISR) en el primer acceso gracias a dynamicParams = true.
  //
  // RAZÓN: durante el build de Vercel, @sanity/client usa la API directa (api.sanity.io)
  // en lugar del CDN (apicdn.sanity.io), lo que consume cuota y puede dar 402.
  // En runtime, el CDN funciona correctamente y las páginas se sirven sin consumir cuota.
  return [];
}

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
    
    const displayTitle = (isEn && hasValidTitleEn) ? post.title_en : post.title;
    
    const title = `${displayTitle} | JMG Tech Consulting`;

    const description = post.excerpt
      ? post.excerpt.replace(/<[^>]*>/g, "").substring(0, 160)
      : "Noticias y análisis sobre IA, tecnología y transformación digital.";

    const imageUrl = post.mainImage
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
        ...(imageUrl ? { images: [{ url: imageUrl, width: 1200, height: 630, alt: post.title }] } : {}),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        ...(imageUrl ? { images: [imageUrl] } : {}),
      },
    };
  } catch (err) {
    console.error("[generateMetadata] Error:", err);
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

  // Si es un string (posible corrupción o texto plano heredado)
  if (typeof blocks === "string") {
    return (
      <div className="space-y-4">
        {blocks.split('\n\n').map((p, i) => (
          <p key={i} className="text-white/80 leading-relaxed font-light">{p}</p>
        ))}
      </div>
    );
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
        const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
        return (
          <a href={value.href} rel={rel} className="text-gold hover:underline transition-all">
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
    console.error("[blog/[slug]] Error fetching post:", err);
    throw err;
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
          {post.categories?.map((cat: string) => (
            <span
              key={cat}
              className="px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] uppercase tracking-widest"
            >
              {cat}
            </span>
          ))}
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

        {post.mainImage && (
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
            {post.tags.map((tag: string) => (
              <span key={tag} className="text-xs text-white/40 font-mono">
                #{tag.replace(/\s+/g, "")}
              </span>
            ))}
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
