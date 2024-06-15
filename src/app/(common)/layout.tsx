import AppFooter from '@/components/AppFooter'
import BackgroundPattern from '@/components/BackgroundPattern'
import ContentBlock from '@/components/ContentBlock'
import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PetSoft - Login',
  description: 'Take care of people&apos;s pets responsibly with PetSoft.'
}

export default function AppLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      {/* Server-Component */}
      <BackgroundPattern />
      <main className='container flex flex-col mx-auto min-h-[100svh]'>
        <div className='mt-16 w-full h-fit max-w-5xl mx-auto'>
          <main className='h-[80svh]'>
            <ContentBlock
              className={`flex flex-col justify-center items-center`}
            >
              {children}
            </ContentBlock>
          </main>
        </div>
        {/* Server-Component */}
        <AppFooter />
      </main>
    </>
  )
}
