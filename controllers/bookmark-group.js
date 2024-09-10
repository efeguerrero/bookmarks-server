import { BadRequestError } from '../utils/errors.js';
import {
  validateBookmarkGroup,
  validateDeleteBookmarkGroup,
} from '../schemas/bookmark-group.js';
import { BookmarkGroupModel } from '../models/bookmark-group.js';

export class BookmarkGroupController {
  static create = async (req, res, next) => {
    try {
      const result = validateBookmarkGroup(req.body);
      if (result.error) {
        throw new BadRequestError('Invalid request parameters');
      }

      const newBookmarkGroup = await BookmarkGroupModel.create(result.data);
      res.status(201).json(newBookmarkGroup);
    } catch (error) {
      next(error);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const { id } = req.params;

      const result = validateDeleteBookmarkGroup(req.body);
      if (result.error) {
        throw new BadRequestError('Invalid request parameters');
      }
      const { userId } = result.data;
      await BookmarkGroupModel.delete({ id, userId });

      res.status(200).json({ message: 'Bookmark group deleted' });
    } catch (error) {
      next(error);
    }
  };
}
