import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, 'JesseAPIkey', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token.' });
    }

    // Attach the user information to the request for later use
    (req as any).user = user;

    next();
  });
};

