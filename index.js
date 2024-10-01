import express from 'express';
import dotenv from 'dotenv';
import 'dotenv/config';
import morgan from 'morgan';
import { errorHandler } from './middleware/errorHandler.js';
import { bookmarkGroupRouter } from './routes/bookmark-group.js';
import { corsMiddleware } from './middleware/cors.js';
// import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import { bookmarkRouter } from './routes/bookmark.js';

dotenv.config();
const PORT = process.env.PORT ?? 8080;

const app = express();

app.disable('x-powered-by');

app.use(morgan('dev'));
app.use(express.json());
app.use(corsMiddleware());

// app.use(ClerkExpressRequireAuth());

// Hardcoded clerk auth
app.use((req, res, next) => {
  req.auth = { userId: 'user_2lyQ6AwpOWV6ZHvbEvRpXBlWE2s' };
  next();
});

app.use('/bookmark-group', bookmarkGroupRouter);
app.use('/bookmark', bookmarkRouter);

// 404 to catch not matching routes
app.use((req, res) => {
  console.log(req.url);
  res.status(404).json({ message: 'Route not found' });
});

// Error Handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
