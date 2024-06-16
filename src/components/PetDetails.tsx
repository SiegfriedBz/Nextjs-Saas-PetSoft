'use client'

import petDefaultImg from '@/app/pet-default.png'
import MutatePetDialog from '@/components/MutatePetDialog'
import PetCheckOutActionButton from '@/components/PetCheckOutActionButton'
import usePetsContext from '@/hooks/usePetsContext'
import type { TPetEssentials } from '@/types/pet.types'
import { PhoneIcon } from '@heroicons/react/24/outline'
import {
  ArrowRightEndOnRectangleIcon,
  ArrowRightStartOnRectangleIcon,
  CalendarIcon
} from '@heroicons/react/24/solid'
import Image from 'next/image'

const PetDetails = () => {
  const { pets, selectedPet } = usePetsContext()

  if (!selectedPet || !pets?.find((p) => p.id === selectedPet?.id))
    return <EmptyView />

  return (
    <div className='h-full w-full flex flex-col max-md:mb-16'>
      {/* Header */}
      <Header selectedPet={selectedPet} />

      {/* Body */}
      <div className='mt-4 flex flex-col h-full space-y-8 bg-zinc-200/60 px-4'>
        <Owner selectedPet={selectedPet} />
        <Pet selectedPet={selectedPet} />
        <Dates selectedPet={selectedPet} />
        <Notes selectedPet={selectedPet} />
      </div>
    </div>
  )
}

export default PetDetails

type TProps = {
  selectedPet: TPetEssentials
}
const Header = ({ selectedPet }: TProps) => {
  return (
    <div className='flex max-sm:flex-col max-sm:gap-y-4 sm:items-center max-md:px-4 max-md:py-4 md:p-4 max-md:gap-x-2'>
      <div className='flex items-center max-md:gap-x-2 md:gap-x-8'>
        <div className='relative rounded-full h-16 w-16 overflow-hidden'>
          <Image
            src={selectedPet?.imageUrl || petDefaultImg}
            alt={`${selectedPet.name}`}
            fill
            className='rounded-full object-cover object-bottom'
          />
        </div>

        <p className='text-xl '>{selectedPet.name}</p>
      </div>

      <div className='flex sm:ms-auto items-center gap-x-4'>
        <MutatePetDialog actionType='editPet' selectedPet={selectedPet} />
        <PetCheckOutActionButton selectedPetId={selectedPet.id}>
          Checkout
        </PetCheckOutActionButton>
      </div>
    </div>
  )
}

const Owner = ({ selectedPet }: TProps) => {
  return (
    <div className='grid max-sm:grid-cols-1 sm:grid-cols-[1fr_4fr] py-4'>
      <p className='text-lg uppercase'>Owner</p>
      <div className='flex max-sm:justify-between'>
        <p className='sm:ms-16 md:ms-14'>{selectedPet.ownerName}</p>
        <p className='justify-center ms-auto flex items-center space-x-2'>
          <PhoneIcon className='h-5 w-5 currentColor' />
          <span>{selectedPet.ownerPhoneNum || '000-000-0000'}</span>
        </p>
      </div>
    </div>
  )
}

const Pet = ({ selectedPet }: TProps) => {
  return (
    <div className='grid max-sm:grid-cols-1 sm:grid-cols-[1fr_4fr]'>
      <p className='text-lg uppercase'>{selectedPet.name}</p>
      <div className='flex max-sm:justify-between'>
        <p className='sm:ms-16 md:ms-14'>
          <span>{selectedPet.age} yo</span>
        </p>
        <p className='ms-auto'>
          <span>{selectedPet.breed || 'Golden retriever'}</span>
        </p>
      </div>
    </div>
  )
}

const Dates = ({ selectedPet }: TProps) => {
  return (
    <div className='grid max-sm:gap-y-2 max-sm:grid-cols-1 sm:grid-cols-[1fr_4fr]'>
      <p className='text-lg'>
        <CalendarIcon className='h-6 w-6 currentColor' />
      </p>
      <div className='flex max-sm:justify-between'>
        <p className='sm:ms-16 md:ms-14 justify-center flex items-center space-x-2'>
          <ArrowRightStartOnRectangleIcon className='h-5 w-5 currentColor' />
          {selectedPet?.checkInDate?.toLocaleDateString()}
        </p>
        <p className='ms-auto justify-center flex items-center space-x-2'>
          <ArrowRightEndOnRectangleIcon className='h-5 w-5 currentColor' />
          {selectedPet?.checkOutDate?.toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}

const Notes = ({ selectedPet }: TProps) => {
  return (
    <div className='bg-zinc-50 rounded-t-md flex-1 px-4 pt-8'>
      <p>{selectedPet.notes}</p>
    </div>
  )
}

const EmptyView = () => {
  return (
    <div className='flex justify-center items-center h-full w-full'>
      <p className='text-lg'>Select a pet to view details</p>
    </div>
  )
}
