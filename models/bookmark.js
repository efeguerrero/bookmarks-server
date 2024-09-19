import sql from '../config/db.js';
import { DupliacteResourceError } from '../utils/errors.js';

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
}
