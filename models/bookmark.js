import sql from '../config/db.js';
import { DupliacteResourceError, NotFoundError } from '../utils/errors.js';

export class BookmarkModel {
  static create = async (input) => {
    try {
      const { userId, title, url, groupId, ...optionaInputs } = input;

      const newBookmark = {
        user_id: userId,
        title,
        url,
        group_id: groupId,
        ...optionaInputs,
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
}
