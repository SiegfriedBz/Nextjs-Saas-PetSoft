'use server'

import { addPet } from '@/services/addPet.service'
import type { TCreatePetInput } from '@/zod/mutatePet.zod'
import { revalidatePath } from 'next/cache'

const wait = (duration: number) =>
  new Promise((res) => {
    setTimeout(res, duration)
  })
export async function addPetAction(pet: TCreatePetInput) {
  try {
    await wait(5000)
    const newPet = await addPet(pet)

    revalidatePath('/app/dashboard')

    return newPet
  } catch (error) {
    return error
  }
}
