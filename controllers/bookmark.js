import { BookmarkModel } from '../models/bookmark.js';
import { BadRequestError } from '../utils/errors.js';
import { validateNewBookmark } from '../schemas/bookmark.js';
import { validateUUID } from '../schemas/uuid.js';
import { fetchUrlData } from '../utils/fetch-url-data.js';
import { customUrlSchema } from '../schemas/url.js';
import { normalizeUrl } from '../utils/normalizeURL.js';

export class BookmarkController {
  static create = async (req, res, next) => {
    try {
      const { userId } = req.auth;
      const { url, groupId } = req.body;

      const urlResult = customUrlSchema.safeParse(url);

      if (urlResult.error) {
        throw new BadRequestError('Unable to process URL.');
      }

      const normalizedURL = normalizeUrl(url);
      const urlData = await fetchUrlData(normalizedURL);

      // console.log('urlData', urlData);

      const result = validateNewBookmark({
        ...urlData,
        url: normalizedURL,
        groupId,
      });

      if (result.error) {
        throw new BadRequestError(
          'We could not process this website information.'
        );
      }

      const newBookmark = await BookmarkModel.create({
        userId,
        ...result.data,
      });
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

  static getAll = async (req, res, next) => {
    try {
      const { userId } = req.auth;
      const data = await BookmarkModel.getAll({ userId });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };

  static update = async (req, res, next) => {
    try {
      const { userId } = req.auth;
      const { id } = req.params;
      const { newGroupId } = req.body;

      const idResult = validateUUID(id);

      // If we un-assign groups from a bookmark it will be null!
      if (newGroupId) {
        const groupIdResult = validateUUID(newGroupId);
        if (idResult.error || groupIdResult.error) {
          throw new BadRequestError('Invalid Request Parameters');
        }
      }

      if (idResult.error) {
        throw new BadRequestError('Invalid Request Parameters');
      }

      const data = await BookmarkModel.update({ id, newGroupId, userId });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  };
}
