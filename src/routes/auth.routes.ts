import { Router, Request, Response } from 'express';
import { User } from '../models/user.model';
// import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

const router = Router();

// Login endpoint
router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });

    if (!user || password !== user.password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

    const token = jwt.sign({ userId: user.id }, 'JesseAPIkey', { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: user.id }, 'JesseAPIkey', { expiresIn: '7d' });

    res.status(200).json({ token, refreshToken });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// Refresh
router.post('/refresh-token', async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
  
    try {
      const decoded = jwt.verify(refreshToken, 'JesseAPIkey');
      const user = await User.findByPk(decoded.userId);
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid refresh token' });
      }
  
      const newAccessToken = jwt.sign({ userId: user.id }, 'JesseAPIkey', { expiresIn: '1h' });
  
      res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      console.error('Error refreshing token:', error);
      res.status(401).json({ message: 'Invalid refresh token' });
    }
  });
  

export default router;
