import { z } from 'zod';


export const dailyLogSchema = z.object({
    uuid_habit: z.string().uuid({
        message: "uuid_habit must be a valid UUID",
    }),
    date: z.date({
        required_error: "date is required",
        invalid_type_error: "date must be a valid date",
    })
});