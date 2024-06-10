import AppFooter from '@/components/AppFooter'
import AppHeader from '@/components/AppHeader'
import BackgroundPattern from '@/components/BackgroundPattern'
import '@/styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PetSoft - App',
  description: 'Take care of people&apos;s pets responsibly with PetSoft.'
}

export default function AppLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <BackgroundPattern />
      <main className='container flex flex-col mx-auto min-h-[100svh]'>
        <AppHeader />
        <div className='pt-12 w-full max-w-5xl mx-auto'>{children}</div>
        <AppFooter />
      </main>
    </>
  )
}
