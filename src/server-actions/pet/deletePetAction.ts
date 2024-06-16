'use server'

import { checkAuth, checkIsPetOwner } from '@/server-utils/auth.server.utils'
import { deletePet } from '@/services/pet/deletePet.service'
import { deletePetSchema, type TDeletePetInput } from '@/zod/mutatePet.zod'
import type { Pet } from '@prisma/client'
import { revalidatePath } from 'next/cache'

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

    return JSON.parse(JSON.stringify(deletedPet))
  } catch (error) {
    const err = error as Error
    return err
  }
}
