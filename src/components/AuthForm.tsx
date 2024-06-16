'use client'

import FormError from '@/components/FormError'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import userLoginAction from '@/server-actions/auth/userLoginAction'
import userSignupAction from '@/server-actions/auth/userSignupAction'
import {
  loginZodSchema,
  signupZodSchema,
  type TLoginInput,
  type TSignupInput
} from '@/zod/auth.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useFormStatus } from 'react-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

type TProps = {
  actionType: 'login' | 'signup'
}

const AuthForm = ({ actionType }: TProps) => {
  const isLoginForm = actionType === 'login'
  const zodSchema = isLoginForm ? loginZodSchema : signupZodSchema
  type TInput = TLoginInput | TSignupInput

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TInput>({
    resolver: zodResolver(zodSchema)
  })

  const action: () => void = handleSubmit(async (data) => {
    try {
      toast.info(`${isLoginForm ? 'Logging in...' : 'Signing up...'}`)
      isLoginForm
        ? await userLoginAction(data as TLoginInput)
        : await userSignupAction(data as TSignupInput)
      toast.success(`${isLoginForm ? 'Logged in' : 'Signed up'} successfully`)
    } catch (error) {
      const err = error as Error
      return toast.error(`Failed to ${actionType} - ${err.message}.`)
    }
  })

  return (
    <form action={action} className='space-y-4 w-full max-md:px-4 md:px-12'>
      <div className='space-y-2 '>
        {!isLoginForm && (
          <div>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              type='name'
              {...register('name')}
              placeholder='Anna Doe'
            />
            <FormError
              className='-mb-1'
              error={
                isLoginForm
                  ? undefined
                  : 'name' in errors
                  ? errors.name
                  : undefined
              }
            />
          </div>
        )}

        <div>
          <Label htmlFor='email'>Email</Label>
          <Input
            id='email'
            type='email'
            {...register('email')}
            placeholder='anna@petsoft.com'
          />
          <FormError className='-mb-1' error={errors.email} />
        </div>

        <div>
          <Label htmlFor='password'>Password</Label>
          <Input
            id='password'
            type='password'
            {...register('password')}
            placeholder='123456'
          />
          <FormError className='-mb-1' error={errors.password} />
        </div>

        {!isLoginForm && (
          <div>
            <Label htmlFor='passwordConfirmation'>Password confirmation</Label>
            <Input
              id='passwordConfirmation'
              type='password'
              {...register('passwordConfirmation')}
            />
            <FormError
              className='-mb-1'
              error={
                isLoginForm
                  ? undefined
                  : 'passwordConfirmation' in errors
                  ? errors.passwordConfirmation
                  : undefined
              }
            />
          </div>
        )}
      </div>

      <SubmitButton actionType={actionType} />
    </form>
  )
}

export default AuthForm

const SubmitButton = ({ actionType }: TProps) => {
  const { pending } = useFormStatus()

  return (
    <Button
      disabled={pending}
      className='mt-2 text-center w-full uppercase'
      type='submit'
    >
      {actionType}
    </Button>
  )
}
