'use client'

import { Button } from '@/components/ui/button'
import userLogoutAction from '@/server-actions/auth/userLogoutAction'
import { useTransition } from 'react'
import { toast } from 'sonner'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const SignOutButton = () => {
  const [isPending, startTransition] = useTransition()

  return (
    <Button
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          toast.info('Signing out...')
          await userLogoutAction()
          toast.success('You signed out successfully.')
        })
      }}
    >
      Sign Out
    </Button>
  )
}

export default SignOutButton
