import sql from '../config/db.js';
import { DupliacteResourceError, NotFoundError } from '../utils/errors.js';

export class BookmarkGroupModel {
  static create = async (input) => {
    try {
      const { userId, slug, name } = input;

      const bookmarkGroup = await sql`INSERT INTO 
    bookmark_groups (user_id, slug, name)
    VALUES
    (${userId},${slug},${name})
    RETURNING id, slug, name `;

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

  static delete = async (input) => {
    try {
      const { id, userId } = input;

      const result =
        await sql`DELETE FROM bookmark_groups WHERE id=${id} AND user_id=${userId} RETURNING id `;

      if (result.length === 0) {
        throw new NotFoundError('Bookmark Group was not found');
      }

      return true;
    } catch (error) {
      // We return specific not found error if true, otherwise we default to generic Internal Server error
      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new Error();
    }
  };

  static getAll = async (input) => {
    try {
      const { userId } = input;
      const result =
        await sql`SELECT id, slug, name FROM bookmark_groups WHERE user_id=${userId}`;

      // If no results we return an empty array and NOT an error.
      return result;
    } catch (error) {
      throw new Error('');
    }
  };

  static update = async (input) => {
    try {
      const { id, userId, ...updateFields } = input;

      const result = await sql`UPDATE bookmark_groups 
        SET ${sql(updateFields)} 
        WHERE id=${id} AND user_id=${userId}
        RETURNING id, slug, name`;

      if (result.length === 0) {
        throw new NotFoundError('Bookmark Group was not found');
      }

      return result[0];
    } catch (error) {
      if (error instanceof NotFoundError) {
        throw error;
      }
      console.log(error);

      throw new Error();
    }
  };
}
