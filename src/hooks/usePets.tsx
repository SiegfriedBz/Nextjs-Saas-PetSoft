'use client'

import { useContext } from 'react'
import { PetsContext, type TPetsContext } from '@/context/PetsProvider'

const usePets = () => {
  const context = useContext<TPetsContext | null>(PetsContext)
  if (!context) {
    throw new Error('usePets must be used within a PetsProvider')
  }
  return context
}

export default usePets
