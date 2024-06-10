import Branding from '@/components/Branding'

const Account = () => {
  return (
    <main className='space-y-4'>
      <div className='flex justify-between items-center text-zinc-50'>
        <Branding />
        <section className='text-center'>
          <p className='text-2xl font-bold leading-6'>Your Account</p>
        </section>
      </div>
    </main>
  )
}

export default Account
