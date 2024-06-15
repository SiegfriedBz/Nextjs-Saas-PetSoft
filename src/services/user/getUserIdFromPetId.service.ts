import prisma from '@/lib/db'
import type { Pet } from '@prisma/client'

const getPetUserIdFromPetId = async ({ petId }: { petId: Pet['id'] }) => {
  try {
    const pet = await prisma.pet.findUnique({
      where: { id: petId },
      select: { userId: true }
    })

    if (!pet) {
      throw new Error('Pet not found.')
    }

    return pet.userId
  } catch (error) {
    throw error
  }
}

export default getPetUserIdFromPetId
