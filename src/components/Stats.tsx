'use client'
import usePetsContext from '@/hooks/usePetsContext'

const Stats = () => {
  const { pets } = usePetsContext()
  const numOfPets = pets.length || 0

  return (
    <section className='text-center'>
      <p className='text-2xl font-bold leading-6'>{numOfPets}</p>
      <p className='opacity-80'>Current {numOfPets > 1 ? 'guests' : 'guest'}</p>
    </section>
  )
}

export default Stats
