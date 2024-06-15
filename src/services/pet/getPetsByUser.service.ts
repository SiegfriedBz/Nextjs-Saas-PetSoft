import prisma from '@/lib/db'
import { Pet } from '@prisma/client'

export async function getPetsByUser({ userId }: { userId: Pet['userId'] }) {
  try {
    const pets = await prisma.pet.findMany({ where: { userId } })

    return pets
  } catch (error) {
    throw new Error('Failed to fetch user pets.')
  }
}
