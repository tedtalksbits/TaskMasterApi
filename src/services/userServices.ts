import { UserDetails } from '../models/User';
import { dbConnection } from '../config/dbConfig';
import { StoredProcedureResponse } from '../types/index';

export type InsertUser = {
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  phone?: string;
  email?: string;
};

export class UserService {
  async findAll() {
    const [rows] = await dbConnection.query('SELECT * FROM users');
    return rows;
  }

  async findOneById(id: number): Promise<UserDetails | null> {
    const [rows]: StoredProcedureResponse = await dbConnection.query(
      'SELECT * FROM users WHERE id = ?',
      [id]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows;
  }

  async findOneByEmail(email: string): Promise<UserDetails | null> {
    const [rows]: StoredProcedureResponse = await dbConnection.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  }

  async findOneByPhone(phone: string): Promise<UserDetails | null> {
    const [rows]: StoredProcedureResponse = await dbConnection.query(
      'SELECT * FROM users WHERE phone = ?',
      [phone]
    );
    if (rows.length === 0) {
      return null;
    }
    return rows;
  }

  async findOneByUsername(username: string): Promise<UserDetails | null> {
    const [rows]: StoredProcedureResponse = await dbConnection.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    console.log(rows);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  }

  async insertOne(user: InsertUser): Promise<number> {
    const [rows]: StoredProcedureResponse = await dbConnection.query(
      'INSERT INTO users (username, first_name, last_name, password, phone, email) VALUES (?, ?, ?, ?, ?, ?)',
      [
        user.username,
        user.first_name,
        user.last_name,
        user.password,
        user.phone,
        user.email,
      ]
    );
    console.log(rows);
    if (rows.length === 0) {
      return 0;
    }

    return rows;
  }
}
