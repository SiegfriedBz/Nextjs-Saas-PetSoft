'use server'

import { addPet } from '@/services/addPet.service'
import { checkAuth } from '@/server-utils/server.utils'
import { mutatePetSchema, type TMutatePetInput } from '@/zod/mutatePet.zod'
import { revalidatePath } from 'next/cache'
import { Pet } from '@prisma/client'

export async function addPetAction(
  createPetInput: TMutatePetInput
): Promise<Pet | Error> {
  try {
    // Authentication check
    const session = await checkAuth()
    const currentUserId = session?.user?.userId

    // Data validation
    const parsedInput = mutatePetSchema.safeParse(createPetInput)

    if (parsedInput.error) {
      throw new Error('Invalid input. Could not add pet.')
    }

    // Data mutation with service
    const newPet = await addPet({
      petData: parsedInput.data,
      currentUserId: currentUserId
    })

    revalidatePath('/app/dashboard')

    return newPet
  } catch (error) {
    const err = error as Error
    return err
  }
}
