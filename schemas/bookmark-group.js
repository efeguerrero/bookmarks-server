import { z } from 'zod';
import { uuidSchema } from './uuid.js';

const bookmarkGroup = z.object({
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

export const validatePartialBookmarkGroup = (object) =>
  bookmarkGroup.partial({ slug: true, name: true }).safeParse(object);
