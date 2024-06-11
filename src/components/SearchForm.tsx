'use client'

import usePetsContext from '@/hooks/usePetsContext'

const SearchForm = () => {
  const { petQuery, handleSetPetQuery } = usePetsContext()

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
        onChange={handleSetPetQuery}
      />
    </form>
  )
}
export default SearchForm
