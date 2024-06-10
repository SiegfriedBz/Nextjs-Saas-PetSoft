import Branding from '@/components/Branding'
import DashboardContentWrapper from '@/components/DashboardContentWrapper'
import DashboardContentWrapperSkeleton from '@/components/DashboardContentWrapperSkeleton'

import Stats from '@/components/Stats'
import { Suspense } from 'react'

const Dashboard = () => {
  return (
    <main className='space-y-4'>
      <div className='flex justify-between items-center text-zinc-50'>
        <Branding />
        <Stats />
      </div>

      <Suspense fallback={<DashboardContentWrapperSkeleton />}>
        {/* Server-Component */}
        <DashboardContentWrapper />
      </Suspense>
    </main>
  )
}

export default Dashboard
