import { z } from 'zod';

// UUID Schema and Validation
export const uuidSchema = z
  .string()
  .uuid({ message: 'Invalid ID format' })
  .min(1, { message: 'ID cannot be empty' });

export const validateUUID = (id) => uuidSchema.safeParse(id);
