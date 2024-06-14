import prisma from '@/lib/db'
import type { TMutatePetInput } from '@/zod/mutatePet.zod'

export const addPet = async ({
  petData,
  currentUserId
}: {
  petData: TMutatePetInput
  currentUserId: string
}) => {
  try {
    const newPet = await prisma.pet.create({
      data: { ...petData, User: { connect: { id: currentUserId } } }
    })

    return newPet
  } catch (error) {
    throw new Error('Failed to add pet.')
  }
}
