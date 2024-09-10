import { z } from 'zod';

// User Id Schema and Validation
export const userIdSchema = z
  .string()
  .uuid({ message: 'Invalid user ID format' })
  .min(1, { message: 'User ID cannot be empty' });

export const validateUserIdSchema = (id) => userIdSchema.safeParse(id);
