import { Skeleton } from '@/components/ui/skeleton'

export const PetDetailsSkeleton = () => {
  return (
    <div className='h-full w-full flex flex-col max-md:mb-16'>
      {/* Header */}
      <div className='flex items-center p-4'>
        <div className='flex items-center gap-x-8'>
          <Skeleton className='w-16 h-16 rounded-full' />
          <Skeleton className='w-[100px] h-[24px]' />
        </div>
        <div className='flex ms-auto items-center gap-x-4'>
          <Skeleton className='w-[75px] h-[24px]' />
          <Skeleton className='w-[75px] h-[24px]' />
        </div>
      </div>

      {/* Content */}
      <div className='mt-4 flex flex-col h-full space-y-8 bg-zinc-200/60 p-4 pb-0 ring-1 ring-white rounded-md'>
        <BaseSkeleton />
        <BaseSkeleton />
        <BaseSkeleton />

        {/* Notes */}
        <Skeleton className='bg-zinc-50 rounded-t-md flex-1' />
      </div>
    </div>
  )
}

const BaseSkeleton = () => {
  return (
    <div className='grid grid-cols-[1fr_4fr]'>
      <Skeleton className='w-[100px] h-[24px]' />
      <div className='flex justify-around'>
        <Skeleton className='w-[100px] h-[24px]' />
        <Skeleton className='w-[100px] h-[24px]' />
      </div>
    </div>
  )
}
