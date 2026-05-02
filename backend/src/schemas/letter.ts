import { z } from 'zod';

export const createLetterSchema = z.object({
  content: z.string()
    .min(1, 'Letter content cannot be empty')
    .max(10000, 'Letter content must be less than 10,000 characters'),
});

export type CreateLetterInput = z.infer<typeof createLetterSchema>;
