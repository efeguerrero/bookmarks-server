import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config();

const app = express();

app.use(morgan('tiny'));

const PORT = process.env.PORT ?? 8080;

app.get('/', (req, res) => {
  res.send('helllooooo');
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
