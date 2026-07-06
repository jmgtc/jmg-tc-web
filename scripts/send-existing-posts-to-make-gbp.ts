// scripts/send-existing-posts-to-make-gbp.ts
// IMPORTANTE: Este script no está pensado para ser ejecutado automáticamente.
// Es una herramienta para poblar manualmente Google Business Profile a través de Make.
// Ejecución de prueba (dry-run): npx tsx scripts/send-existing-posts-to-make-gbp.ts --limit=1
// Ejecución real: npx tsx scripts/send-existing-posts-to-make-gbp.ts --limit=1 --send

import { PrismaClient } from '@prisma/client';
import { sendToMakeGbpWebhook, MakeWebhookPayload } from '../src/lib/gbp/make-integration';
import { client as sanityClient } from '../src/lib/sanity';

const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);
  const isSend = args.includes('--send');
  const limitArg = args.find(arg => arg.startsWith('--limit='));
  const slugArg = args.find(arg => arg.startsWith('--slug='));

  const limit = limitArg ? parseInt(limitArg.split('=')[1], 10) : 10;
  const targetSlug = slugArg ? slugArg.split('=')[1] : null;

  console.log(`\n=== BACKFILL A MAKE GBP ===`);
  console.log(`Modo: ${isSend ? 'REAL (Enviando POST)' : 'DRY-RUN (Simulación)'}`);
  console.log(`Límite: ${limit}`);
  if (targetSlug) console.log(`Filtro Slug: ${targetSlug}`);

  const whereClause: any = {
    OR: [
      { makeStatus: { not: 'sent' } },
      { makeStatus: null }
    ]
  };
  let posts: any[] = [];
  let isMigrationPending = false;

  try {
    posts = await prisma.googleBusinessPost.findMany({
      where: whereClause,
      // No take/limit yet, we will sort in memory
    });
  } catch (error: any) {
    if (error.code === 'P2022') {
      console.warn(`[AVISO] Estado Make pendiente de migración; dry-run permitido; envío real bloqueado por seguridad.`);
      isMigrationPending = true;
      
      const fallbackWhere = targetSlug ? { slug: targetSlug } : {};
      posts = await prisma.googleBusinessPost.findMany({
        where: fallbackWhere,
        select: {
          id: true,
          title: true,
          slug: true,
          url: true,
          featuredImageUrl: true,
          generatedText: true,
          createdAt: true,
        }
      });
    } else {
      throw error;
    }
  }

  // Fetch Sanity dates and sort
  console.log("Obteniendo fechas reales de Sanity para ordenar...");
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    let sanityPublishDate: string | null = null;
    try {
      const sanityPost = await sanityClient.fetch(`*[_type == "post" && slug.current == $slug][0]{ publishedAt, _createdAt }`, { slug: post.slug });
      if (sanityPost) {
        sanityPublishDate = sanityPost.publishedAt || sanityPost._createdAt;
      }
    } catch (e) {
      console.warn(`[AVISO] No se pudo obtener la fecha de Sanity para ${post.slug}`, e);
    }
    post.realPublishDate = sanityPublishDate || post.createdAt.toISOString();
  }

  // Sort ascending by real date
  posts.sort((a, b) => new Date(a.realPublishDate).getTime() - new Date(b.realPublishDate).getTime());

  // Apply limit
  posts = posts.slice(0, limit);

  console.log(`Encontrados ${posts.length} posts pendientes de envío a Make.\n`);

  for (const post of posts) {
    console.log(`Procesando: [${post.slug}] - ${post.title}`);

    const publishedAt = post.realPublishDate;
    let formattedPublishDate = "";
    try {
      const d = new Date(publishedAt);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      formattedPublishDate = `${day}/${month}/${year}`;
    } catch (e) {
      console.warn("Date formatting error", e);
    }
    
    const baseText = post.generatedText || '';
    const text_with_date = formattedPublishDate 
      ? `📅 ${formattedPublishDate}\n\n${baseText}`
      : baseText;

    const makePayload: MakeWebhookPayload = {
      blog_title: post.title,
      text: text_with_date, // Enviar texto con fecha por compatibilidad con Make
      text_with_date: text_with_date,
      text_original: baseText,
      formatted_publish_date: formattedPublishDate,
      original_publish_date: publishedAt,
      image_url: post.featuredImageUrl || '',
      platform: "Google Business Profile",
      url: post.url,
      source: "sanity",
      slug: post.slug,
      published_at: publishedAt,
      dry_run: !isSend || isMigrationPending
    };

    if (post.featuredImageUrl) {
      const mediaItem = { mediaFormat: 'PHOTO', sourceUrl: post.featuredImageUrl };
      makePayload.media = [mediaItem];
      makePayload.media_items = [mediaItem];
    } else {
      makePayload.media = [];
      makePayload.media_items = [];
    }

    makePayload.call_to_action = {
      actionType: 'LEARN_MORE',
      url: post.url
    };

    if (isSend && !isMigrationPending) {
      console.log(`  -> Enviando a Make...`);
      const result = await sendToMakeGbpWebhook(makePayload);
      
      if (result.success) {
        await prisma.googleBusinessPost.update({
          where: { id: post.id },
          data: {
            makeStatus: result.status,
            makeWebhookSentAt: new Date(),
            lastMakeError: null,
            gbpStatus: 'pending_review'
          }
        });
        console.log(`  [ÉXITO] Marcado como 'sent' en DB.`);
      } else {
        await prisma.googleBusinessPost.update({
          where: { id: post.id },
          data: {
            makeStatus: result.status,
            lastMakeError: result.error,
          }
        });
        console.log(`  [ERROR] Falló el envío: ${result.error}`);
      }
    } else {
      if (isSend && isMigrationPending) {
        console.log(`  [BLOQUEADO] Envío real cancelado por falta de migración.`);
      }
      console.log(`  [DRY-RUN] Payload preparado:`);
      console.log(JSON.stringify(makePayload, null, 2));
    }
  }

  console.log(`\n=== FIN DEL BACKFILL ===\n`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
