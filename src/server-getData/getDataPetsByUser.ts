import { getPetsByUser } from '@/services/pet/getPetsByUser.service'
import type { Pet } from '@prisma/client'
import z from 'zod'

const schema = z.string()

const getDataPetsByUser = async ({ userId }: { userId: Pet['userId'] }) => {
  // 1. Data validation
  const parsedInput = schema.safeParse(userId)
  if (!parsedInput.success) {
    throw new Error('Invalid input. Could not get pets for user.')
  }

  // 2. Get pets with service
  const pets: Pet[] = await getPetsByUser({ userId: parsedInput.data })

  return pets
}

export default getDataPetsByUser
