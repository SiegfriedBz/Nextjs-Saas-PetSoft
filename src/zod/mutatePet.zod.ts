import z from 'zod'

const currentDate = new Date()

const baseSchema = z.object({
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
  checkInDate: z.date({ required_error: 'Check in date is required' }),
  checkOutDate: z.date({ required_error: 'Check out date is required' }),
  createdAt: z.date().default(currentDate),
  updatedAt: z.date().default(currentDate)
})

const createPetSchema = baseSchema
const editPetSchema = baseSchema.merge(
  z.object({
    id: z.string()
  })
)

type TCreatePetInput = z.infer<typeof createPetSchema>
type TUpdatePetInput = z.infer<typeof editPetSchema>

export {
  createPetSchema,
  editPetSchema,
  type TCreatePetInput,
  type TUpdatePetInput
}
