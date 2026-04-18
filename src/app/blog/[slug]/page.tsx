"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { client, urlFor } from "@/lib/sanity";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function BlogPostPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { language } = useLanguage();
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const query = `*[_type == "post" && slug.current == $slug][0] {
          _id,
          title,
          "title_en": title_en,
          publishedAt,
          body,
          body_en,
          mainImage
        }`;
        const data = await client.fetch(query, { slug });
        if (!data) {
          router.push('/blog');
          return;
        }
        setPost(data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchPost();
  }, [slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  const displayTitle = language === 'en' && post.title_en ? post.title_en : post.title;
  const displayBody = language === 'en' && post.body_en ? post.body_en : post.body;

  // Advanced renderer for Portable Text to support bold, italics and links
  const renderContent = (blocks: any) => {
    if (!blocks || !Array.isArray(blocks)) return null;
    
    return blocks.map((block: any, i: number) => {
      if (block._type !== 'block' || !block.children) return null;
      
      const { style = 'normal', children, markDefs = [] } = block;

      const renderSpan = (span: any, j: number) => {
        let content: React.ReactNode = span.text;

        if (span.marks && span.marks.length > 0) {
          span.marks.forEach((mark: string) => {
            // Check if it's a basic style mark
            if (mark === 'strong') content = <strong key={`${mark}-${j}`} className="font-bold text-white tracking-normal">{content}</strong>;
            if (mark === 'em') content = <em key={`${mark}-${j}`} className="italic">{content}</em>;
            
            // Check if it's a link mark (defined in markDefs)
            const linkDef = markDefs.find((def: any) => def._key === mark);
            if (linkDef && linkDef._type === 'link') {
              content = (
                <a 
                  key={`${mark}-${j}`} 
                  href={linkDef.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gold hover:underline transition-all font-medium"
                >
                  {content}
                </a>
              );
            }
          });
        }
        return <span key={span._key || j}>{content}</span>;
      };

      const content = children.map((span: any, j: number) => renderSpan(span, j));

      if (style === 'h2') return <h2 key={block._key || i} className="text-3xl font-bold text-white mt-12 mb-6">{content}</h2>;
      if (style === 'h3') return <h3 key={block._key || i} className="text-2xl font-bold text-white mt-10 mb-4">{content}</h3>;
      
      return (
        <p key={block._key || i} className="text-white/70 leading-[1.8] font-light mb-6 whitespace-pre-wrap">
          {content}
        </p>
      );
    });
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pt-40 pb-24 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em] text-white/40 mb-12">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <Link href="/blog" className="hover:text-gold transition-colors">Blog</Link>
          <span className="w-1 h-1 rounded-full bg-white/20" />
          <span className="text-gold/50 truncate max-w-[200px]">{displayTitle}</span>
        </nav>

        {/* Content Section */}
        <article className="bg-white/[0.03] backdrop-blur-2xl rounded-[40px] border border-white/10 p-2 md:p-2 shadow-2xl relative overflow-hidden">
          {/* Main Image Banner */}
          {post.mainImage && (
            <div className="w-full aspect-video rounded-[36px] overflow-hidden mb-8">
              <img 
                src={urlFor(post.mainImage).url()} 
                alt={displayTitle}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="px-8 md:px-16 py-8">
            {/* Header */}
            <header className="mb-12">
              <div className="text-[10px] font-mono text-gold uppercase tracking-[0.3em] mb-4 block">
                {new Date(post.publishedAt).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight mb-8">
                {displayTitle}
              </h1>
            </header>

            {/* Body */}
            <div className="prose prose-invert prose-lg max-w-none">
              {displayBody ? renderContent(displayBody) : (
                <p className="text-white/70 italic">{language === 'es' ? 'El contenido se está procesando...' : 'Content is being processed...'}</p>
              )}
            </div>
          </div>


          {/* Footer */}
          <footer className="px-8 md:px-16 pb-16 pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <Link href="/blog" className="inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-gold hover:translate-x-[-4px] transition-transform">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="rotate-180 stroke-gold">
                <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {language === 'es' ? 'Volver al Blog' : 'Back to Blog'}
            </Link>

            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-widest text-white/30">Share:</span>
              <div className="flex gap-2">
                {['Twitter', 'LinkedIn'].map(social => (
                  <button key={social} className="px-4 py-2 rounded-full border border-white/10 hover:border-gold/30 text-[10px] font-mono hover:bg-gold/5 transition-all">
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </footer>
        </article>
      </div>
    </main>
  );
}
