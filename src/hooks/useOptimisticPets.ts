import { checkOutPetAction } from '@/server-actions/checkOutPetAction'
import type { TPet } from '@/types/pet.types'
import { useOptimistic } from 'react'

const optimisticReducer = (
  state: TPet[],
  { action, pet }: { action: string; pet: TPet }
) => {
  switch (action) {
    case 'optimisticCreate':
      return [...state, pet]
    case 'optimisticEdit':
      return state.map((p) => (p.id !== pet.id ? p : pet))
    case 'optimisticCheckout':
      return state.filter(({ id }) => id !== pet.id)
    default:
      return state
  }
}

type TProps = {
  pets: TPet[]
  handleSelectPet: (id: string) => void
}
export const useOptimisticPets = ({ pets, handleSelectPet }: TProps) => {
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    pets,
    optimisticReducer
  )

  const handleAddPet = async (pet: TPet) => {
    // set optimistic pets
    setOptimisticPets({ action: 'optimisticCreate', pet })
    // server-action TODO
  }

  const handleEditPet = async (pet: TPet) => {
    // set optimistic pets
    setOptimisticPets({ action: 'optimisticEdit', pet })
    // server-action TODO
  }

  const handleCheckoutPet = async (pet: TPet) => {
    console.log('==== handleCheckoutPet Checking out pet:', pet)
    // unselect pet
    handleSelectPet('')
    // set optimistic pets
    setOptimisticPets({ action: 'optimisticCheckout', pet })
    // server-action
    const response = await checkOutPetAction(pet.id)
    console.log('response', response)
    console.log('Pet checked out successfully:', pet)
  }

  return { optimisticPets, handleAddPet, handleEditPet, handleCheckoutPet }
}
