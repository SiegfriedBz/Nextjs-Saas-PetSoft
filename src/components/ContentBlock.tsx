import { twMerge } from 'tailwind-merge'

type TProps = {
  children: React.ReactNode
  className?: string
}

const ContentBlock = ({ children, className }: TProps) => {
  return (
    <div
      className={twMerge(
        'h-full w-full bg-gradient-to-tr from-zinc-50 to-zinc-100 shadow-md shadow-zinc-200 rounded-md',
        className
      )}
    >
      {children}
    </div>
  )
}

export default ContentBlock
