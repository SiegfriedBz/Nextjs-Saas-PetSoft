'use client'

import { useFilteredPets } from '@/hooks/useFilteredPets'
import { useOptimisticPets } from '@/hooks/useOptimisticPets'
import { useSelectPet } from '@/hooks/useSelectPet'
import type { TPet } from '@/types/pet.types'
import type { TCreatePetInput, TUpdatePetInput } from '@/zod/mutatePet.zod'
import { createContext } from 'react'

export type TPetsContext = {
  pets: TPet[]
  //
  selectedPet: TPet | undefined
  handleSelectPet: (id: string) => void
  //
  petQuery: string
  handleSetPetQuery: (e: React.ChangeEvent<HTMLInputElement>) => void
  //
  handleAddPet: (createPetInput: TCreatePetInput) => Promise<void>
  handleUpdatePet: (updatePetInput: TUpdatePetInput) => Promise<void>
  handleDeletePet: (petId: TPet['id']) => Promise<void>
}
export const PetsContext = createContext<TPetsContext | null>(null)

type TProps = {
  petsData: TPet[]
  children: React.ReactNode
}
const PetsProvider = ({ petsData, children }: TProps) => {
  // init & search pets
  const { pets, petQuery, handleSetPetQuery } = useFilteredPets({
    petsData
  })

  // select pet
  const { selectedPet, handleSelectPet } = useSelectPet({
    pets
  })

  // optimistic pets & server-actions
  const { optimisticPets, handleAddPet, handleUpdatePet, handleDeletePet } =
    useOptimisticPets({
      pets,
      handleSelectPet
    })

  return (
    <PetsContext.Provider
      value={{
        //
        selectedPet,
        handleSelectPet,
        //
        petQuery,
        handleSetPetQuery,
        //
        pets: optimisticPets,
        handleAddPet,
        handleUpdatePet,
        handleDeletePet
      }}
    >
      {children}
    </PetsContext.Provider>
  )
}

export default PetsProvider
