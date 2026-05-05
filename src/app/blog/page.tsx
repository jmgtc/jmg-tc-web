"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { client, urlFor } from "@/lib/sanity";
import { useLanguage } from "@/components/providers/LanguageProvider";

const POSTS_PER_PAGE = 21;

function stripHtml(html: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}

export default function BlogPage() {
  const { language, t } = useLanguage();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
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
        const data = await client.fetch(query);
        setPosts(data);

        // --- REVISIÓN Y REPARACIÓN AUTOMÁTICA ---
        // Si detectamos algún post sin traducción, disparamos la reparación en segundo plano
        if (data.some((p: any) => !p.title_en)) {
          console.log('[Blog] Detectados posts sin traducción. Iniciando auto-reparación...');
          fetch('/api/admin/repair-translations').catch(() => {});
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Lógica de paginación
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    goToTop();
  };

  return (
    <main className="min-h-screen bg-black text-white pt-40 pb-24 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 w-full max-w-full">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/70">{t('blog.insights_tag')}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
            {t('blog.title')}
          </h1>
          <p className="text-lg text-white/80 leading-relaxed font-light">
            {t('blog.description')}
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-[400px] rounded-3xl bg-white/5 animate-pulse border border-white/10" />
            ))}
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post) => {
                const displayTitle = language === 'en' && post.title_en ? post.title_en : post.title;
                const displayBody = language === 'en' && post.body_en ? post.body_en : post.body;

                return (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug.current}`}
                    className="group relative flex flex-col h-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden hover:bg-white/[0.08] hover:border-gold/30 transition-all duration-500"
                  >
                    {/* Post Image */}
                    {post.mainImage && (
                      <div className="h-56 w-full overflow-hidden relative">
                        <img
                          src={urlFor(post.mainImage).url()}
                          alt={displayTitle}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                      </div>
                    )}

                    <div className="relative p-6 pt-8 flex flex-col h-full">
                      <div className="text-[10px] font-mono text-white/60 uppercase tracking-widest mb-4 flex justify-between items-center">
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      
                      <h2 className="text-2xl font-bold mb-4 group-hover:text-gold transition-colors duration-300 line-clamp-2">
                         {displayTitle}
                      </h2>
                      
                      <p className="text-sm text-white/70 leading-relaxed font-light mb-8 flex-grow">
                        {(() => {
                          const stripped = stripHtml(displayBody || "");
                          return stripped.substring(0, 100) + (stripped.length > 100 ? "..." : "");
                        })()}
                      </p>

                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-gold/80">
                          {t('blog.read_more')}
                        </span>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="stroke-white/30 group-hover:stroke-gold group-hover:translate-x-1 transition-all">
                          <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-20 flex justify-center items-center gap-4">
                <button
                  disabled={currentPage === 1}
                  onClick={() => paginate(currentPage - 1)}
                  className="px-6 py-3 rounded-full border border-white/10 text-xs uppercase tracking-widest disabled:opacity-20 hover:border-gold/50 transition-all flex items-center gap-2 group"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="rotate-180 stroke-current group-hover:stroke-gold">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  {language === 'es' ? 'Anterior' : 'Previous'}
                </button>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      onClick={() => paginate(num)}
                      className={`w-10 h-10 rounded-full text-xs font-mono transition-all ${
                        currentPage === num 
                          ? 'bg-gold text-black border-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]' 
                          : 'bg-white/5 border border-white/10 hover:border-gold/30'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => paginate(currentPage + 1)}
                  className="px-6 py-3 rounded-full border border-white/10 text-xs uppercase tracking-widest disabled:opacity-20 hover:border-gold/50 transition-all flex items-center gap-2 group"
                >
                  {language === 'es' ? 'Siguiente' : 'Next'}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="stroke-current group-hover:stroke-gold">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
