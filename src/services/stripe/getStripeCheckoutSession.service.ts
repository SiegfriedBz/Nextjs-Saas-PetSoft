import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

type TProps = {
  userEmail: string
  userId: string
}
export const getStripeCheckoutSession = async ({
  userEmail,
  userId
}: TProps) => {
  const CANONICAL_URL = process.env.CANONICAL_URL

  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${CANONICAL_URL}/payment?success=true`,
    cancel_url: `${CANONICAL_URL}/payment?canceled=true`,
    customer_email: userEmail,
    client_reference_id: userId,
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Access to PetSoft`,
            description: `Lifetime access to PetSoft
            👋 👉 Card: 4242 4242 4242 4242 - 04/32 - 424`
            // works only with live hosted imgs
            // images: [image]
          },
          unit_amount: 299 * 100 // CENTS
        },
        quantity: 1
      }
    ]
  })

  return stripeSession
}
