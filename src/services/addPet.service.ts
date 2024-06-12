import prisma from '@/lib/db'
import type { TCreatePetInput } from '@/zod/mutatePet.zod'

export const addPet = async (pet: TCreatePetInput) => {
  const newPet = await prisma.pet.create({ data: pet })

  return newPet
}
