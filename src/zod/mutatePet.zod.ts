import z from 'zod'

const currentDate = new Date()

const mutatePetSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  imageUrl: z.union([
    z.literal(''),
    z.string().trim().url({ message: 'Image should be a valid url' })
  ]),
  age: z.union([
    z.number().int().positive({ message: 'Age is required' }),
    z
      .string()
      .trim()
      .min(1, { message: 'Age is required' })
      .transform((val) => Math.abs(parseInt(val, 10)))
  ]),
  breed: z.string().trim().min(3, { message: 'Breed is required' }),
  notes: z.union([
    z.literal(''),
    z.string().trim().max(99, { message: 'Notes should be less than 99 chars' })
  ]),
  ownerName: z.string().trim().min(3, { message: 'Owner name is required' }),
  ownerPhoneNum: z
    .string()
    .trim()
    .min(3, { message: 'Owner phone number is required' }),
  checkInDate: z.date().default(currentDate),
  checkOutDate: z.date().default(currentDate),
  id: z.string().default(crypto.randomUUID())
})
type TMutatePetInput = z.infer<typeof mutatePetSchema>

const deletePetSchema = z.string()
type TDeletePetInput = z.infer<typeof deletePetSchema>

export {
  mutatePetSchema,
  deletePetSchema,
  type TMutatePetInput,
  type TDeletePetInput
}
