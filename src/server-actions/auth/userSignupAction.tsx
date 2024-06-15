'use server'

import { createUser } from '@/services/user/createUser.service'
import type { TUser } from '@/types/user.types'
import { signupZodSchema, type TSignupInput } from '@/zod/auth.zod'
import userLoginAction from './userLoginAction'

const userSignupAction = async (userInput: TSignupInput) => {
  // 1. Data validation
  const parsedInput = signupZodSchema.safeParse(userInput)

  if (parsedInput.error) {
    throw new Error('Invalid input. Could not sign up.')
  }

  // 2. Create user in DB
  const newUser: TUser = await createUser(parsedInput.data)

  // 3. Log in user
  await userLoginAction({ email: newUser.email, password: userInput.password })
}

export default userSignupAction
