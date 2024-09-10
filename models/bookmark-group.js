import sql from '../config/db.js';
import { DupliacteResourceError } from '../utils/errors.js';

export class BookmarkGroupModel {
  static create = async (input) => {
    try {
      const { userId, slug, name } = input;

      const bookmarkGroup = await sql`INSERT INTO 
    bookmark_groups (user_id, slug, name)
    VALUES
    (${userId},${slug},${name})
    returning id, user_id, slug, name `;

      return bookmarkGroup[0];
    } catch (error) {
      // Check for unique constraint
      if (
        error.code === '23505' &&
        error.constraint_name === 'bookmark_groups_user_id_slug_key'
      ) {
        throw new DupliacteResourceError(
          'A bookmark group with this slug already exists.'
        );
      }

      // Otherwise throw generic error
      throw new Error();
    }
  };
}
