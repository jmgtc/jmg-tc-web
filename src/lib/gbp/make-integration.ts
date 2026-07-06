import { SanityPost } from './transformer';

export interface MakeWebhookPayload {
  blog_title: string;
  text: string;
  image_url: string;
  platform: string;
  url: string;
  source: string;
  slug: string;
  published_at?: string;
  original_publish_date?: string;
  formatted_publish_date?: string;
  text_with_date?: string;
  text_original?: string;
  dry_run: boolean;
  media?: Array<{ mediaFormat: string, sourceUrl: string }>;
  media_items?: Array<{ mediaFormat: string, sourceUrl: string }>;
  call_to_action?: { actionType: string, url: string };
}

export async function sendToMakeGbpWebhook(payload: MakeWebhookPayload) {
  const webhookUrl = process.env.MAKE_GBP_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.log('[Make Integration] MAKE_GBP_WEBHOOK_URL no configurada; envío simulado', payload);
    return { success: true, status: 'dry_run', id: `mock_${Date.now()}` };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const safeUrl = webhookUrl.substring(0, 30) + '...';
    console.log(`[Make Integration] Enviando POST a Make webhook (${safeUrl})`);

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...payload,
        dry_run: false
      }),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Error en webhook de Make: ${response.status} ${response.statusText}`);
    }

    const textResponse = await response.text();
    console.log('[Make Integration] Respuesta de Make:', textResponse);

    return { success: true, status: 'sent', id: 'make_accepted' };
  } catch (error: any) {
    console.error('[Make Integration] Error enviando a Make:', error.message);
    return { success: false, status: 'failed', error: error.message };
  }
}
