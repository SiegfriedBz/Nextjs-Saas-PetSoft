import Link from 'next/link'
import Logo from './Logo'

const APP_FOOTER_NAV_LINKS = [
  { label: 'Dashboard', href: '/app/dashboard' },
  { label: 'Account', href: '/app/account' }
]

const year = new Date().getFullYear()

const AppFooter = () => {
  return (
    <footer className='h-[var(--app-footer-h)] mt-auto flex items-center'>
      <Logo variant='small' />
      <span className='ms-4'>&copy;{year} PetSoft All Rights Reserved.</span>
      <nav className='ms-auto flex items-center space-x-4'>
        <ul className='flex gap-x-4'>
          {APP_FOOTER_NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  )
}

export default AppFooter
