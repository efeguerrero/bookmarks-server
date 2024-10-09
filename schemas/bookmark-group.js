import { z } from 'zod';
import { uuidSchema } from './uuid.js';

const bookmarkGroup = z.object({
  id: uuidSchema,
  userId: uuidSchema,
  slug: z
    .string()
    .min(1, 'Slug cannot be empty')
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      'Slug can only contain letters, numbers, hyphens, and underscores'
    ),
  name: z.string().min(1),
});

export const validateBookmarkGroup = (object) =>
  bookmarkGroup.safeParse(object);

export const validateBookmarkGroupInputs = (object) =>
  bookmarkGroup.pick({ slug: true, name: true }).safeParse(object);

export const validatePartialBookmarkGroupInputs = (object) =>
  bookmarkGroup.pick({ slug: true, name: true }).partial().safeParse(object);
