// Server Component — fetch ocurre en servidor, posts llegan al HTML inicial
import { client } from "@/lib/sanity";
import BlogHeader from "@/components/blog/BlogHeader";
import BlogGrid from "@/components/blog/BlogGrid";

export const revalidate = 3600; // ISR: revalida cada 1h

async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    "title_en": title_en,
    slug,
    publishedAt,
    "body": pt::text(body),
    "body_en": pt::text(body_en),
    mainImage,
    categories
  }`;
  return client.fetch(query);
}

export default async function BlogPage() {
  let posts: any[] = [];
  let fetchError = false;

  try {
    posts = await getPosts();
  } catch (err) {
    console.error("[blog/page] Error fetching posts from Sanity:", err);
    fetchError = true;
  }

  return (
    <main className="min-h-screen bg-black text-white pt-40 pb-24 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 w-full max-w-full">
        {/* Header — Client Component (necesita useLanguage) */}
        <BlogHeader />

        {/* Error state visible — no grid vacío silencioso */}
        {fetchError ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6">
            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="stroke-white/40">
                <path d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-white/50 text-sm font-light text-center max-w-sm">
              No hemos podido cargar las noticias en este momento.<br />
              <span className="text-white/30 text-xs">Por favor, inténtalo de nuevo más tarde.</span>
            </p>
            <a
              href="/blog"
              className="px-6 py-3 rounded-full border border-white/10 text-xs uppercase tracking-widest hover:border-gold/40 transition-all"
            >
              Reintentar
            </a>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <p className="text-white/40 text-sm font-light">
              No hay publicaciones disponibles todavía.
            </p>
          </div>
        ) : (
          /* Grid + Paginación — Client Component (necesita useState + useLanguage) */
          <BlogGrid posts={posts} />
        )}
      </div>
    </main>
  );
}
