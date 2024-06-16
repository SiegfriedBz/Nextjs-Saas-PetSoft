'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { loadStripe } from '@stripe/stripe-js'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

type TProps = {
  successPayment: boolean
  canceledPayment: boolean
  getStripeCheckoutAction: () => Promise<string | null>
}
const PaymentBody = ({
  successPayment,
  canceledPayment,
  getStripeCheckoutAction
}: TProps) => {
  const [isPending, startTransition] = useTransition()
  const { data: session, update, status } = useSession()
  const router = useRouter()

  const action = async () => {
    console.log('Payment action')
    try {
      toast.info('Loading Stripe checkout...')
      console.log(
        'process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:',
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      )
      // Load Stripe (FE)
      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      )
      // 1. Get stripe session
      const stripeResponseId = await getStripeCheckoutAction()

      // Check if response is valid
      if (!stripeResponseId)
        throw new Error('Error getting Stripe Checkout Session')

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
    <>
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
          <Button
            disabled={isPending}
            onClick={async () => {
              startTransition(async () => {
                await action()
              })
            }}
            className='mt-10'
          >
            Buy life-time access for $299
          </Button>

          {canceledPayment && (
            <Badge variant='outline' className='mt-8 text-red-500 text-base'>
              Payment was canceled. You can try again.
            </Badge>
          )}
        </>
      )}
    </>
  )
}

export default PaymentBody
