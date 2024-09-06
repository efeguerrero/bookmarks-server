import { Router } from 'express';
import { UserController } from '../controllers/user.js';

export const usersRouter = Router();

// Create a User
usersRouter.post('/', (req, res) => {
  const data = req.body;
  res.status(201).json(data);
});

// Retrieve a user
usersRouter.get('/:id', UserController.getById);

// Update User

// Delete User
