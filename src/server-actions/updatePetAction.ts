'use server'

import { updatePet } from '@/services/updatePet.service'
import type { TUpdatePetInput } from '@/zod/mutatePet.zod'
import { revalidatePath } from 'next/cache'

export async function updatePetAction(updatePetInput: TUpdatePetInput) {
  try {
    const updatedPet = await updatePet(updatePetInput)

    revalidatePath('/app/dashboard')

    return updatedPet
  } catch (error) {
    return error
  }
}
