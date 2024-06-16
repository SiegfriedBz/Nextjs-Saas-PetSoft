'use server'

import { checkAuth } from '@/server-utils/auth.server.utils'
import { getStripeCheckoutSession } from '@/services/stripe/getStripeCheckoutSession.service'
import Stripe from 'stripe'

/** Stripe */
export async function getStripeCheckoutAction() {
  try {
    // 1. Check if user is authenticated
    const session = await checkAuth()
    const userId = session?.user?.userId
    const userEmail = session?.user?.email

    if (!userId || !userEmail) {
      throw new Error('User not found')
    }

    // 2. Get Stripe Checkout Session from service
    const stripeSession = await getStripeCheckoutSession({
      userId,
      userEmail
    })

    const stripeSessionId: Stripe.Response<Stripe.Checkout.Session>['id'] =
      stripeSession?.id

    if (!stripeSessionId)
      throw new Error('Error getting Stripe Checkout Session')

    return stripeSessionId
  } catch (error) {
    console.log('Error in getStripeCheckoutAction:', error)
    const err = error as Error
    throw err
  }
}
