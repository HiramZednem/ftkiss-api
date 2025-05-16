import { z } from 'zod';

export const dailyLogSchema = z.object({
    id_habit: z.number({
        required_error: "id_habit is required",
        invalid_type_error: "id_habit must be a number",
    }),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "date must be in YYYY-MM-DD format",
    }),
    status: z.boolean({
        required_error: "status is required",
        invalid_type_error: "status must be a boolean",
    }),
});

export const deleteLogSchema = z.object({
    id_habit: z.number(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
});