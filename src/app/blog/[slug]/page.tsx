import posts from "../../../../contents/blog/posts.json";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${stripHtml(post.title)} | JMG Tech Consulting`,
    description: stripHtml(post.excerpt).slice(0, 160),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.id !== post.id && p.categories.some((c) => post.categories.includes(c))).slice(0, 3);

  return (
    <main className="min-h-screen bg-brand-white-offset pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-brand-gray-body/60 mb-8">
          <Link href="/" className="hover:text-gold transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-gold transition-colors">Blog</Link>
          <span>/</span>
          <span className="text-brand-gray-body truncate">{stripHtml(post.title)}</span>
        </div>

        {/* Category */}
        {post.categories[0] && (
          <span className="text-[10px] font-bold uppercase tracking-widest text-gold mb-4 block">
            {post.categories[0]}
          </span>
        )}

        {/* Title */}
        <h1
          className="text-4xl md:text-5xl font-bold text-brand-gray-title mb-6 leading-tight"
          dangerouslySetInnerHTML={{ __html: post.title }}
        />

        {/* Date */}
        <p className="text-sm text-brand-gray-body/60 mb-10">
          {new Date(post.date).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}
        </p>

        {/* Featured Image */}
        {post.featured_image && (
          <div className="rounded-3xl overflow-hidden mb-12 shadow-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.featured_image} alt={stripHtml(post.title)} className="w-full object-cover" />
          </div>
        )}

        {/* Content */}
        <article
          className="prose prose-lg max-w-none prose-headings:text-brand-gray-title prose-a:text-gold"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Back */}
        <div className="mt-16 pt-8 border-t border-black/10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-gold hover:underline">
            ← Volver al Blog
          </Link>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-brand-gray-title mb-8">Artículos relacionados</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.id} href={`/blog/${r.slug}`} className="group bg-white rounded-2xl p-5 border border-black/5 hover:border-gold/50 transition-all">
                  <h3 className="font-bold text-brand-gray-title text-sm group-hover:text-gold transition-colors line-clamp-2" dangerouslySetInnerHTML={{ __html: r.title }} />
                  <p className="text-xs text-brand-gray-body/60 mt-2">
                    {new Date(r.date).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" })}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
