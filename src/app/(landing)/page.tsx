import Image from 'next/image'
import landingImg from '../../../public/landing-img.png'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='bg-gradient-to-tr from-emerald-600 to-emerald-400 h-full place-content-center'>
      <div className='container mx-auto flex max-xl:flex-col xl:flex-row items-center justify-center max-xl:gap-y-4 xl:gap-x-16'>
        <div className='flex space-x-4 items-center'>
          <Logo className='xl:hidden' variant='small' />
          <h1 className='xl:hidden relative max-w-xl text-center tracking-wide max-sm:text-2xl sm:text-3xl'>
            <span>
              Manage your <span className='font-extra-bold'>Pet Daycare</span>
            </span>
            <br />
            <span> with ease.</span>
          </h1>
        </div>

        <div className='relative aspect-square max-xl:h-96 xl:h-[32rem] rounded-xl overflow-hidden shadow-md shadow-zinc-500 hover:shadow-lg hover:shadow-zinc-500'>
          <Image
            src={landingImg}
            fill
            alt='landing-page-image'
            className='object-cover'
          />
        </div>

        <div className='flex flex-col justify-start items-center max-w-lg gap-y-4'>
          <Logo className='max-xl:hidden self-start' />
          <h1 className='max-xl:hidden text-left w-full tracking-wide text-4xl'>
            <span className='whitespace-nowrap'>
              Manage your <span className='font-extra-bold'>Pet Daycare</span>
            </span>
            <br />
            <span className='whitespace-nowrap'> with ease.</span>
          </h1>
          <p className='max-xl:text-xl xl:text-2xl font-medium max-xl:mt-4 max-xl:text-center'>
            Use PetSoft to easily keep track of pets under your care. Get
            lifetime access for $299.
          </p>

          <div className='mt-12 space-x-4 self-start'>
            <Button asChild size='lg'>
              <Link href='/signup'>Get started</Link>
            </Button>
            <Button asChild variant='secondary' size='lg'>
              <Link href='/login'>Sign in</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
