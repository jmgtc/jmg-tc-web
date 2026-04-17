import Stripe from 'stripe'

// Inicialización resiliente de Stripe
const stripeSecretKey = (process.env.STRIPE_SECRET_KEY || '') as string

if (!stripeSecretKey && process.env.NODE_ENV === 'production') {
  console.warn('⚠️ STRIPE_SECRET_KEY no está configurada en producción.')
}

// Forzamos la inicialización incluso si la clave está vacía para que el build no se detenga
export const stripe = new Stripe(stripeSecretKey, {
  // @ts-ignore - Forzamos versión compatible o dejamos que use la por defecto del SDK
  apiVersion: '2023-10-16', 
  typescript: true,
})
