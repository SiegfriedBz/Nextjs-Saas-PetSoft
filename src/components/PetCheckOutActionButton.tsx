'use client'

import { Button } from '@/components/ui/button'
import usePetsContext from '@/hooks/usePetsContext'
import type { TPet } from '@/types/pet.types'
import { useTransition } from 'react'

type TProps = {
  className?: string
  selectedPetId?: TPet['id']
  children?: React.ReactNode
}
const PetCheckOutActionButton = ({
  className,
  selectedPetId,
  children
}: TProps) => {
  const { handleDeletePet } = usePetsContext()
  const [isPending, startTransition] = useTransition()

  const onCheckout = () => {
    startTransition(() => {
      handleDeletePet(selectedPetId as TPet['id'])
    })
  }

  return (
    <Button
      disabled={isPending}
      onClick={onCheckout}
      variant='secondary'
      className={className}
    >
      {children}
    </Button>
  )
}

export default PetCheckOutActionButton
