'use client'

import { Button } from '@/components/ui/button'
import usePetsContext from '@/hooks/usePetsContext'
import type { TPet } from '@/types/pet.types'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useTransition } from 'react'

type TProps = {
  actionType: 'create' | 'edit' | 'checkout'
  className?: string
  selectedPet?: TPet
  children?: React.ReactNode
}
const PetActionButton = ({
  actionType,
  className,
  selectedPet,
  children
}: TProps) => {
  const { handleCheckoutPet } = usePetsContext()
  const [isPending, startTransition] = useTransition()

  const onCheckout = () => {
    startTransition(() => {
      handleCheckoutPet(selectedPet as TPet)
    })
  }

  return actionType === 'create' ? (
    <Button size='icon' className={`p-1 rounded-full ${className}`}>
      <PlusIcon width={44} height={44} />
    </Button>
  ) : actionType === 'edit' ? (
    <Button variant='secondary'>{children}</Button>
  ) : actionType === 'checkout' ? (
    <Button onClick={onCheckout} variant='secondary'>
      {children}
    </Button>
  ) : null
}

export default PetActionButton
