'use client'

import Link from 'next/link'
import Logo from './Logo'
import { usePathname } from 'next/navigation'

const APP_HEADER_NAV_LINKS = [
  { label: 'Dashboard', href: '/app/dashboard' },
  { label: 'Account', href: '/app/account' }
]

const AppHeader = () => {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href

  return (
    <header className='flex h-[--app-header-h] items-center border-b border-b-white/30'>
      <Logo variant='small' />
      <nav className='ms-auto flex items-center'>
        <ul className='flex gap-x-8'>
          {APP_HEADER_NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                className={`px-4 py-2 rounded-sm text-zinc-50/80 hover:text-zinc-50 focus:text-zinc-50 ${
                  isActive(href) ? 'bg-zinc-900/10' : ''
                }   transition-colors duration-300`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default AppHeader
