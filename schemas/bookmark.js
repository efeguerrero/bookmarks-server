import { z } from 'zod';
import { uuidSchema } from './uuid.js';
import { customUrlSchema } from './url.js';

export const bookmarkSchema = z.object({
  id: uuidSchema,
  userId: uuidSchema,
  title: z.string().min(1, { message: 'Bookmark title cannot be empty' }),
  description: z.string().nullish(),
  faviconURL: z.string().nullish(),
  url: customUrlSchema,
  groupId: uuidSchema.nullish(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
});

export const validateBookmark = (object) => bookmarkSchema.safeParse(object);

export const validateNewBookmark = (object) =>
  bookmarkSchema
    .omit({ id: true, userId: true, createdAt: true, updatedAt: true })
    .safeParse(object);
