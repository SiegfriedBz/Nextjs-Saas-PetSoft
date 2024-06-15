'use server'

import { checkAuth, checkIsPetOwner } from '@/server-utils/auth.server.utils'
import { updatePet } from '@/services/pet/updatePet.service'

import { mutatePetSchema, type TMutatePetInput } from '@/zod/mutatePet.zod'
import { Pet } from '@prisma/client'
import { revalidatePath } from 'next/cache'

export async function updatePetAction(
  updatePetInput: TMutatePetInput
): Promise<Pet | Error> {
  try {
    // Authentication check
    const session = await checkAuth()
    const currentUserId = session?.user?.userId

    // Data validation
    const parsedInput = mutatePetSchema.safeParse(updatePetInput)

    if (parsedInput.error) {
      throw new Error('Invalid input. Could not update pet.')
    }

    // Authorization check (user owns pet)
    const ownsPet = await checkIsPetOwner({
      petId: parsedInput.data.id,
      currentUserId,
      actionType: 'update'
    })

    if (!ownsPet) {
      throw new Error('Failed to update pet.')
    }

    // Data mutation with service
    const updatedPet = await updatePet({
      petData: parsedInput.data,
      currentUserId
    })

    revalidatePath('/app/dashboard')

    return updatedPet
  } catch (error) {
    console.log('updatePetAction -> error', error)
    const err = error as Error
    return err
  }
}
