import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const redirectToStripeCheckout = async (sessionId: string) => {
  // const result = await stripe.redirectToCheckout({
  //   sessionId
  // })
}

export default redirectToStripeCheckout
