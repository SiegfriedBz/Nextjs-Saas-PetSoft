import type { Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'
import '@/styles/globals.css'
import Footer from '@/components/Footer'

const josefinSans = Josefin_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PetSoft - Pet DayCare Software',
  description: 'Take care of people&apos;s pets responsibly with PetSoft.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`text-base text-zinc-900 bg-gradient-to-r from-zinc-200 to-zinc-50 ${josefinSans.className}`}
      >
        <Footer />
        <main className='min-h-[100svh]'> {children}</main>
        <Footer />
      </body>
    </html>
  )
}
