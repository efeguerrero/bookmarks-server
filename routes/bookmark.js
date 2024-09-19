import { Router } from 'express';
import { BookmarkController } from '../controllers/bookmark.js';

export const bookmarkRouter = Router();

bookmarkRouter.post('/', BookmarkController.create);
bookmarkRouter.delete('/:id', BookmarkController.delete);
