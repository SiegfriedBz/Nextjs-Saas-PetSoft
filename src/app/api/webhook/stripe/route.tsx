import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextRequest } from 'next/server'
import { updateUser } from '@/services/user/updateUser.service'
import { revalidatePath } from 'next/cache'

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = headers().get('stripe-signature') as string

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (error) {
    console.log(`Webhook error: `, error)
    return new Response(`Webhook error: ${error}`, {
      status: 400
    })
  }

  if (event.type === 'checkout.session.completed') {
    console.log('=== Webhook -> checkout.session.completed ===')

    const checkoutSessionCompleted = event.data.object
    const userId = checkoutSessionCompleted.client_reference_id

    if (!userId) {
      console.log('Webhook error: userId not found')
      return new Response(`Webhook error: userId not found`, {
        status: 400
      })
    }

    // update user with service
    await updateUser({
      id: userId,
      hasAccess: true
    })

    // TODO TODO???
    revalidatePath('/payment')
  }

  // Return a 200 response to Stripe to acknowledge receipt of the event
  return new Response('RESPONSE EXECUTE', {
    status: 200
  })
}
