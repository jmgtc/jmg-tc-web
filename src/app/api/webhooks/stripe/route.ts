import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = (await headers()).get('Stripe-Signature') as string

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error: any) {
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 })
  }

  const session = event.data.object as any

  // Manejar el éxito del pago
  if (event.type === 'checkout.session.completed') {
    // 1. Obtener el ID de usuario y detalles desde la metadata
    const clerkId = session.metadata.userId
    const serviceName = session.metadata.serviceName
    const serviceId = session.metadata.serviceId

    if (!clerkId) {
      return new NextResponse('Clerk User ID not found in metadata', { status: 400 })
    }

    // Buscar el usuario interno por su clerkId para obtener el ID real de Prisma
    const internalUser = await prisma.user.findUnique({
      where: { clerkId }
    })

    if (!internalUser) {
      console.error(`Local user not found for clerkId: ${clerkId}`)
      return new NextResponse('Local user not found', { status: 404 })
    }

    // 2. Crear el registro del pedido en Neon usando el ID interno de Prisma
    await prisma.order.create({
      data: {
        userId: internalUser.id,
        stripeSessionId: session.id,
        amount: session.amount_total,
        currency: session.currency,
        status: 'completed',
        serviceName: serviceName || 'Servicio Técnico',
        serviceId: serviceId || 'generic',
      },
    })
    
    console.log(`Order created for local user ${internalUser.id} (Clerk: ${clerkId})`)
  }

  // Manejar suscripciones
  if (event.type === 'customer.subscription.created' || event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as any
    // Lógica similar para suscripciones...
  }

  return new NextResponse(null, { status: 200 })
}
