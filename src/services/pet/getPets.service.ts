import prisma from '@/lib/db'

export async function getPets() {
  try {
    const pets = await prisma.pet.findMany()

    return pets
  } catch (error) {
    throw new Error('Failed to fetch pets.')
  }
}
