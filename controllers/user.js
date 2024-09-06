import { UserModel } from '../models/user.js';

export class UserController {
  static async getById(req, res) {
    const { id } = req.params;
    const result = await UserModel.getById(id);
    res.send(result);
  }
}
