import UserModel from '../database/models/user.model';
import tokenUtils from '../middlewares/tokenMiddle';

class UserService {
  static async getToken(email: string) {
    const user = await UserModel.findOne({ where: { email } });
    const token = tokenUtils.generateToken(user?.username);
    return token;
  }
}

export default UserService;
