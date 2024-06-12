import prisma from '@/lib/db'

export async function getPets() {
  const pets = await prisma.pet.findMany()

  return pets
}
