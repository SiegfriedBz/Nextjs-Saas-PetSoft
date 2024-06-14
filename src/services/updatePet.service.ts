import prisma from '@/lib/db'
import type { TMutatePetInput } from '@/zod/mutatePet.zod'

export const updatePet = async ({
  petData,
  currentUserId
}: {
  petData: TMutatePetInput
  currentUserId: string
}) => {
  try {
    const updatedPet = await prisma.pet.update({
      where: { id: petData.id, userId: currentUserId },
      data: petData
    })

    return updatedPet
  } catch (error) {
    throw new Error('Failed to update pet.')
  }
}
