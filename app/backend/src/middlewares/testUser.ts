import { Request, Response, NextFunction } from 'express';
import * as bcrypt from 'bcryptjs';
import UserModel from '../database/models/user.model';

const isPasswordValid = async (password: string, hashedPassword: string): Promise<boolean> => bcrypt
  .compare(password, hashedPassword);

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;

  if (!emailRegex.test(email) || password.length < 6) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const user = await UserModel.findOne({ where: { email } });
  if (!user || !(await isPasswordValid(password, user.password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  next();
};

export default validateLogin;
