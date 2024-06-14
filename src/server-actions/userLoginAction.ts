'use server'

import { signIn } from '@/lib/auth'
import { loginZodSchema, type TLoginInput } from '@/zod/auth.zod'
import { AuthError } from 'next-auth'

const userLoginAction = async (userInput: TLoginInput) => {
  try {
    // 1. Data validation
    const parsedInput = loginZodSchema.safeParse(userInput)

    if (parsedInput.error) {
      throw new Error('Invalid input. Could not log in.')
    }

    // 2. Sign in with credentials
    await signIn('credentials', parsedInput.data, {
      redirectTo: '/app/dashboard'
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.'
        default:
          return 'Something went wrong.'
      }
    }
    throw error
  }
}

export default userLoginAction
