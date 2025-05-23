import { z } from 'zod';


export const HabitSchema = z.object({
  name: z.string().min(1, 'Field name cant not be empty'),
});