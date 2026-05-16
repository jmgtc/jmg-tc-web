"use client";

import { useState } from "react";
import Link from "next/link";
import { urlFor } from "@/lib/sanity";
import { useLanguage } from "@/components/providers/LanguageProvider";

const POSTS_PER_PAGE = 21;

function stripHtml(html: string) {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "").trim();
}

interface Post {
  _id: string;
  title: string;
  title_en?: string;
  slug: { current: string };
  publishedAt: string;
  body?: string;
  body_en?: string;
  mainImage?: any;
  categories?: any[];
}

interface BlogGridProps {
  posts: Post[];
}

export default function BlogGrid({ posts }: BlogGridProps) {
  const { language, t } = useLanguage();
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentPosts.map((post) => {
          const displayTitle =
            language === "en" && post.title_en ? post.title_en : post.title;
          const displayBody =
            language === "en" && post.body_en ? post.body_en : post.body;

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
                    {new Date(post.publishedAt).toLocaleDateString(
                      language === "es" ? "es-ES" : "en-US",
                      { day: "2-digit", month: "short", year: "numeric" }
                    )}
                  </span>
                </div>

                <h2 className="text-2xl font-bold mb-4 group-hover:text-gold transition-colors duration-300 line-clamp-2">
                  {displayTitle}
                </h2>

                <p className="text-sm text-white/70 leading-relaxed font-light mb-8 flex-grow">
                  {(() => {
                    const stripped = stripHtml(displayBody || "");
                    return (
                      stripped.substring(0, 100) +
                      (stripped.length > 100 ? "..." : "")
                    );
                  })()}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold/80">
                    {t("blog.read_more")}
                  </span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="stroke-white/30 group-hover:stroke-gold group-hover:translate-x-1 transition-all"
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
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
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="rotate-180 stroke-current group-hover:stroke-gold"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {language === "es" ? "Anterior" : "Previous"}
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => paginate(num)}
                className={`w-10 h-10 rounded-full text-xs font-mono transition-all ${
                  currentPage === num
                    ? "bg-gold text-black border-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                    : "bg-white/5 border border-white/10 hover:border-gold/30"
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
            {language === "es" ? "Siguiente" : "Next"}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="stroke-current group-hover:stroke-gold"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
