import ContentBlock from '@/components/ContentBlock'
import H1 from '@/components/H1'
import SignOutButton from '@/components/SignOutButton'
import { checkAuth } from '@/server-utils/auth.server.utils'

const Account = async () => {
  // Authentication check
  const session = await checkAuth()
  const userName = session?.user?.name

  return (
    <main className='space-y-4'>
      <div className='flex justify-between items-center text-zinc-50'>
        <section>
          <H1>Your Account</H1>
        </section>
      </div>
      <section className='h-[68svh]'>
        <ContentBlock className='ring-1 ring-white overflow-hidden'>
          <div className='w-full h-full flex flex-col items-center justify-center gap-y-4'>
            <span>Logged in as {userName}</span>

            <SignOutButton />
          </div>
        </ContentBlock>
      </section>
    </main>
  )
}

export default Account
