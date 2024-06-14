import { Pet } from '@prisma/client'

type TPetEssentials = Omit<Pet, 'createdAt' | 'updatedAt' | 'userId'>
export { type TPetEssentials }
