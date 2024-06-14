import z from 'zod'

const baseSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

const loginZodSchema = baseSchema
const signupZodSchema = baseSchema
  .extend({
    name: z.string().min(2),
    passwordConfirmation: z.string().min(6)
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation']
  })

type TLoginInput = z.infer<typeof loginZodSchema>
type TSignupInput = z.infer<typeof signupZodSchema>

export { loginZodSchema, signupZodSchema, type TLoginInput, type TSignupInput }
