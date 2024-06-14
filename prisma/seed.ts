import { SALT_ROUNDS } from '@/constants'
import { Prisma, PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput = {
  email: 'anna@petsoft.com',
  hashedPassword: '',
  name: 'Anna Doe',
  pets: {
    create: [
      {
        name: 'Benjamin',
        ownerName: 'John Doe',
        imageUrl:
          'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=100&w=1935&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        age: 2,
        breed: 'Bulldog',
        notes:
          "Doesn't like to be touched on the belly. Plays well with other dogs.",
        ownerPhoneNum: '+1 234 567 8901',
        checkInDate: '2024-06-11T12:04:48.447Z',
        checkOutDate: '2024-09-11T12:04:48.447Z'
      },
      {
        name: 'Richard',
        ownerName: 'Josephine Dane',
        imageUrl:
          'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=100&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        age: 5,
        breed: 'Bulldog',
        notes: 'Needs medication twice a day.',
        ownerPhoneNum: '+1 234 567 8901',
        checkInDate: '2024-06-11T12:04:48.447Z',
        checkOutDate: '2024-09-11T12:04:48.447Z'
      },
      {
        name: 'Anna',
        ownerName: 'Frank Doe',
        imageUrl:
          'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&q=100&w=1970&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        age: 4,
        breed: 'Chihuahua',
        notes: 'Allergic to chicken.',
        ownerPhoneNum: '+1 234 567 8901',
        checkInDate: '2024-06-11T12:04:48.447Z',
        checkOutDate: '2024-09-11T12:04:48.447Z'
      }
    ]
  }
}

async function main() {
  console.log(`Cleaning DB ...`)

  await prisma.pet.deleteMany()
  await prisma.user.deleteMany()

  console.log(`Cleaning DB ...DONE`)
  console.log(`Start seeding ...`)

  const hashedPassword = await bcrypt.hash('123456', SALT_ROUNDS)
  userData.hashedPassword = hashedPassword

  await prisma.user.create({
    data: userData
  })
  console.log(`Seeding ...DONE`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
