'use server'

import { deletePet } from '@/services/deletePet.service'
import { checkAuth, checkIsPetOwner } from '@/server-utils/server.utils'
import { deletePetSchema, type TDeletePetInput } from '@/zod/mutatePet.zod'
import { revalidatePath } from 'next/cache'
import { Pet } from '@prisma/client'

export async function deletePetAction(
  id: TDeletePetInput
): Promise<Pet | Error> {
  try {
    // Authentication check
    const session = await checkAuth()
    const currentUserId = session?.user?.userId

    // Data validation
    const parsedInput = deletePetSchema.safeParse(id)

    if (parsedInput.error) {
      throw new Error('Invalid input. Could not delete pet.')
    }

    // Authorization check (user owns pet)
    const ownsPet = await checkIsPetOwner({
      petId: parsedInput.data,
      currentUserId,
      actionType: 'delete'
    })

    if (!ownsPet) {
      throw new Error('Failed to delete pet.')
    }

    // Data mutation with service
    const deletedPet = await deletePet({
      id: parsedInput.data
    })

    revalidatePath('/app/dashboard')

    return deletedPet
  } catch (error) {
    const err = error as Error
    return err
  }
}
