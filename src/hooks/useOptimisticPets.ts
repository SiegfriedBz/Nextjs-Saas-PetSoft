'use client'

import { addPetAction } from '@/server-actions/addPetAction'
import { deletePetAction } from '@/server-actions/deletePetAction'
import updatePetAction from '@/server-actions/updatePetAction'
import type { TPetEssentials } from '@/types/pet.types'
import type { TMutatePetInput } from '@/zod/mutatePet.zod'
import { useOptimistic } from 'react'
import { toast } from 'sonner'

const optimisticReducer = (
  state: TPetEssentials[],
  {
    action,
    payload
  }: { action: string; payload: TMutatePetInput | TPetEssentials['id'] }
): TPetEssentials[] => {
  switch (action) {
    case 'optimisticCreate':
      const createPetInput = payload as TMutatePetInput
      return [...state, createPetInput]
    case 'optimisticUpdate':
      const updatePetInput = payload as TMutatePetInput
      return state.map((pet) =>
        pet.id !== updatePetInput.id ? pet : updatePetInput
      )
    case 'optimisticDelete':
      const deletePetId = payload as TPetEssentials['id']
      return state.filter((pet) => pet.id !== deletePetId)
    default:
      return state
  }
}

type TProps = {
  pets: TPetEssentials[]
  handleSelectPet: (id: string) => void
}

export const useOptimisticPets = ({ pets, handleSelectPet }: TProps) => {
  const [optimisticPets, setOptimisticPets] = useOptimistic(
    pets,
    optimisticReducer
  )

  const handleAddPet = async (createPetInput: TMutatePetInput) => {
    try {
      // set optimistic pets
      setOptimisticPets({
        action: 'optimisticCreate',
        payload: createPetInput // contains default pet id, needed to iterate over optimisticPets in PetList component
      })

      // server-action
      const response = await addPetAction(createPetInput)

      if (response instanceof Error) {
        throw new Error('Failed to add pet')
      } else {
        toast.success(`Pet ${response.name} added successfully`)
      }
    } catch (error) {
      toast.error('Adding pet went wrong, please try again later.')
      console.log('ADD PET ERROR', error)
    }
  }

  const handleUpdatePet = async (updatePetInput: TMutatePetInput) => {
    try {
      // set optimistic pets
      setOptimisticPets({
        action: 'optimisticUpdate',
        payload: updatePetInput
      })

      // server-action
      const response = await updatePetAction(updatePetInput)
      if (response instanceof Error) {
        throw new Error('Failed to update pet')
      } else {
        toast.success(`Pet ${response.name} updated successfully`)
      }
    } catch (error) {
      toast.error('Updating pet went wrong, please try again later.')
      console.log('UPDATE PET ERROR', error)
    }
  }

  const handleDeletePet = async (petId: TPetEssentials['id']) => {
    try {
      // unselect pet
      handleSelectPet('')

      // set optimistic pets
      setOptimisticPets({ action: 'optimisticDelete', payload: petId })

      // server-action
      const response = await deletePetAction(petId)
      if (response instanceof Error) {
        throw new Error('Failed to delete pet')
      } else {
        toast.success(`Pet checked out successfully`)
      }
    } catch (error) {
      toast.error('Checking out pet went wrong, please try again later.')
      console.log('DELETE PET ERROR', error)
    }
  }

  return { optimisticPets, handleAddPet, handleUpdatePet, handleDeletePet }
}
