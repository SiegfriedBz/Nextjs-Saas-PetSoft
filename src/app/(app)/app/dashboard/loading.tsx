import Branding from '@/components/Branding'
import DashboardContentSkeleton from '@/components/DashboardContentSkeleton'
import StatsSkeleton from '@/components/StatsSkeleton'

const loading = () => {
  return (
    <main className='space-y-4 h-full'>
      <div className='flex justify-between items-center text-zinc-50'>
        <Branding />
        <StatsSkeleton />
      </div>
      <DashboardContentSkeleton />
    </main>
  )
}

export default loading
