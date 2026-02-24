import z from 'zod'

export const authFormSchema = z.object({
	email: z.email(),
	password: z.string().min(8, 'Password must be at least 8 characters long')
})

export type AuthFormData = z.infer<typeof authFormSchema>
