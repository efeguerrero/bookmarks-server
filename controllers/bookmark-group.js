import { BadRequestError } from '../utils/errors.js';
import { validateBookmarkGroup } from '../schemas/bookmark-group.js';
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
}
