import type { TPetEssentials } from '@/types/pet.types'
import { useCallback, useEffect, useState } from 'react'

export const useFilteredPets = ({
  petsData
}: {
  petsData: TPetEssentials[]
}) => {
  const [pets, setPets] = useState<TPetEssentials[]>(() => {
    return petsData || []
  })
  const [petQuery, setPetQuery] = useState('')
  const getFilteredPets = useCallback(() => {
    return petsData.filter((pet) =>
      !petQuery ? pet : pet.name.toLowerCase().includes(petQuery?.toLowerCase())
    )
  }, [petQuery, petsData])

  // update pets when petQuery changes
  useEffect(() => {
    const pets = getFilteredPets()
    setPets(pets)
  }, [getFilteredPets])

  const handleSetPetQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPetQuery(e.target.value)
  }

  return { pets, petQuery, handleSetPetQuery }
}
