import { Skeleton } from '@/components/ui/skeleton'

const SearchFormSkeleton = () => {
  return (
    <form className='w-full h-full'>
      <Skeleton className='w-full h-full placeholder:text-white/90 px-4 py-2 bg-white/20 rounded-md ring-1 ring-white border-none' />
    </form>
  )
}

export default SearchFormSkeleton
