import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { usersRouter } from './routes/users.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();
const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.disable('x-powered-by');

const PORT = process.env.PORT ?? 8080;

app.get('/', (req, res) => {
  res.json({ message: 'helllooooo' });
});

app.use('/users', usersRouter);

// 404 to catch not matching routes
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error Handling
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
