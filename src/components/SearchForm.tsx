'use client'

import usePets from '@/hooks/usePets'

const SearchForm = () => {
  const { petQuery, setPetQuery } = usePets()

  return (
    <form className='w-full h-full'>
      <input
        className='w-full h-full
          placeholder:text-white/90
          placeholder:focus:text-zinc-500/70
          placeholder:hover:text-zinc-500/80
          px-4 py-2
          bg-white/20
          hover:bg-white/30
          rounded-md
          ring-1 ring-white
          outline-none
          focus:bg-white/50
          focus:text-zinc-600/90
          transition duration-300
        '
        placeholder='Search'
        type='search'
        value={petQuery}
        onChange={(e) => setPetQuery(e.target.value)}
      />
    </form>
  )
}
export default SearchForm
