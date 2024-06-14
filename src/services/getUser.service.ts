import prisma from '@/lib/db'

export const getUser = async ({ email }: { email: string }) => {
  try {
    const user = await prisma.user.findFirst({ where: { email } })

    return user
  } catch (error) {
    throw new Error('Failed to fetch user.')
  }
}
