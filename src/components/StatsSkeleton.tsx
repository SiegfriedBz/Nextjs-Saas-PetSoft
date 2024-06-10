import { Skeleton } from '@/components/ui/skeleton'

const StatsSkeleton = async () => {
  return (
    <section className='flex flex-col text-center'>
      <Skeleton className='w-8 h-4 self-center bg-white/90 mb-2' />
      <p className='opacity-80'>Current guest</p>
    </section>
  )
}

export default StatsSkeleton
