'use server'

import { checkAuth } from '@/server-utils/auth.server.utils'
import { mutatePetSchema, type TMutatePetInput } from '@/zod/mutatePet.zod'
import { revalidatePath } from 'next/cache'
import { Pet } from '@prisma/client'
import { addPet } from '@/services/pet/addPet.service'

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

    console.log('=== addPetAction newPet')

    return JSON.parse(JSON.stringify(newPet))
  } catch (error) {
    const err = error as Error
    return err
  }
}
