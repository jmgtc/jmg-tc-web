import posts from "../../../contents/blog/posts.json";
import Link from "next/link";

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

export default function BlogHighlights() {
  const featured = posts.slice(0, 3);

  return (
    <section className="bg-brand-white-offset py-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[10px] font-mono text-brand-gray-body/50 uppercase tracking-[0.4em] block mb-3">
              Section_04 // Blog
            </span>
            <h2 className="text-4xl font-bold text-brand-gray-title">Últimas publicaciones</h2>
          </div>
          <Link href="/blog" className="text-sm font-bold text-gold hover:underline hidden md:block">
            Ver todas →
          </Link>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {featured.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-3xl overflow-hidden border border-black/5 hover:border-gold/50 hover:shadow-xl transition-all"
            >
              {post.featured_image && (
                <div className="aspect-video overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.featured_image}
                    alt={stripHtml(post.title)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-6">
                {post.categories[0] && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold mb-2 block">
                    {post.categories[0]}
                  </span>
                )}
                <h3
                  className="font-bold text-brand-gray-title mb-2 group-hover:text-gold transition-colors line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />
                <p className="text-xs text-brand-gray-body line-clamp-3 leading-relaxed">
                  {stripHtml(post.excerpt)}
                </p>
                <div className="mt-4 text-xs text-brand-gray-body/60">
                  {new Date(post.date).toLocaleDateString("es-ES", { day: "2-digit", month: "long", year: "numeric" })}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link href="/blog" className="text-sm font-bold text-gold hover:underline">Ver todas las publicaciones →</Link>
        </div>
      </div>
    </section>
  );
}
