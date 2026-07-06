/**
 * Google Business Profile - Content Transformer
 * 
 * Convierte un artículo de Sanity (PortableText) a un formato de texto plano
 * optimizado para Google Business Profile (Novedad).
 */

import { generateGbpSummary } from '../ai/gbp-generator';

export interface SanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  body: any[];
  mainImage?: any;
}

import { urlFor } from '../sanity';

export interface GBPPostDraft {
  summary: string;
  url: string;
  hasImage: boolean;
  featuredImageUrl?: string;
  status: string;
  generationSource: 'ai' | 'fallback';
  generationModel?: string;
  generationError?: string;
}

// Tipos mínimos para los bloques de Sanity
interface SanityBlock {
  _type: string;
  children?: { text: string }[];
  [key: string]: unknown;
}

/**
 * Extrae texto plano de un array de bloques Portable Text de Sanity.
 */
function extractPlainText(blocks: SanityBlock[]): string {
  if (!blocks || !Array.isArray(blocks)) return '';
  return blocks
    .filter(block => block._type === 'block' && block.children)
    .map(block => block.children!.map(child => child.text).join(''))
    .join('\n\n');
}

/**
 * Convierte un artículo del blog (formato Sanity) a un GoogleBusinessPost.
 * Delega la generación del resumen a GBP Generator.
 */
export async function blogArticleToGoogleBusinessPost(article: SanityPost, baseUrl: string = 'https://jmg-tc.com'): Promise<GBPPostDraft> {
  const plainText = extractPlainText(article.body as SanityBlock[]);
  
  // Delegamos la redacción a la nueva capa de IA (con su fallback interno)
  const result = await generateGbpSummary(article.title, plainText);
  
  const postUrl = `${baseUrl}/blog/${article.slug.current}`;

  let featuredImageUrl: string | undefined = undefined;
  if (article.mainImage) {
    try {
      featuredImageUrl = urlFor(article.mainImage).url();
    } catch (e) {
      console.warn(`[Transformer] Error extrayendo URL de imagen para ${article.slug.current}`, e);
    }
  }

  return {
    summary: result.text,
    url: postUrl,
    hasImage: !!article.mainImage,
    featuredImageUrl,
    status: 'draft',
    generationSource: result.source,
    generationModel: result.model,
    generationError: result.error,
  };
}
