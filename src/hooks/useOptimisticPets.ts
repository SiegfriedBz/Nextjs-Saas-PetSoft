import { addPetAction } from '@/server-actions/addPetAction'
import { deletePetAction } from '@/server-actions/deletePetAction'
import { updatePetAction } from '@/server-actions/updatePetAction'
import type { TPet } from '@/types/pet.types'
import type { TCreatePetInput, TUpdatePetInput } from '@/zod/mutatePet.zod'
import { useOptimistic } from 'react'
import { toast } from 'sonner'

const optimisticReducer = (
  state: TPet[],
  {
    action,
    payload
  }: { action: string; payload: TUpdatePetInput | TCreatePetInput | TPet['id'] }
) => {
  switch (action) {
    case 'optimisticCreate':
      const createPetInput = payload as TCreatePetInput & {
        id: string
      }
      return [...state, createPetInput]
    case 'optimisticUpdate':
      const updatePetInput = payload as TUpdatePetInput
      return state.map((pet) =>
        pet.id !== updatePetInput.id ? pet : updatePetInput
      )
    case 'optimisticDelete':
      const deletePetId = payload as TPet['id']
      return state.filter((pet) => pet.id !== deletePetId)
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

  const handleAddPet = async (createPetInput: TCreatePetInput) => {
    // set optimistic pets
    setOptimisticPets({
      action: 'optimisticCreate',
      payload: {
        ...createPetInput,
        id: crypto.randomUUID()
      }
    })

    // server-action
    try {
      const response = await addPetAction(createPetInput)
      toast.success(`Pet added successfully`)
      console.log('addPetAction response', response)
    } catch (error) {
      toast.error('Adding pet went wrong, please try again later.')
      console.log('Pet ADD ERROR', error)
    }
  }

  const handleUpdatePet = async (updatePetInput: TUpdatePetInput) => {
    // set optimistic pets
    setOptimisticPets({
      action: 'optimisticUpdate',
      payload: updatePetInput
    })
    // server-action
    try {
      const response = await updatePetAction(updatePetInput)
      toast.success(`${updatePetInput.name} updated successfully`)
      console.log('updatePetAction response', response)
    } catch (error) {
      toast.error('Updating pet went wrong, please try again later.')
      console.log('Pet UPDATE ERROR', error)
    }
  }

  const handleDeletePet = async (petId: TPet['id']) => {
    // unselect pet
    handleSelectPet('')
    // set optimistic pets
    setOptimisticPets({ action: 'optimisticDelete', payload: petId })
    // server-action
    try {
      const response = await deletePetAction(petId)
      toast.success(`Pet deleted successfully`)
      console.log('deletePetAction response', response)
    } catch (error) {
      toast.error('Deleting pet went wrong, please try again later.')
      console.log('Pet DELETE ERROR', error)
    }
  }

  return { optimisticPets, handleAddPet, handleUpdatePet, handleDeletePet }
}
