'use server'

import { signOut } from '@/lib/auth'
import { revalidatePath } from 'next/cache'

const userLogoutAction = async () => {
  await signOut({ redirectTo: '/' })

  revalidatePath('/app/dashboard')
}

export default userLogoutAction
