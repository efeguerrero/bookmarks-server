import { Router } from 'express';

export const usersRouter = Router();

// Create a User
usersRouter.post('/', (req, res) => {
  const data = req.body;
  res.status(201).json(data);
});

// Retrieve a user
usersRouter.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({ message: `this is the user ${id}` });
});

// Update User

// Delete User
