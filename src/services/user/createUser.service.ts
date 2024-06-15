import { SALT_ROUNDS } from '@/constants'
import prisma from '@/lib/db'
import type { TSignupInput } from '@/zod/auth.zod'
import { User } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import bcrypt from 'bcryptjs'

export const createUser = async (userInput: TSignupInput): Promise<User> => {
  try {
    const hashedPassword = await bcrypt.hash(userInput.password, SALT_ROUNDS)

    const newUser = await prisma.user.create({
      data: {
        email: userInput.email,
        name: userInput.name,
        hashedPassword
      }
    })

    return newUser
  } catch (error) {
    console.error('createUser error', error)
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('Email already in use')
      }
    }
    throw new Error('Failed to create user')
  }
}
