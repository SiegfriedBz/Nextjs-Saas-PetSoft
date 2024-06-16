import Logo from '@/components/Logo'
import PaymentBody from '@/components/PaymentBody'
import { getStripeCheckoutAction } from '@/server-actions/stripe/getStripeCheckoutAction.actions'

const Payment = ({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) => {
  const successPayment = !!searchParams.success
  const canceledPayment = !!searchParams.canceled

  return (
    <div className='flex flex-col gap-y-4 justify-center items-center'>
      <Logo />
      <h1 className='max-sm:text-2xl sm:text-3xl capitalize text-center'>
        PetSoft access requires payment
      </h1>

      {/* Client-Component */}
      <PaymentBody
        successPayment={successPayment}
        canceledPayment={canceledPayment}
        getStripeCheckoutAction={getStripeCheckoutAction}
      />
    </div>
  )
}

export default Payment
