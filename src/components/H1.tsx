import { twMerge } from 'tailwind-merge'

type TProps = {
  className?: string
  children: React.ReactNode
}
const H1 = ({ className, children }: TProps) => {
  return (
    <h1 className={twMerge('font-medium text-2xl leading-6', className)}>
      {children}
    </h1>
  )
}

export default H1
