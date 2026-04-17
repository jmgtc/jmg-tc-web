import { auth, currentUser } from '@clerk/nextjs/server'
import { stripe } from '@/lib/stripe'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId || !user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { serviceId, serviceName, price, mode = 'payment' } = await req.json()

    if (!price || !serviceName) {
      return new NextResponse('Missing parameters', { status: 400 })
    }

    const host = process.env.NEXT_PUBLIC_SITE_URL || req.headers.get('origin') || 'http://localhost:3000'

    // Crear la sesión de Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: serviceName,
              description: `Servicio técnico avanzado - JMG Tech Consulting`,
            },
            unit_amount: price, // En céntimos
          },
          quantity: 1,
        },
      ],
      mode: mode as any,
      success_url: `${host}/dashboard?success=true`,
      cancel_url: `${host}/servicios?canceled=true`,
      metadata: {
        userId: userId,
        serviceId: serviceId,
        serviceName: serviceName,
      },
      customer_email: user.emailAddresses[0].emailAddress,
    })

    return NextResponse.json({ url: session.url })
  } catch (error: any) {
    console.error('[STRIPE_CHECKOUT_ERROR]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
