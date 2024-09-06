import sql from '../config/db.js';

export class UserModel {
  static getById = async (id) => {
    const data = await sql` SELECT * FROM users WHERE id = ${id}`;
    return data[0];
  };
}
