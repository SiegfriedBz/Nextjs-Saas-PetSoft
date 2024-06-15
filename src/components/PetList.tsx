'use client'

import petDefaultImg from '@/app/pet-default.png'
import usePetsContext from '@/hooks/usePetsContext'
import Image from 'next/image'
import { useEffect } from 'react'
import { twMerge } from 'tailwind-merge'
import { toast } from 'sonner'

const PetList = () => {
  const { pets, selectedPet, handleSelectPet } = usePetsContext()

  useEffect(() => {
    if (!pets.length) {
      toast.info('No pets found. Add a pet to get started!')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ul className='max-md:h-[32svh] md:h-[54svh] flex flex-col items-center overflow-y-scroll rounded-md'>
      {pets.map((pet) => {
        const {
          id,
          imageUrl,
          name,
          age
          // , breed
        } = pet

        return (
          <li
            key={id}
            className={twMerge(
              `group w-full 
                max-md:px-8 max-md:py-4 md:p-4
                hover:text-zinc-500 
                hover:bg-zinc-200/60
                border-b border-b-zinc-200 
                transition-colors duration-300
              `,
              `${selectedPet?.id === id ? 'text-zinc-500 bg-zinc-200/60' : ''}`
            )}
          >
            <button
              type='button'
              onClick={() => handleSelectPet(id)}
              className='grid grid-cols-[1fr_4fr] items-center gap-x-8'
            >
              <div className='relative rounded-full h-16 w-16 overflow-hidden'>
                <Image
                  src={imageUrl || petDefaultImg}
                  alt={`${name} the 

                    `}
                  fill
                  className='rounded-full object-cover object-bottom'
                />
              </div>
              <p className='font-base font-semibold'>{name}</p>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
export default PetList
