import { z } from 'zod';

export const issueSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(255, { message: 'Title must be at most 255 characters' }),
  description: z.string().min(1, { message: 'Description is required' }),
});

export const patchIssueSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required' })
    .max(255, { message: 'Title must be at most 255 characters' })
    .optional(),
  description: z
    .string()
    .min(1, { message: 'Description is required' })
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, { message: 'Assigned to user id id required' })
    .optional()
    .nullable(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(20, { message: 'Password must be at most 20 characters' }),
});

export const registerSchema = loginSchema
  .extend({
    name: z
      .string()
      .min(1, { message: 'Name is required' })
      .max(40, { message: 'Password must be at most 40 characters' }),
    confirmPassword: z.string(),
  })
  .superRefine(({ password, confirmPassword }, c) => {
    if (password !== confirmPassword) {
      c.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      });
    }
  });
