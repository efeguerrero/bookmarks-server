import { BadRequestError } from '../utils/errors.js';
import { validateBookmarkGroup } from '../schemas/bookmark-group.js';
import { BookmarkGroupModel } from '../models/bookmark-group.js';
import { validateUserId } from '../schemas/userId.js';

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
      const { userId } = req.body;
      const result = validateUserId(userId);
      if (result.error) {
        throw new BadRequestError('Invalid request parameters');
      }

      await BookmarkGroupModel.delete({ id, userId });

      res.status(200).json({ message: 'Bookmark group deleted' });
    } catch (error) {
      next(error);
    }
  };

  static getAll = async (req, res, next) => {
    try {
      const { userId } = req.body;
      const result = validateUserId(userId);
      if (result.error) {
        throw new BadRequestError('Invalid request parameters');
      }

      const data = await BookmarkGroupModel.getAll({ userId: result.data });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}
