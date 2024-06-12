import Toaster from '@/context/ToastProvider'
import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'

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
        className={`text-base grid grid-rows-[1fr_max-content] text-zinc-900 bg-gradient-to-r from-zinc-200 to-zinc-50 ${josefinSans.className}`}
      >
        <main className='min-h-[100svh]'>{children}</main>
        <Toaster position='top-right' expand={false} richColors />
      </body>
    </html>
  )
}
