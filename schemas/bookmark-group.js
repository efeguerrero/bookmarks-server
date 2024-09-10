import {z } from 'zod';
import { userIdSchema } from './userId.js';

const bookmarkGroup = z.object({
  userId: userIdSchema,
  slug: z
    .string()
    .min(1, 'Slug cannot be empty')
    .regex(
      /^[a-zA-Z0-9-_]+$/,
      'Slug can only contain letters, numbers, hyphens, and underscores'
    ),
  name: z.string().min(4),
});

export const validateBookmarkGroup = (object) =>
  bookmarkGroup.safeParse(object);

export const validateDeleteBookmarkGroup = (object) =>
  bookmarkGroup.pick({ userId: true }).safeParse(object);
