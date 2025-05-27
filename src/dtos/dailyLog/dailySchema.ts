import { z } from 'zod';


export const dailyLogSchema = z.object({
    uuid_habit: z.string().uuid({
        message: "uuid_habit must be a valid UUID",
    }),
    date: z.preprocess(
        (val) => (typeof val === 'string' || val instanceof Date ? new Date(val) : val),
        z.date({
            required_error: "date is required",
            invalid_type_error: "date must be a valid date",    
        })
    ),
});

export type DailyLogInput = z.infer<typeof dailyLogSchema>;