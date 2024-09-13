import { BadRequestError } from '../utils/errors.js';
import {
  validateBookmarkGroupInputs,
  validatePartialBookmarkGroupInputs,
} from '../schemas/bookmark-group.js';
import { BookmarkGroupModel } from '../models/bookmark-group.js';
import { validateUUID } from '../schemas/uuid.js';

export class BookmarkGroupController {
  static create = async (req, res, next) => {
    const { userId } = req.auth;
    try {
      const inputs = validateBookmarkGroupInputs(req.body);
      if (inputs.error) {
        throw new BadRequestError('Invalid request parameters');
      }

      const newBookmarkGroup = await BookmarkGroupModel.create({
        userId,
        ...inputs.data,
      });
      res.status(201).json(newBookmarkGroup);
    } catch (error) {
      next(error);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { userId } = req.auth;

      const result = validateUUID(id);
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
      const { userId } = req.auth;
      const data = await BookmarkGroupModel.getAll({ userId });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { userId } = req.auth;
      const resultId = validateUUID(id);
      const resultBookmark = validatePartialBookmarkGroupInputs(req.body);
      if (resultBookmark.error || resultId.error) {
        throw new BadRequestError('Invalid Request Parameters');
      }
      const data = await BookmarkGroupModel.update({
        id,
        userId,
        ...resultBookmark.data,
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}
