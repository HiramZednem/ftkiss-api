import { z } from 'zod'


export const UserSchema = z.object({
    name: z.string().min(1, 'Field name cannot be empty'),
    lastname: z.string().min(1, 'Field lastname cannot be empty'),
    email: z.string().email('Invalid email').trim().toLowerCase(),
    password: z.string().min(8)
})

export type UserRequest = z.infer<typeof UserSchema>;