'use client'

import { Button } from '@/components/ui/button'
import userLogoutAction from '@/server-actions/userLogoutAction'

const SignOutButton = () => {
  return (
    <Button onClick={async () => await userLogoutAction()}>Sign Out</Button>
  )
}

export default SignOutButton
