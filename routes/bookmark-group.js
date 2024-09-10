import { Router } from 'express';
import { BookmarkGroupController } from '../controllers/bookmark-group.js';

export const bookmarkGroupRouter = Router();

bookmarkGroupRouter.post('/', BookmarkGroupController.create);
