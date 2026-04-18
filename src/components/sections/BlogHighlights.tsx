"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { client, urlFor } from "@/lib/sanity";
import Link from "next/link";

function stripHtml(html: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}

export default function BlogHighlights({ data }: { data?: any }) {
  const { language, dict } = useLanguage();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const query = `*[_type == "post"] | order(publishedAt desc)[0...3] {
          _id,
          title,
          "title_en": title_en,
          slug,
          publishedAt,
          "excerpt": body[0].children[0].text,
          "excerpt_en": body_en[0].children[0].text,
          mainImage,
          categories
        }`;
        const results = await client.fetch(query);
        setPosts(results);
      } catch (err) {
        console.error("Error fetching highlights:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatest();
  }, []);

  const labels = {
    tag: data?.tag || "Section_05 // Blog",
    title: (language === 'es' ? data?.title : data?.title_en) || (language === 'es' ? 'Últimas publicaciones' : 'Latest posts'),
    view_all: (language === 'es' ? data?.view_all : data?.view_all_en) || (language === 'es' ? 'Ver todas →' : 'View all →')
  };

  if (loading) return null;

  return (
    <section className="bg-black py-24 relative">
       {/* Decorative gradient */}
       <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] block mb-3">
              {labels.tag}
            </span>
            <h2 className="text-4xl font-bold text-white">
              {labels.title}
            </h2>
          </div>
          <Link href="/blog" className="text-sm font-bold text-gold hover:text-white transition-colors hidden md:block">
            {labels.view_all}
          </Link>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post) => {
            const displayTitle = language === 'en' && post.title_en ? post.title_en : post.title;
            const displayExcerpt = language === 'en' && post.excerpt_en ? post.excerpt_en : post.excerpt;
            const imageUrl = post.mainImage ? urlFor(post.mainImage).url() : null;

            return (
              <Link
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="group bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-gold/50 transition-all flex flex-col h-full"
              >
                {imageUrl && (
                  <div className="aspect-video overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                    <img
                      src={imageUrl}
                      alt={stripHtml(displayTitle)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                )}
                <div className="p-7 flex flex-col flex-grow">
                  {post.categories?.[0] && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gold/80 mb-3 block">
                      {post.categories[0]}
                    </span>
                  )}
                  <h3
                    className="text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors line-clamp-2 leading-tight"
                    dangerouslySetInnerHTML={{ __html: displayTitle }}
                  />
                  <p className="text-xs text-white/60 leading-relaxed font-light mb-6">
                    {stripHtml(displayExcerpt || "").substring(0, 50)}{displayExcerpt && displayExcerpt.length > 50 ? "..." : ""}
                  </p>
                  <div className="mt-auto pt-4 border-t border-white/5 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                    {new Date(post.publishedAt).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { 
                      day: "2-digit", 
                      month: "short", 
                      year: "numeric" 
                    })}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link href="/blog" className="text-sm font-bold text-gold hover:underline">
             {labels.view_all}
          </Link>
        </div>
      </div>
    </section>
  );
}
