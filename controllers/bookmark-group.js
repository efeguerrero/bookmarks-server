import { BadRequestError } from '../utils/errors.js';
import {
  validateBookmarkGroup,
  validatePartialBookmarkGroup,
} from '../schemas/bookmark-group.js';
import { BookmarkGroupModel } from '../models/bookmark-group.js';
import { validateUUID } from '../schemas/uuid.js';

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
      const result = validateUUID(id);
      if (result.error) {
        throw new BadRequestError('Invalid request parameters');
      }
      const { userId } = req.body;

      await BookmarkGroupModel.delete({ id, userId });

      res.status(200).json({ message: 'Bookmark group deleted' });
    } catch (error) {
      next(error);
    }
  };

  static getAll = async (req, res, next) => {
    try {
      const { userId } = req.body;
      const data = await BookmarkGroupModel.getAll({ userId });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const resultId = validateUUID(id);
      const resultBookmark = validatePartialBookmarkGroup(req.body);
      if (resultBookmark.error || resultId.error) {
        throw new BadRequestError('Invalid Request Parameters');
      }
      const data = await BookmarkGroupModel.update({
        id,
        ...resultBookmark.data,
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}
