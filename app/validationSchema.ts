import { z } from "zod";

export const issueSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(255, { message: 'Title must be at most 255 characters' }),
  description: z.string().min(1, { message: 'Description is required.' }),
});
