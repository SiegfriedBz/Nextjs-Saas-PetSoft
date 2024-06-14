import ContentBlock from '@/components/ContentBlock'
import MutatePetDialog from '@/components/MutatePetDialog'
import PetDetails from '@/components/PetDetails'
import PetList from '@/components/PetList'
import SearchForm from '@/components/SearchForm'

// Server-Component
const DashboardContent = () => {
  return (
    <div className='grid max-md:grid-cols-1 md:grid-cols-[16rem_1fr] md:space-x-4 h-full md:h-[60svh]'>
      <section className='grid md:grid-rows-[2rem_58svh] space-y-2 md:h-full'>
        {/* Client-Component */}
        <SearchForm />
        <ContentBlock className='relative ring-1 ring-white overflow-hidden'>
          {/* Client-Component */}
          <PetList />
          <MutatePetDialog actionType='createPet' />
        </ContentBlock>
      </section>

      <section className='max-md:min-h-[38svh] max-md:my-8 md:h-[calc(100%+0.5rem)]'>
        <ContentBlock className='ring-1 ring-white overflow-hidden'>
          {/* Client-Component */}
          <PetDetails />
        </ContentBlock>
      </section>
    </div>
  )
}

export default DashboardContent
