'use client'

import type { TPet } from '@/types/pet.types'
import { createContext, useEffect, useState } from 'react'

export type TPetsContext = {
  pets: TPet[]
  selectedPetId: string
  setSelectedPetId: React.Dispatch<React.SetStateAction<string>>
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
  const [selectedPetId, setSelectedPetId] = useState('')

  useEffect(() => {
    setPets(petsData)
  }, [petsData])

  return (
    <PetsContext.Provider value={{ pets, selectedPetId, setSelectedPetId }}>
      {children}
    </PetsContext.Provider>
  )
}

export default PetsProvider
