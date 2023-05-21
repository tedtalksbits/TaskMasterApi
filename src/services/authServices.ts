import { UserDetails } from '../models/User';
import jwt from 'jsonwebtoken';
type JWTOptions = {
  id: number;
  username: string;
  role: string;
  permissions: number;
  team_id: number;
};

export class AuthServices {
  generateAuthToken(user: UserDetails) {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        permissions: user.permissions,
        role: user.role,
        team_id: user.team_id,
      } as JWTOptions,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
  }

  verifyAuthToken(token: string) {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    return jwt.verify(token, process.env.JWT_SECRET) as JWTOptions;
  }
}
