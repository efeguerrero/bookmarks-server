import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

export const corsMiddleware = () =>
  cors({
    origin: [process.env.DEV_ORIGIN, process.env.PROD_ORIGIN],
  });
