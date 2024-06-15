import prisma from '@/lib/db'
import { TDeletePetInput } from '@/zod/mutatePet.zod'

export const deletePet = async ({ id }: { id: TDeletePetInput }) => {
  try {
    const deletedPet = await prisma.pet.delete({
      where: { id }
    })

    return deletedPet
  } catch (error) {
    throw new Error('Failed to delete pet.')
  }
}
