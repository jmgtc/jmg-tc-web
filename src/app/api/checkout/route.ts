import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { planId, planName, price } = await req.json()

    // Importar dinámicamente el SDK de Stripe servidor
    const { getStripeServer } = await import('@/lib/stripe')
    const stripe = getStripeServer()

    // En un entorno de producción real, aquí obtendríamos el priceId de Stripe
    // Para la demo, creamos una sesión genérica
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Plan ${planName}`,
              description: `Suscripción al plan ${planName} de JMG Tech Consulting`,
            },
            unit_amount: price * 100, // Stripe usa centavos
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/dashboard?status=success`,
      cancel_url: `${req.headers.get('origin')}/prices?status=cancel`,
      metadata: {
        userId: userId,
        planName: planName,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('Error in checkout session creation:', error)
    return new NextResponse(error.message || 'Internal Server Error', { status: 500 })
  }
}
