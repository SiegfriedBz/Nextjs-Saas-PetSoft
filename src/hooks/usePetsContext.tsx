'use client'

import { useContext } from 'react'
import { PetsContext, type TPetsContext } from '@/context/PetsProvider'

const usePetsContext = () => {
  const context = useContext<TPetsContext | null>(PetsContext)
  if (!context) {
    throw new Error('usePetsContext must be used within a PetsProvider')
  }
  return context
}

export default usePetsContext
