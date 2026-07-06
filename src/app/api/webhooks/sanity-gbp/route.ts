import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { blogArticleToGoogleBusinessPost, SanityPost } from '@/lib/gbp/transformer';
import { sendToMakeGbpWebhook, MakeWebhookPayload } from '@/lib/gbp/make-integration';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // 1. Ignorar si no es un post
    if (body._type !== 'post') {
      return NextResponse.json({ message: 'Ignorando documento que no es post' });
    }

    // 2. Ignorar si la bandera viene explícitamente en false (Opt-out)
    // - Creado en Sanity: toggle por defecto a ON (true).
    // - Creado por app/API externa: se publicará si no manda el campo (undefined) o null.
    // - Para impedir publicación desde la app/API, enviar explícitamente: publishToGoogleBusiness: false
    if (body.publishToGoogleBusiness === false) {
      return NextResponse.json({ message: 'El post tiene publishToGoogleBusiness explícitamente desactivado. Saltando.' });
    }

    const post: SanityPost = {
      _id: body._id,
      title: body.title,
      slug: body.slug,
      body: body.body,
      mainImage: body.mainImage,
    };

    if (!post.slug?.current) {
      return NextResponse.json({ message: 'No se encontró slug. Saltando.' }, { status: 400 });
    }

    // CONTROL ANTI-DUPLICADOS Y ESTADO DE MIGRACIÓN
    let isMigrationPending = false;
    let existingRecord;
    
    try {
      existingRecord = await prisma.googleBusinessPost.findUnique({
        where: { articleId: post._id }
      });

      if (existingRecord?.makeStatus === 'sent') {
        console.log(`[GBP Webhook] El post ${post.slug.current} ya fue enviado a Make anteriormente.`);
        return NextResponse.json({ message: 'Post ya enviado a Make. Saltando para evitar duplicados.' });
      }
    } catch (error: any) {
      if (error.code === 'P2022') {
        console.warn(`[AVISO] Estado Make pendiente de migración; dry-run permitido; envío real bloqueado por seguridad.`);
        isMigrationPending = true;
      } else {
        throw error;
      }
    }

    // 3. Transformar contenido
    const draft = await blogArticleToGoogleBusinessPost(post);

    const publishedAt = body.publishedAt || new Date().toISOString();
    let formattedPublishDate = "";
    try {
      const d = new Date(publishedAt);
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      formattedPublishDate = `${day}/${month}/${year}`;
    } catch (e) {
      console.warn("Date formatting error in webhook", e);
    }

    const baseText = draft.summary;
    const text_with_date = formattedPublishDate 
      ? `📅 ${formattedPublishDate}\n\n${baseText}`
      : baseText;

    // 4. Preparar payload para Make
    const makePayload: MakeWebhookPayload = {
      blog_title: post.title,
      text: text_with_date,
      text_with_date: text_with_date,
      text_original: baseText,
      formatted_publish_date: formattedPublishDate,
      original_publish_date: publishedAt,
      image_url: draft.featuredImageUrl || '',
      platform: "Google Business Profile",
      url: draft.url,
      source: "sanity",
      slug: post.slug.current,
      published_at: publishedAt,
      dry_run: true // Se sobreescribe en sendToMakeGbpWebhook si hay URL real
    };

    if (draft.featuredImageUrl) {
      const mediaItem = { mediaFormat: 'PHOTO', sourceUrl: draft.featuredImageUrl };
      makePayload.media = [mediaItem];
      makePayload.media_items = [mediaItem];
    } else {
      makePayload.media = [];
      makePayload.media_items = [];
    }

    makePayload.call_to_action = {
      actionType: 'LEARN_MORE',
      url: draft.url
    };

    // 5. Enviar a Make (o dry-run si no hay variable de entorno o falta migración)
    if (isMigrationPending) {
      console.log(`[GBP Webhook] Bloqueando envío real por falta de migración en DB.`);
      makePayload.dry_run = true;
    }
    
    let makeResult;
    if (isMigrationPending) {
      makeResult = { success: true, status: 'dry_run_blocked_by_migration', id: `mock_${Date.now()}` };
    } else {
      makeResult = await sendToMakeGbpWebhook(makePayload);
    }

    // 6. Guardar/Actualizar estado en Prisma
    let savedRecord;
    try {
      savedRecord = await prisma.googleBusinessPost.upsert({
        where: { articleId: post._id },
        update: {
          title: post.title,
          slug: post.slug.current,
          url: draft.url,
          featuredImage: post.mainImage?.asset?._ref || null,
          generatedText: draft.summary,
          gbpStatus: makeResult.status === 'sent' ? 'pending_review' : 'draft', 
          makeStatus: makeResult.status,
          makeWebhookSentAt: makeResult.status === 'sent' ? new Date() : null,
          lastMakeError: makeResult.error || null,
        },
        create: {
          articleId: post._id,
          slug: post.slug.current,
          title: post.title,
          url: draft.url,
          featuredImage: post.mainImage?.asset?._ref || null,
          generatedText: draft.summary,
          gbpStatus: makeResult.status === 'sent' ? 'pending_review' : 'draft',
          makeStatus: makeResult.status,
          makeWebhookSentAt: makeResult.status === 'sent' ? new Date() : null,
          lastMakeError: makeResult.error || null,
        }
      });
    } catch (error: any) {
      if (error.code === 'P2022') {
         // Fallback guardando solo campos existentes
         savedRecord = await prisma.googleBusinessPost.upsert({
            where: { articleId: post._id },
            update: {
              title: post.title,
              slug: post.slug.current,
              url: draft.url,
              featuredImage: post.mainImage?.asset?._ref || null,
              generatedText: draft.summary,
            },
            create: {
              articleId: post._id,
              slug: post.slug.current,
              title: post.title,
              url: draft.url,
              featuredImage: post.mainImage?.asset?._ref || null,
              generatedText: draft.summary,
            }
         });
         console.warn(`[GBP Webhook] Registro parcial actualizado. Las columnas de Make no se actualizaron.`);
      } else {
         throw error;
      }
    }

    return NextResponse.json({ success: true, record: savedRecord, makeResult });

  } catch (error: any) {
    console.error('[GBP Webhook] Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
