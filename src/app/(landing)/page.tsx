import Image from 'next/image'
import landingImg from '../../../public/landing-hero-img.png'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='py-2 w-full h-100svh bg-gradient-to-tr from-emerald-600 to-emerald-400 h-full place-content-center'>
      <div className='flex max-md:flex-col md:flex-row items-center justify-center md:gap-x-8 lg:gap-x-16'>
        <div className='md:hidden flex items-center'>
          <h1 className='relative max-md:max-w-[300px] md:max-w-xl text-center tracking-wider max-md:text-[2rem] leading-10 md:text-8xl'>
            <Logo
              variant='responsive'
              className='absolute 
                max-[388px]:left-8
                max-[388px]:top-[0.15rem] 
                max-md:-top-[0.15rem]
                max-md:left-5
                self-start'
            />
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

        <div className='ring-2 max-md:mt-4 ring-zinc-50 relative max-md:mb-2 aspect-square max-sm:h-[18.25rem] sm:h-[20rem] lg:h-[24rem] xl:h-[32rem] rounded-xl overflow-hidden shadow-md shadow-zinc-500 hover:shadow-md hover:shadow-zinc-600'>
          <Image
            src={landingImg}
            fill
            placeholder='blur'
            alt='landing-page-image'
            className='object-cover'
          />
        </div>

        <div className='flex md:w-1/2 flex-col justify-start items-center md:gap-y-4 lg:gap-y-8'>
          <Logo className='max-md:hidden md:self-start md:-ms-1' />
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
          <p className='self-start max-sm:max-w-[300px] max-md:max-w-sm md:max-w-xl max-sm:text-lg max-lg:text-xl md:-mt-2 md:mb-4 lg:text-2xl font-medium max-md:text-center md:text-left w-full max-md:py-2'>
            Use <span className='text-zinc-50'>PetSoft</span>
            <span> to easily keep track of pets under your care.</span>
            <span className='ml-2'>
              Get <span className='text-zinc-50/90'>lifetime access</span> for
              $299.
            </span>
          </p>

          <div className='max-sm:max-w-[300px] sm:max-w-2xl md:max-w-xl sm:space-x-4 w-full max-md:flex max-sm:justify-between max-md:justify-around md:self-start'>
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
