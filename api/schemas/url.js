import { z } from 'zod';

const urlRegex =
  // eslint-disable-next-line no-useless-escape
  /^(https?:\/\/)?((([a-z\d]([a-z\d-]*[a-z\d])*)\.)+[a-z]{2,}|((\d{1,3}\.){3}\d{1,3}))(\:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;

export const customUrlSchema = z.string().refine((val) => urlRegex.test(val), {
  message: 'Invalid URL format',
});
