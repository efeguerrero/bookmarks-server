import { z } from 'zod';

export const parseZodError = (err) => {
  if (err instanceof z.ZodError) {
    const jsonResponse = err.errors.map((errorItem) => ({
      field: errorItem.path[0],
      message: errorItem.message,
    }));

    return { errors: jsonResponse };
  }
  return err;
};
