import { auth } from '@/lib/auth'
import getPetUserIdFromPetId from '@/services/user/getUserIdFromPetId.service'
import { Pet } from '@prisma/client'
import { redirect } from 'next/navigation'

// Authentication check
export const checkAuth = async () => {
  const session = await auth()
  const currentUserId = session?.user?.userId

  if (!currentUserId) {
    return redirect('/login')
  }

  return session
}

// Authorization check (user owns pet)
export const checkIsPetOwner = async ({
  petId,
  currentUserId,
  actionType
}: {
  petId: Pet['id']
  currentUserId: Pet['userId']
  actionType: 'update' | 'delete'
}) => {
  const petUserId = await getPetUserIdFromPetId({ petId })

  if (petUserId !== currentUserId) {
    throw new Error(`User is not authorized to ${actionType} this pet.`)
  }

  return true
}
