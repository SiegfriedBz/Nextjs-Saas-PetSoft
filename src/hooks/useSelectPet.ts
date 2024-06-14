import { TPetEssentials } from '@/types/pet.types'
import { useState } from 'react'

export const useSelectPet = ({ pets }: { pets: TPetEssentials[] }) => {
  const [selectedPetId, setSelectedPetId] = useState('')
  const selectedPet = pets.find((pet) => pet.id === selectedPetId)

  const handleSelectPet = (id: string) => {
    setSelectedPetId(id)
  }

  return { selectedPet, handleSelectPet }
}
