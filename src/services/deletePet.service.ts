import prisma from '@/lib/db'

export const deletePet = async (petId: string) => {
  const deletedPet = await prisma.pet.delete({ where: { id: petId } })

  return deletedPet
}
