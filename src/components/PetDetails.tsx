'use client'

import usePets from '@/hooks/usePets'

const PetDetails = () => {
  const { pets, selectedPetId } = usePets()
  const selectedPet = pets.find((pet) => pet.id === selectedPetId)

  return (
    <div className='h-full w-full max-md:p-4 md:p-8'>
      {selectedPetId ? <> DETAILS {selectedPet?.name}</> : <>Select a pet</>}
    </div>
  )
}

export default PetDetails
