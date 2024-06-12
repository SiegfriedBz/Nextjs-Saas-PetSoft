import prisma from '@/lib/db'
import type { TUpdatePetInput } from '@/zod/mutatePet.zod'

export const updatePet = async (updatePetInput: TUpdatePetInput) => {
  const updatedPet = await prisma.pet.update({
    where: { id: updatePetInput.id },
    data: updatePetInput
  })

  return updatedPet
}
