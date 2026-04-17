import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  // 1. Obtener el secreto del webhook desde las variables de entorno
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    console.warn('⚠️ CLERK_WEBHOOK_SECRET is missing. Webhook verification will disabled.');
    return new Response('Webhook secret not configured', { status: 500 });
  }

  // 2. Obtener los headers de Svix para validación
  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  // Si no hay headers, error
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400,
    })
  }

  // 3. Obtener el cuerpo de la petición
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // 4. Crear una nueva instancia de Svix con el secreto
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // 5. Verificar la firma del webhook
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err)
    return new Response('Error occured', {
      status: 400,
    })
  }

  // 6. Procesar el evento
  const { id } = evt.data
  const eventType = evt.type

  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, first_name, last_name, image_url, email_addresses } = evt.data
    const email = email_addresses[0]?.email_address

    if (!email) {
      return new Response('Error: No email address found', { status: 400 })
    }

    // Sincronizar con la base de datos Neon (Prisma)
    await prisma.user.upsert({
      where: { clerkId: id },
      update: {
        email,
        name: `${first_name || ''} ${last_name || ''}`.trim(),
        image: image_url,
      },
      create: {
        clerkId: id,
        email,
        name: `${first_name || ''} ${last_name || ''}`.trim(),
        image: image_url,
      },
    })

    console.log(`User ${id} synchronized with Neon DB`)
  }

  if (eventType === 'user.deleted') {
    const { id } = evt.data
    if (id) {
      await prisma.user.delete({
        where: { clerkId: id },
      })
      console.log(`User ${id} deleted from Neon DB`)
    }
  }

  return new Response('', { status: 200 })
}
