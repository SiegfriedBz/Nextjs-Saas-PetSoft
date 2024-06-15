'use client'

import Logo from '@/components/Logo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { getStripeCheckoutAction } from '@/server-actions/stripe/getStripeCheckoutAction.actions'
import { loadStripe } from '@stripe/stripe-js'
import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { useFormStatus } from 'react-dom'
import { toast } from 'sonner'

const Payment = () => {
  return (
    // Suspense needed for useSearchParams
    <Suspense fallback='Loading payment...'>
      <SuspensePayment />
    </Suspense>
  )
}

export default Payment

const SuspensePayment = () => {
  const searchParams = useSearchParams()
  const { data: session, update, status } = useSession()
  const router = useRouter()
  const successPayment = searchParams.get('success') === 'true'
  const canceledPayment = searchParams.get('canceled') === 'true'

  const action = async () => {
    try {
      toast.info('Loading Stripe checkout...')

      // 1. Get stripe session
      const stripeResponseId = await getStripeCheckoutAction()

      // Check if response is valid
      if (!stripeResponseId)
        throw new Error('Error getting Stripe Checkout Session')

      // Load Stripe (FE)
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      )

      // Check if Stripe is loaded
      if (!stripe) {
        throw new Error('Error loading Stripe')
      }

      /** 2. Redirect to Stripe Checkout => create check out form and Charge Credit card */
      toast.success('Redirecting to Stripe checkout...')
      const result = await stripe.redirectToCheckout({
        sessionId: stripeResponseId
      })

      if (result.error) {
        throw new Error(result.error.message)
      }
    } catch (error) {
      console.error('Error in Payment:', error)
      toast.error('Error processing payment, please try again')
    }
  }

  return (
    <div className='flex flex-col gap-y-4 justify-center items-center'>
      <Logo />
      <h1 className='text-3xl capitalize'>PetSoft access requires payment</h1>

      {successPayment ? (
        <>
          <Badge variant='default' className='text-base'>
            Payment successful! You can now access PetSoft.
          </Badge>
          <Button
            variant='primary'
            onClick={async () => {
              // Update session - refresh JWT to reflect DB changes (hasAccess: true)
              await update(true)

              // Redirect to dashboard
              router.push('/app/dashboard')
            }}
            disabled={status === 'loading' || session?.user.userHasAccess}
          >
            Access PetSoft
          </Button>
        </>
      ) : (
        <>
          <form action={action}>
            <CheckoutButton />
          </form>
          {canceledPayment && (
            <Badge variant='outline' className='mt-8 text-red-500 text-base'>
              Payment was canceled. You can try again.
            </Badge>
          )}
        </>
      )}
    </div>
  )
}

const CheckoutButton = () => {
  const { pending } = useFormStatus()

  return (
    <Button type='submit' disabled={pending} className='mt-10'>
      Buy life-time access for $299
    </Button>
  )
}
