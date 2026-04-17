import Stripe from 'stripe'

// Función para obtener la instancia de Stripe de forma segura y perezosa
const getStripeInstance = () => {
  const stripeSecretKey = (process.env.STRIPE_SECRET_KEY || '') as string
  
  return new Stripe(stripeSecretKey, {
    // @ts-ignore
    apiVersion: '2023-10-16',
    typescript: true,
  })
}

// Exportamos un objeto que inicializa Stripe solo cuando se necesita
export const stripe = getStripeInstance()
