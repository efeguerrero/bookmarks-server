import { z } from 'zod';
import { userIdSchema } from './userId.js';
// import { parseZodError } from '../utils/zod-error-parsing.js';

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

// const data = {
//   id: '222',
//   user_id: '123e4567-e89b-12d3-a456-426614174002',
//   slug: 2,
//   name: 'he',
// };

// const result = validateBookmarkGroup(data);

// console.log(parseZodError(result.error));
