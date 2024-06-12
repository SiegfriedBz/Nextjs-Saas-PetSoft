import { getPets } from '@/services/getPets.service'
import { TPet } from '@/types/pet.types'

const getData = async () => {
  const petsData: TPet[] = await getPets()
  console.log('petsData', petsData)

  return petsData
}

const Stats = async () => {
  const petsData = await getData()
  const numOfPets = petsData.length || 0

  return (
    <section className='text-center'>
      <p className='text-2xl font-bold leading-6'>{numOfPets}</p>
      <p className='opacity-80'>Current {numOfPets > 1 ? 'guests' : 'guest'}</p>
    </section>
  )
}

export default Stats
