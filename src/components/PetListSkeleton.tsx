import { Skeleton } from '@/components/ui/skeleton'

export const PetListSkeleton = () => {
  return (
    <ul className='max-md:h-[22svh] md:h-full flex flex-col items-center overflow-y-scroll rounded-md'>
      {Array.from({ length: 4 }, (_, id) => {
        return (
          <li
            key={id}
            className={`group w-full 
                max-md:px-8 max-md:py-4 md:p-4
                border-b border-b-zinc-200 
                transition-colors duration-300
              `}
          >
            <div className='grid grid-cols-[1fr_4fr] items-center gap-x-8'>
              <Skeleton className='w-16 h-16 rounded-full' />
              <Skeleton className='w-[100px] h-[24px]' />
            </div>
          </li>
        )
      })}
    </ul>
  )
}
