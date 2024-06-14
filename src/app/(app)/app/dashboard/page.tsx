import Branding from '@/components/Branding'
import DashboardContent from '@/components/DashboardContent'
import Stats from '@/components/Stats'
import PetsProvider from '@/context/PetsProvider'
import { auth } from '@/lib/auth'
import getDataPetsByUser from '@/server-getData/getDataPetsByUser'
import { TPetEssentials } from '@/types/pet.types'
import { redirect } from 'next/navigation'

const getData = async () => {
  // Authentication check
  const session = await auth()
  const currentUserId = session?.user?.userId

  if (!currentUserId) {
    return redirect('/login')
  }

  // Get pets belonging to the current user
  const petsData: TPetEssentials[] = await getDataPetsByUser({
    userId: currentUserId
  })

  return petsData
}

const Dashboard = async () => {
  const petsData = await getData()

  return (
    <PetsProvider petsData={petsData}>
      <main className='space-y-4 h-full'>
        <div className='flex justify-between items-center text-zinc-50'>
          {/* Server-Component */}
          <Branding />
          {/* Client-Component */}
          <Stats />
        </div>
        {/* Server-Component */}
        <DashboardContent />
      </main>
    </PetsProvider>
  )
}

export default Dashboard
