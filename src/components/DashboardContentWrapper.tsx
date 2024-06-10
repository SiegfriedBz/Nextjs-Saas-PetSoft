import ContentBlock from '@/components/ContentBlock'
import PetDetails from '@/components/PetDetails'
import PetList from '@/components/PetList'
import SearchForm from '@/components/SearchForm'
import PetsProvider from '@/context/PetsProvider'
import type { TPet } from '@/types/pet.types'

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
// Server-Component
const DashboardContentWrapper = async () => {
  const petsData = await getData()

  return (
    // Client-Component
    <PetsProvider petsData={petsData}>
      <div className='grid max-md:grid-cols-1 md:grid-cols-[16rem_1fr] md:space-x-4 md:min-h-[62svh]'>
        <section className='grid md:grid-rows-[2rem_1fr] max-md:space-y-2 md:h-full'>
          {/* Client-Component */}
          <SearchForm />
          <ContentBlock className='mt-4 ring-1 ring-white overflow-hidden'>
            {/* Client-Component */}
            <PetList />
          </ContentBlock>
        </section>
        <section className='max-md:min-h-[38svh] max-md:my-8 md:h-[calc(100%+1rem)]'>
          <ContentBlock className='ring-1 ring-white overflow-hidden'>
            {/* Client-Component */}
            <PetDetails />
          </ContentBlock>
        </section>
      </div>
    </PetsProvider>
  )
}

export default DashboardContentWrapper
