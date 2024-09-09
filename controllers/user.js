import { UserModel } from '../models/user.js';

export class UserController {
  static async getById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await UserModel.getById(id);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
