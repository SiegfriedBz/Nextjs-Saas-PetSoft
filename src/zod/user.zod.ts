import z from 'zod'

const baseSchema = z.object({
  id: z.string(),
  hasAccess: z.boolean()
})

const updateUserZodSchema = baseSchema

type TUpdateUserInput = z.infer<typeof updateUserZodSchema>

export { updateUserZodSchema, type TUpdateUserInput }
