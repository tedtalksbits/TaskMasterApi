import { UserDetails } from '../models/User';
import jwt from 'jsonwebtoken';
import { StoredProcedureResponse } from '../types/index';
import { dbConnection } from '../config/dbConfig';
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

  async loginUsernamePassword(
    username: string,
    password: string
  ): Promise<UserDetails> {
    const [rows]: StoredProcedureResponse = await dbConnection.query(
      'CALL sp_login_username_password(?,?)',
      [username, password]
    );
    return rows[0][0];
  }
}
