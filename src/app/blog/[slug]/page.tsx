"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { client, urlFor } from "@/lib/sanity";
import { useLanguage } from "@/components/providers/LanguageProvider";

// Iconos para compartir
const ShareIcon = ({ type }: { type: string }) => {
  const icons: any = {
    linkedin: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>,
    facebook: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>,
    twitter: <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>,
    telegram: <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm5.894-17.471l-2.068 9.753c-.156.703-.572.878-1.162.541l-3.158-2.328-1.522 1.464c-.168.168-.311.311-.63.311l.226-3.21 5.842-5.278c.254-.226-.055-.351-.39-.129l-7.227 4.551-3.111-.971c-.675-.211-.689-.675.141-.998l12.143-4.68c.563-.206 1.054.133.856.886z"/>,
    whatsapp: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.981.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.12.551 4.189 1.595 6.04L0 24l6.104-1.602a11.81 11.81 0 005.946 1.606h.005c6.632 0 12.028-5.396 12.03-12.03a11.77 11.77 0 00-3.517-8.417"/>,
    email: <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6ZM20 6L12 11L4 6H20ZM20 18H4V8L12 13L20 8V18Z"/>,
    print: <path d="M19 8H5C3.34 8 2 9.34 2 11V17H6V21H18V17H22V11C22 9.34 20.66 8 19 8ZM16 19H8V14H16V19ZM19 12C18.45 12 18 11.55 18 11C18 10.45 18.45 10 19 10C19.55 10 20 10.45 20 11C20 11.55 19.55 12 19 12ZM18 3H6V7H18V3Z"/>,
    link: <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>,
    threads: <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6zm0-10c-2.209 0-4 1.791-4 4s1.791 4 4 4 4-1.791 4-4-1.791-4-4-4z"/>
  };
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
      {icons[type] || null}
    </svg>
  );
};

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
          mainImage,
          tags,
          "categories": categories[]->title
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

  if (loading || !post) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-12 h-12 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    );
  }

  const displayTitle = language === 'en' && post.title_en ? post.title_en : post.title;
  const displayBody = language === 'en' && post.body_en ? post.body_en : post.body;

  // Calculo de tiempo de lectura
  const calculateReadingTime = (blocks: any) => {
    if (!blocks) return 1;
    let text = "";
    blocks.forEach((b: any) => {
      if (b.children) b.children.forEach((c: any) => text += c.text);
    });
    const words = text.split(/\s+/).length;
    return Math.ceil(words / 200);
  };

  const readingTime = calculateReadingTime(displayBody);

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const shareUrls: any = {
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${displayTitle}`,
      telegram: `https://t.me/share/url?url=${url}&text=${displayTitle}`,
      whatsapp: `https://api.whatsapp.com/send?text=${displayTitle} ${url}`,
      email: `mailto:?subject=${displayTitle}&body=${url}`
    };
    if (platform === 'print') window.print();
    else if (platform === 'link') {
      navigator.clipboard.writeText(url);
      alert(language === 'es' ? '¡Enlace copiado!' : 'Link copied!');
    }
    else if (shareUrls[platform]) window.open(shareUrls[platform], '_blank');
  };

  const renderContent = (blocks: any) => {
    if (!blocks || !Array.isArray(blocks)) return null;
    return blocks.map((block: any, i: number) => {
      if (block._type !== 'block' || !block.children) return null;
      const { style = 'normal', children, markDefs = [] } = block;

      const renderSpan = (span: any, j: number) => {
        let content: React.ReactNode = span.text;
        if (span.marks && span.marks.length > 0) {
          span.marks.forEach((mark: string) => {
            if (mark === 'strong') content = <strong key={j} className="font-bold text-white">{content}</strong>;
            if (mark === 'em') content = <em key={j} className="italic">{content}</em>;
            const linkDef = markDefs.find((def: any) => def._key === mark);
            if (linkDef && linkDef._type === 'link') {
              content = <a key={j} href={linkDef.href} target="_blank" rel="noopener" className="text-gold hover:underline">{content}</a>;
            }
          });
        }
        return <span key={j}>{content}</span>;
      };

      const content = children.map((span: any, j: number) => renderSpan(span, j));
      const classes = "text-white/80 leading-relaxed mb-6 font-light";
      
      if (style === 'h2') return <h2 key={i} className="text-3xl font-bold text-white mt-12 mb-6">{content}</h2>;
      if (style === 'h3') return <h3 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{content}</h3>;
      return <p key={i} className={classes}>{content}</p>;
    });
  };

  return (
    <main className="min-h-screen bg-[#070707] text-white pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Categorías y Tiempo de Lectura en cabecera */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          {post.categories?.map((cat: string) => (
            <span key={cat} className="px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] uppercase tracking-widest">
              {cat}
            </span>
          ))}
          <span className="text-[10px] text-white/40 uppercase tracking-widest flex items-center gap-2">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {readingTime} {language === 'es' ? 'min de lectura' : 'min read'}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-12">{displayTitle}</h1>

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

        {/* Etiquetas al final */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12 pt-8 border-t border-white/5">
            {post.tags.map((tag: string) => (
              <span key={tag} className="text-xs text-white/40 font-mono">#{tag.replace(/\s+/g, '')}</span>
            ))}
          </div>
        )}

        {/* Sección Compartir Premium */}
        <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 md:p-12 text-center">
          <h3 className="text-xs uppercase tracking-[0.4em] text-white/40 mb-10">
            {language === 'es' ? 'COMPARTIR ESTA NOTICIA' : 'SHARE THIS ARTICLE'}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { id: 'linkedin', label: 'LinkedIn' },
              { id: 'facebook', label: 'Facebook' },
              { id: 'twitter', label: 'Twitter' },
              { id: 'telegram', label: 'Telegram' },
              { id: 'threads', label: 'Threads' },
              { id: 'whatsapp', label: 'WhatsApp' },
              { id: 'email', label: 'Email' },
              { id: 'print', label: 'Print' },
              { id: 'link', label: 'Link' }
            ].map((social) => (
              <button
                key={social.id}
                onClick={() => handleShare(social.id)}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-white/[0.03] border border-white/10 hover:border-gold/40 hover:bg-gold/5 transition-all group"
                title={social.label}
              >
                <div className="text-white/40 group-hover:text-gold transition-colors">
                  <ShareIcon type={social.id} />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <Link href="/blog" className="px-8 py-4 rounded-full border border-gold/30 text-gold text-xs uppercase tracking-widest hover:bg-gold hover:text-black transition-all">
            {language === 'es' ? 'Explorar más noticias' : 'Explore more news'}
          </Link>
        </div>
      </div>
    </main>
  );
}
