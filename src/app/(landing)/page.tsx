import Image from 'next/image'
import landingImg from '../../../public/landing-hero-img.png'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='w-full min-h-100svh bg-gradient-to-tr from-emerald-600 to-emerald-400 h-full place-content-center'>
      <div className='flex max-md:flex-col md:flex-row items-center justify-center md:gap-x-8 lg:gap-x-16'>
        <div className='md:hidden flex flex-col gap-y-2 items-center'>
          <Logo
            className='self-start max-md:pt-4 max-md:pb-2'
            variant='small'
          />
          <h1 className='max-w-xl text-center tracking-wide max-sm:text-2xl sm:text-3xl'>
            <span>
              Manage your
              <span className='ms-2 font-extra-bold text-zinc-50 whitespace-nowrap'>
                Pet Daycare
              </span>
            </span>
            <br />
            <span>
              with{' '}
              <span className='font-extra-bold text-zinc-50/90'>ease.</span>
            </span>
          </h1>
        </div>

        <div className='relative max-md:my-4 aspect-square max-sm:h-[19rem] sm:h-[20rem] lg:h-[24rem] xl:h-[32rem] rounded-xl overflow-hidden shadow-md shadow-zinc-500 hover:shadow-lg hover:shadow-zinc-500'>
          <Image
            src={landingImg}
            fill
            placeholder='blur'
            alt='landing-page-image'
            className='object-cover'
          />
        </div>

        <div className='flex md:w-1/2 flex-col justify-start items-center md:gap-y-4 lg:gap-y-8'>
          <Logo className='max-md:hidden md:self-start md:-ms-1 -mb-2' />
          <h1 className='max-md:hidden text-left w-full tracking-wide text-4xl'>
            <span className='lg:whitespace-nowrap'>
              Manage your{' '}
              <span className='font-extra-bold text-zinc-50/90'>
                Pet Daycare
              </span>
            </span>
            <br />
            <span className='whitespace-nowrap'>
              with
              <span className='font-extra-bold text-zinc-50/90'> ease.</span>
            </span>
          </h1>
          <p className='max-sm:text-lg max-lg:text-xl max-md:mt-2 lg:text-2xl font-medium max-md:text-center md:text-left'>
            Use PetSoft to easily keep track of pets under your care.
            <span className='max-md:ms-2 md:inline-block'>
              Get lifetime access for $299.
            </span>
          </p>

          <div className='sm:space-x-4 max-md:w-11/12 max-md:flex max-sm:justify-between max-md:justify-around max-md:mt-4 md:self-start'>
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
