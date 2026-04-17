import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  // Importación dinámica interna para evitar fallos de build
  const { default: prisma } = await import('@/lib/prisma')
  const { getStripeServer } = await import('@/lib/stripe')
  
  const body = await req.text()
  const headerPayload = await headers()
  const signature = headerPayload.get('stripe-signature') as string

  const stripe = getStripeServer()
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!webhookSecret || !signature) {
    console.warn('⚠️ STRIPE_WEBHOOK_SECRET or signature is missing.');
    return new NextResponse('Webhook error', { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error(`❌ Error verifying Stripe webhook: ${err.message}`)
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }

  // Manejar el evento de Checkout completado
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    
    const userId = session.metadata?.userId
    const planName = session.metadata?.planName

    if (userId && planName) {
      // Actualizar el plan del usuario en la base de datos
      await prisma.user.update({
        where: { clerkId: userId },
        data: { 
          plan: planName,
          // Guardamos el ID de cliente de Stripe para futuras gestiones
          stripeCustomerId: session.customer as string
        },
      })
      console.log(`✅ Plan ${planName} activado para el usuario ${userId}`)
    }
  }

  return new NextResponse('Success', { status: 200 })
}
