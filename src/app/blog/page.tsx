"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { client, urlFor } from "@/lib/sanity";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function BlogPage() {
  const { language, t } = useLanguage();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white pt-40 pb-24 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 -left-20 w-96 h-96 bg-gold/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-40 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/70">{t('blog.insights_tag')}</span>
          </div>
          <h1 className="text-6xl font-bold tracking-tight mb-4">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => {
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
                      {(displayBody || "").substring(0, 100)}{displayBody && displayBody.length > 100 ? "..." : ""}
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
        )}

      </div>
    </main>
  );
}
