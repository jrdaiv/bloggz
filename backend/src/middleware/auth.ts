import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface AuthRequest extends Request {
  user?: any;
}

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization');
  const token = authHeader?.startsWith('Bearer ') ? authHeader.replace('Bearer ', '') : undefined;

  if (!token) {
    console.log('No token provided for request:', req.method, req.url);
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      console.error('JWT_SECRET is not defined');
      throw new Error('JWT_SECRET is not defined');
    }

    console.log('Using JWT secret:', secret); // Debug secret
    console.log('Verifying token:', token); // Debug token

    const decoded = jwt.verify(token, secret) as { id: string };

    console.log('Decoded token:', decoded); // Debug decoded payload

    const user = await User.findById(decoded.id);
    console.log('User found:', user); // Debug user retrieval

    if (!user) {
      console.log(`User not found for ID: ${decoded.id}`);
      return res.status(401).json({ error: 'Invalid token' });
    }

    console.log('Authenticated user:', { id: user._id.toString(), username: user.username });

    req.user = { id: user._id.toString(), username: user.username };
    console.log('Request user set:', req.user); // Debug request user
        
    next();
  } catch (error: any) {
    console.error('Token verification error:', error.message);
    res.status(401).json({ error: 'Invalid token' });
  }

  
};

export default authMiddleware;