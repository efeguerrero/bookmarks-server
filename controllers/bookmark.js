import { BookmarkModel } from '../models/bookmark.js';
import { BadRequestError } from '../utils/errors.js';
import { validateNewBookmark } from '../schemas/bookmark.js';
import { validateUUID } from '../schemas/uuid.js';

export class BookmarkController {
  static create = async (req, res, next) => {
    try {
      const { userId } = req.auth;
      const result = validateNewBookmark(req.body);

      if (result.error) {
        throw new BadRequestError('Invalid request parameters');
      }
      const newBookmark = await BookmarkModel.create({ userId, ...req.body });
      res.status(201).json(newBookmark);
    } catch (error) {
      next(error);
    }
  };

  static delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { userId } = req.auth;

      const idResult = validateUUID(id);

      if (idResult.error) {
        throw new BadRequestError('Invalid Request Parameters');
      }

      const deletedBookmark = await BookmarkModel.delete({ id, userId });
      res.status(200).json(deletedBookmark);
    } catch (error) {
      next(error);
    }
  };
}
