import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.session?.authToken;

  if (!authToken) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not found');
    }
    jwt.verify(authToken, process.env.JWT_SECRET);
    return next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export const authAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authToken = req.session?.authToken;

  if (!authToken) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not found');
    }
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET) as {
      permissions: number;
    };
    if (decodedToken.permissions !== 1) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    return next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export const authTeam = async (req: Request, res: Response) => {
  const authToken = req.session?.authToken;

  if (!authToken) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not found');
    }
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET) as {
      permissions: number;
      team_id: number;
    };
    if (decodedToken.permissions !== 1) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    return res.json({ team_id: decodedToken.team_id });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};

export const whoami = async (req: Request, res: Response) => {
  const authToken = req.session?.authToken;

  if (!authToken) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not found');
    }
    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET) as {
      id: number;
      username: string;
      role: string;
      permissions: number;
      team_id: number;
    };
    return res.json({
      id: decodedToken.id,
      username: decodedToken.username,
      role: decodedToken.role,
      permissions: decodedToken.permissions,
      team_id: decodedToken.team_id,
    });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
