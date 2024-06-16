import Link from 'next/link'
import AuthForm from './AuthForm'
import ContentBlock from './ContentBlock'
import Logo from './Logo'

type TProps = {
  actionType: 'login' | 'signup'
}
const AuthWrapper = ({ actionType }: TProps) => {
  const isLogin = actionType === 'login'
  const linkMessage = isLogin
    ? `Don't have an account yet ?`
    : 'Already have an account ?'
  const linkHref = isLogin ? '/signup' : '/login'
  const linkLabel = isLogin ? 'Signup' : 'Login'

  return (
    <ContentBlock
      className={`mx-auto w-full max-w-lg flex justify-center items-center bg-gradient-to-tr from-zinc-100 to-zinc-200
          ${isLogin ? 'h-[27rem]' : 'h-[36rem]'}`}
    >
      <ContentBlock
        className={`my-4 sm:mx-2 flex flex-col py-2 gap-y-2 justify-center items-center
            ${isLogin ? 'h-[26rem]' : 'h-[35rem]'}`}
      >
        <div className='flex flex-col gap-y-2 justify-center items-center'>
          <Logo />
          <h1 className='max-sm:text-2xl sm:text-3xl capitalize'>
            {actionType}
          </h1>
        </div>
        <div className='flex w-full flex-col gap-y-2 justify-center items-center'>
          <AuthForm actionType={actionType} />
          <span className='flex max-sm:flex-col max-sm:items-center items-base'>
            <span>{linkMessage}</span>
            <Link href={linkHref} className='sm:ms-2'>
              Please <span className='capitalize'>{linkLabel}</span>
            </Link>
          </span>
        </div>
      </ContentBlock>
    </ContentBlock>
  )
}

export default AuthWrapper
