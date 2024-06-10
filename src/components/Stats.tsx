import { TPet } from '@/types/pet.types'

const getData = async () => {
  const response = await fetch(
    'https://bytegrad.com/course-assets/projects/petsoft/api/pets'
  )

  if (!response.ok) {
    throw new Error('Failed to fetch pets data')
  }

  const petsData: TPet[] = await response.json()

  return petsData
}

const Stats = async () => {
  const petsData = await getData()
  const numOfPets = petsData.length || 0

  return (
    <section className='text-center'>
      <p className='text-2xl font-bold leading-6'>{numOfPets}</p>
      <p className='opacity-80'>Current guest</p>
    </section>
  )
}

export default Stats
