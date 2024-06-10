'use client'

import type { TPet } from '@/types/pet.types'
import { createContext, useCallback, useEffect, useState } from 'react'

export type TPetsContext = {
  pets: TPet[]
  selectedPetId?: string
  selectedPet: TPet | undefined
  handleSelectPetId: (id: string) => void
  petQuery: string
  setPetQuery: React.Dispatch<React.SetStateAction<string>>
}
export const PetsContext = createContext<TPetsContext | null>(null)

type TProps = {
  petsData: TPet[]
  children: React.ReactNode
}
const PetsProvider = ({ petsData, children }: TProps) => {
  const [pets, setPets] = useState<TPet[]>(() => {
    return petsData || []
  })
  // select a pet
  const [selectedPetId, setSelectedPetId] = useState('')
  const selectedPet = pets.find((pet) => pet.id === selectedPetId)

  // search pets
  const [petQuery, setPetQuery] = useState('')
  const getFilteredPets = useCallback(() => {
    return petsData.filter((pet) =>
      !petQuery ? pet : pet.name.toLowerCase().includes(petQuery?.toLowerCase())
    )
  }, [petQuery, petsData])

  // update pets when petsData changes
  useEffect(() => {
    setPets(petsData)
  }, [petsData])

  // update pets when petQuery changes
  useEffect(() => {
    const filteredPets = getFilteredPets()
    setPets(filteredPets)
  }, [getFilteredPets])

  const handleSelectPetId = (id: string) => {
    setSelectedPetId(id)
  }

  return (
    <PetsContext.Provider
      value={{
        pets,
        selectedPetId,
        selectedPet,
        handleSelectPetId,
        petQuery,
        setPetQuery
      }}
    >
      {children}
    </PetsContext.Provider>
  )
}

export default PetsProvider
