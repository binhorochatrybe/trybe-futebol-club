import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'SUPERSECRETO';

const generateToken = (username: string | undefined) => {
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1d', algorithm: 'HS256' });
  return token;
};

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  const getToken = jwt.verify(req.headers.authorization.split(' ')[1], secretKey) as string;
  if (!getToken) {
    return res.status(401).json({ message: 'Must be a valide token' });
  }
  next();
};

export default { generateToken, validateToken };
