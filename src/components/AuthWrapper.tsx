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
    <main className='h-[80svh]'>
      <ContentBlock className={`flex flex-col justify-center items-center`}>
        <ContentBlock
          className={`mx-auto max-w-md flex justify-center items-center bg-gradient-to-tr from-zinc-100 to-zinc-200
          ${isLogin ? 'h-[27rem]' : 'h-[36rem]'}`}
        >
          <ContentBlock
            className={`my-4 mx-2 flex flex-col py-4 gap-y-2 justify-center items-center
            ${isLogin ? 'h-[26rem]' : 'h-[35rem]'}`}
          >
            <div className='flex flex-col gap-y-2 justify-center items-center'>
              <Logo />
              <h1 className='text-3xl capitalize'>{actionType}</h1>
            </div>
            <div className='flex w-full flex-col gap-y-2 justify-center items-center'>
              <AuthForm actionType={actionType} />
              <span className='flex items-base'>
                {linkMessage}
                <Link href={linkHref} className='ms-2'>
                  Please <span className='capitalize'>{linkLabel}</span>
                </Link>
              </span>
            </div>
          </ContentBlock>
        </ContentBlock>
      </ContentBlock>
    </main>
  )
}

export default AuthWrapper
