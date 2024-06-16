import AppFooter from '@/components/AppFooter'
import BackgroundPattern from '@/components/BackgroundPattern'
import ContentBlock from '@/components/ContentBlock'
import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PetSoft - Login',
  description: 'Take care of people&apos;s pets responsibly with PetSoft.'
}

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {/* Server-Component */}
      <BackgroundPattern />
      <main className='sm:container max-sm:px-2 flex flex-col mx-auto min-h-[100svh]'>
        <div className='mt-8 w-full h-full max-w-5xl mx-auto'>
          <div
            className={`flex h-full py-4 flex-col justify-center items-center`}
          >
            {children}
          </div>
        </div>
      </main>
    </>
  )
}
