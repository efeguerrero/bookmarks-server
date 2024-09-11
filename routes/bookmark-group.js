import { Router } from 'express';
import { BookmarkGroupController } from '../controllers/bookmark-group.js';

export const bookmarkGroupRouter = Router();

bookmarkGroupRouter.post('/', BookmarkGroupController.create);
bookmarkGroupRouter.delete('/:id', BookmarkGroupController.delete);
bookmarkGroupRouter.get('/', BookmarkGroupController.getAll);
