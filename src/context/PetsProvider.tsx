'use client'

import { useFilteredPets } from '@/hooks/useFilteredPets'
import { useOptimisticPets } from '@/hooks/useOptimisticPets'
import { useSelectPet } from '@/hooks/useSelectPet'
import type { TPet } from '@/types/pet.types'
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
  handleAddPet: (pet: TPet) => void
  handleEditPet: (pet: TPet) => void
  handleCheckoutPet: (pet: TPet) => void
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
  const { optimisticPets, handleAddPet, handleEditPet, handleCheckoutPet } =
    useOptimisticPets({
      pets,
      handleSelectPet
    })

  console.log('optimisticPets', optimisticPets)
  console.log('pets', pets)

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
        handleEditPet,
        handleCheckoutPet
      }}
    >
      {children}
    </PetsContext.Provider>
  )
}

export default PetsProvider
