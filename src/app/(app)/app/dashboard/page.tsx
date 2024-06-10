import Branding from '@/components/Branding'
import DashboardContentWrapper from '@/components/DashboardContentWrapper'
import DashboardContentWrapperSkeleton from '@/components/DashboardContentWrapperSkeleton'
import Stats from '@/components/Stats'
import StatsSkeleton from '@/components/StatsSkeleton'
import { Suspense } from 'react'

const Dashboard = () => {
  return (
    <main className='space-y-4'>
      <div className='flex justify-between items-center text-zinc-50'>
        {/* Server-Component */}
        <Branding />

        <Suspense fallback={<StatsSkeleton />}>
          {/* Server-Component */}
          <Stats />
        </Suspense>
      </div>

      <Suspense fallback={<DashboardContentWrapperSkeleton />}>
        {/* Server-Component */}
        <DashboardContentWrapper />
      </Suspense>
    </main>
  )
}

export default Dashboard
