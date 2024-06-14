import { getUser } from '@/services/getUser.service'
import z from 'zod'

const schema = z.string().email()

const getDataUser = async ({ email }: { email: string }) => {
  try {
    // 1. Data validation
    const parsedInput = schema.safeParse(email)

    if (parsedInput.error) {
      throw new Error('Invalid input. Could not get user.')
    }

    // 2. Get user with service
    const user = await getUser({ email })

    return user
  } catch (error) {
    throw new Error('Failed to fetch user.')
  }
}

export default getDataUser
