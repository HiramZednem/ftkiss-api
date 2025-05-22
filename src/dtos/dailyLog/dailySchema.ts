import { z } from 'zod';

export const dailyLogSchema = z.object({
    uuid_habit: z.string({
        required_error: "uuid_habit is required",
        invalid_type_error: "uuid_habit must be a string",
    }),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "date must be in YYYY-MM-DD format",
    }),
});