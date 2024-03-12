import { Request, Response } from 'express';
import UserService from '../services/user.service';

class LoginController {
  static async returnToken(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const token = await UserService.getToken(email);
      res.status(200).json({ token });
    } catch (error) {
      console.log(error);
    }
  }

  static async returnRole(req: Request, res: Response) {
    try {
      const { role } = req.body;
      console.log(role);
      res.status(200).json({ role });
    } catch (error) {
      console.log(error);
    }
  }
}

export default LoginController;
