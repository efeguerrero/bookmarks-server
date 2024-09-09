import sql from '../config/db.js';
import { NotFoundError } from '../utils/errors.js';

export class UserModel {
  static getById = async (id) => {
    const data = await sql` SELECT * FROM users WHERE id = ${id}`;

    if (data.length === 0) {
      throw new NotFoundError('User not found');
    }
    return data[0];
  };
}
