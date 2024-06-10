import Image from 'next/image'
import Link from 'next/link'
import logoImg from '../../public/logo.svg'

type TLogoProps = {
  className?: string
  variant?: 'default' | 'small'
}

const Logo = ({ className = '', variant = 'default' }: TLogoProps) => {
  return (
    <Link href='/' className={`${className}`}>
      <Image
        src={logoImg}
        alt='logo'
        className={variant === 'default' ? 'h-16 w-16' : 'h-8 w-8'}
      />
    </Link>
  )
}

export default Logo
