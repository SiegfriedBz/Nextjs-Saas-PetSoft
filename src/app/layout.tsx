import Toaster from '@/context/ToastProvider'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import SessionProvider from '@/context/SessionProvider'
const josefinSans = Josefin_Sans({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PetSoft - Pet DayCare Software',
  description: 'Take care of people&apos;s pets responsibly with PetSoft.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_URL,
    siteName: 'PetSoft - Pet DayCare Software',
    title: 'PetSoft - Pet DayCare Software',
    description: 'Take care of people&apos;s pets responsibly with PetSoft.',
    images: [
      {
        url: process.env.NEXT_PUBLIC_OG_IMAGE_URL as string,
        width: 1200,
        height: 630,
        alt: 'PetSoft - Pet DayCare Software'
      }
    ]
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`text-base grid grid-rows-[1fr] text-zinc-900 bg-gradient-to-r from-zinc-200 to-zinc-50 ${josefinSans.className}`}
      >
        <main className='min-h-[100svh]'>
          <SessionProvider>{children}</SessionProvider>
        </main>
        <Toaster position='top-right' expand={false} richColors closeButton />
        <Analytics />
      </body>
    </html>
  )
}
