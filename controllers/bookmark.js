import { BookmarkModel } from '../models/bookmark.js';
import { BadRequestError } from '../utils/errors.js';
import { validateNewBookmark } from '../schemas/bookmark.js';

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
}
