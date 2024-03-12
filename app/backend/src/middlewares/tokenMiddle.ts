import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'SUPER_SECRETO';

interface TokenPayload {
  username: string;
}
const generateToken = (username: string | undefined) => {
  const token = jwt.sign({ username }, secretKey, { expiresIn: '1d', algorithm: 'HS256' });
  return token;
};

const validateToken = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const getToken = jwt.verify(authorization.split(' ')[1], secretKey) as TokenPayload;
    console.log(getToken.username);
    req.body.role = getToken.username.toLowerCase();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
  next();
};

export default { generateToken, validateToken };
