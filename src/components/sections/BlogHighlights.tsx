"use client";

import { useLanguage } from "@/components/providers/LanguageProvider";
import posts from "../../../contents/blog/posts.json";
import Link from "next/link";

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "").trim();
}

export default function BlogHighlights() {
  const { language, dict } = useLanguage();
  const featured = posts.slice(0, 3);

  return (
    <section className="bg-black py-24 relative">
       {/* Decorative gradient */}
       <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] block mb-3">
              Section_04 // Blog
            </span>
            <h2 className="text-4xl font-bold text-white">
              {language === 'es' ? 'Últimas publicaciones' : 'Latest posts'}
            </h2>
          </div>
          <Link href="/blog" className="text-sm font-bold text-gold hover:text-white transition-colors hidden md:block">
            {language === 'es' ? 'Ver todas →' : 'View all →'}
          </Link>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {featured.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group bg-white/5 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 hover:border-gold/50 transition-all flex flex-col h-full"
            >
              {post.featured_image && (
                <div className="aspect-video overflow-hidden relative">
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.featured_image}
                    alt={stripHtml(post.title)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}
              <div className="p-7 flex flex-col flex-grow">
                {post.categories[0] && (
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold/80 mb-3 block">
                    {post.categories[0]}
                  </span>
                )}
                <h3
                  className="text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors line-clamp-2 leading-tight"
                  dangerouslySetInnerHTML={{ __html: post.title }}
                />
                <p className="text-xs text-white/60 line-clamp-3 leading-relaxed font-light mb-6">
                  {stripHtml(post.excerpt)}
                </p>
                <div className="mt-auto pt-4 border-t border-white/5 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                  {new Date(post.date).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { day: "2-digit", month: "short", year: "numeric" })}
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center md:hidden">
          <Link href="/blog" className="text-sm font-bold text-gold hover:underline">
             {language === 'es' ? 'Ver todas las publicaciones →' : 'View all posts →'}
          </Link>
        </div>
      </div>
    </section>
  );
}
