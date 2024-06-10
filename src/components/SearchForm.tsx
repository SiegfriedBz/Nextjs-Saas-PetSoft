'use client'

const SearchForm = () => {
  return (
    <form className='w-full h-full'>
      <input
        className='w-full h-full placeholder:text-white/90 px-4 py-2 bg-white/20 rounded-md ring-1 ring-white border-none'
        placeholder='Search'
        type='search'
      />
    </form>
  )
}
export default SearchForm
