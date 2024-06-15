import prisma from '@/lib/db'
import type { TUpdateUserInput } from '@/zod/user.zod'
import type { User } from '@prisma/client'

export const updateUser = async (
  userInput: TUpdateUserInput
): Promise<User> => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userInput.id
      },
      data: {
        hasAccess: userInput.hasAccess
      }
    })
    return updatedUser
  } catch (error) {
    console.error('updateUser error', error)
    throw new Error('Failed to update user')
  }
}
