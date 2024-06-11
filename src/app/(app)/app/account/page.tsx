import ContentBlock from '@/components/ContentBlock'
import H1 from '@/components/H1'
import SignOutButton from '@/components/SignOutButton'
import Image from 'next/image'
import userDefaultImg from '@/app/user-default.jpg'

const Account = () => {
  // TODO fetch user data
  const user = { name: 'Jane Doe', image: '' }

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
            <div className='flex items-center gap-x-4'>
              <Image
                src={user?.image || userDefaultImg}
                alt='User Avatar'
                width={75}
                height={75}
              />
              <span>Logged in as {user?.name}</span>
            </div>

            <SignOutButton />
          </div>
        </ContentBlock>
      </section>
    </main>
  )
}

export default Account
