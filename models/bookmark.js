import sql from '../config/db.js';
import { DupliacteResourceError, NotFoundError } from '../utils/errors.js';

export class BookmarkModel {
  static create = async (input) => {
    try {
      const { userId, title, url, groupId, faviconURL, description } = input;

      const newBookmark = {
        user_id: userId,
        title,
        url,
        group_id: groupId || null,
        favicon_url: faviconURL || null,
        description: description || null,
      };

      const result = await sql`INSERT INTO bookmarks ${sql(
        newBookmark
      )} RETURNING id, title, description, url, favicon_url, group_id `;

      return result[0];
    } catch (error) {
      if (
        error.code === '23505' &&
        error.constraint_name === 'bookmarks_user_id_url_key'
      ) {
        throw new DupliacteResourceError(
          'A bookmark with this url already exists.'
        );
      }
      console.log(error);
      throw new Error('');
    }
  };

  static delete = async (input) => {
    try {
      const { id, userId } = input;

      const result =
        await sql`DELETE FROM bookmarks WHERE id=${id} AND user_id=${userId} RETURNING id, title`;

      if (result.length === 0) {
        throw new NotFoundError('Bookmark does not exists');
      }

      return result[0];
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      console.log(error);
      throw new Error('');
    }
  };

  static getAll = async (input) => {
    try {
      const { userId } = input;

      const result =
        await sql`SELECT id, title, description, url, favicon_url, group_id FROM bookmarks WHERE user_id=${userId} ORDER BY title ASC`;

      return result;
    } catch (error) {
      console.log(error);
      throw new Error('');
    }
  };
}
