'use client'

import MutatePetForm from '@/components/MutatePetForm'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import type { TPet } from '@/types/pet.types'
import { PlusIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

type TProps =
  | {
      actionType: 'createPet'
      selectedPet?: undefined
    }
  | { actionType: 'editPet'; selectedPet: TPet }

const MutatePetDialog = ({ actionType, selectedPet }: TProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const isEditPet = actionType === 'editPet'

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {isEditPet ? (
          <Button variant='secondary'>Edit</Button>
        ) : (
          <button className='z-[50] bg-zinc-800/90 text-zinc-50 p-1 rounded-full absolute max-md:bottom-1 max-md:right-2 md:bottom-4 md:right-4'>
            <PlusIcon width={38} height={38} />
          </button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEditPet ? 'Edit pet' : 'Add a new pet'}</DialogTitle>
          <DialogDescription asChild>
            <MutatePetForm
              selectedPet={selectedPet}
              closeDialog={() => setIsDialogOpen(false)}
            />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default MutatePetDialog
