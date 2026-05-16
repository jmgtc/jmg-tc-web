// Server Component — renderizado en servidor, metadata dinámica por post
import { notFound } from "next/navigation";
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
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  try {
    const post = await client.fetch(buildPostQuery(params.slug));
    if (!post) {
      return { title: "Artículo no encontrado | JMG Tech Consulting" };
    }

    const title = post.title_en
      ? `${post.title} | JMG Tech Consulting`
      : `${post.title} | JMG Tech Consulting`;

    const description = post.excerpt
      ? post.excerpt.replace(/<[^>]*>/g, "").substring(0, 160)
      : "Noticias y análisis sobre IA, tecnología y transformación digital.";

    const imageUrl = post.mainImage
      ? urlFor(post.mainImage).width(1200).height(630).url()
      : undefined;

    const canonical = `${BASE_URL}/blog/${params.slug}`;

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
  } catch {
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
      if (b.children) b.children.forEach((c: any) => (text += c.text));
    });
  }
  return Math.ceil(text.split(/\s+/).length / 200);
}

function renderContent(blocks: any) {
  if (!blocks) return null;

  // HTML crudo (legacy)
  let rawHtml = "";
  if (
    typeof blocks === "string" &&
    (blocks.includes("<p>") || blocks.includes("<strong") || blocks.includes("<h"))
  ) {
    rawHtml = blocks;
  } else if (Array.isArray(blocks)) {
    const fullText = blocks
      .map((b: any) =>
        b._type === "block" && b.children
          ? b.children.map((c: any) => c.text || "").join("")
          : ""
      )
      .join("\n");
    if (
      typeof fullText === "string" &&
      (fullText.includes("<p>") || fullText.includes("<strong") || fullText.includes("<h"))
    ) {
      rawHtml = fullText;
    }
  }

  if (rawHtml) {
    return (
      <div
        className="prose prose-invert max-w-none prose-gold
          prose-p:text-white/80 prose-p:leading-relaxed prose-p:mb-6 prose-p:font-light
          prose-headings:text-white prose-headings:font-bold
          prose-strong:text-white prose-strong:font-bold
          prose-a:text-gold prose-a:no-underline hover:prose-a:underline"
        dangerouslySetInnerHTML={{ __html: rawHtml }}
      />
    );
  }

  // Portable Text estándar
  const components = {
    block: {
      h2: ({ children }: any) => (
        <h2 className="text-3xl font-bold text-white mt-12 mb-6">{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-2xl font-bold text-white mt-8 mb-4">{children}</h3>
      ),
      normal: ({ children }: any) => (
        <p className="text-white/80 leading-relaxed mb-6 font-light">{children}</p>
      ),
    },
    marks: {
      strong: ({ children }: any) => (
        <strong className="font-bold text-white">{children}</strong>
      ),
      em: ({ children }: any) => <em className="italic">{children}</em>,
      link: ({ children, value }: any) => (
        <a
          href={value.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gold hover:underline"
        >
          {children}
        </a>
      ),
    },
  };

  return <PortableText value={blocks} components={components} />;
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  let post: any = null;

  try {
    post = await client.fetch(buildPostQuery(params.slug));
  } catch (err: any) {
    console.error("[blog/[slug]] Error fetching post:", err);
    // Si es un error de cuota (402) o de red, lanzar para que error.tsx lo maneje
    // No llamar notFound() en este caso — el post puede existir pero Sanity no responde
    throw err;
  }

  // Post genuinamente no encontrado (slug incorrecto) → 404 real
  if (!post) {
    notFound();
  }

  const displayTitle = post.title; // ES por defecto en SSR
  const displayBody = post.body;
  const readingTime = calculateReadingTime(displayBody);
  const postUrl = `${BASE_URL}/blog/${params.slug}`;

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
