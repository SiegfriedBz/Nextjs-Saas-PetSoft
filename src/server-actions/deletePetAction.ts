'use server'

import { deletePet } from '@/services/deletePet.service'
import { TPet } from '@/types/pet.types'

import { revalidatePath } from 'next/cache'

export async function deletePetAction(petId: TPet['id']) {
  try {
    const deletedPet = await deletePet(petId)

    revalidatePath('/app/dashboard')

    return deletedPet
  } catch (error) {
    return error
  }
}
