type TProps = {
  children: React.ReactNode
}

const ContentBlock = ({ children }: TProps) => {
  return (
    <div className='h-full w-full bg-gradient-to-tr from-zinc-50 to-zinc-100 shadow-md shadow-zinc-200 rounded-md'>
      {children}
    </div>
  )
}

export default ContentBlock
