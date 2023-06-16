import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import { queryUserExists } from '../service/UserTable';

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.token as string;
  try {
    if (!token) {
      throw Error;
    }
    const decoded = jwt.verify(token, 'cheesecake') as jwt.JwtPayload;

    const userExists = await queryUserExists(decoded.userId);
    if (!userExists) {
      throw Error;
    }

    (req as any).user = decoded.userId;
    next();
  } catch (err) {
    console.log(err.message);
    return { res: res.status(401).json({ message: 'Invalid token' }) };
  }
}
