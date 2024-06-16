'use client'
import usePetsContext from '@/hooks/usePetsContext'

const Stats = () => {
  const { pets } = usePetsContext()
  const numOfPets = pets.length || 0

  return (
    <section className='text-center'>
      <p className='text-2xl font-bold leading-6'>{numOfPets}</p>
      <p className='max-sm:text-base sm:text-lg opacity-80'>
        {numOfPets > 1 ? 'Guests' : 'Guest'}
      </p>
    </section>
  )
}

export default Stats
