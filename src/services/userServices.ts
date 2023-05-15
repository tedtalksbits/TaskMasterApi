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

  async findOneById(id: number): Promise<UserDetails> {
    const [rows]: StoredProcedureResponse = await dbConnection.query(
      'CALL sp_get_user_details_by_id(?)',
      [id]
    );
    return rows[0][0];
  }

  async findOneByEmail(email: string): Promise<UserDetails> {
    const [rows]: StoredProcedureResponse = await dbConnection.query(
      'CALL sp_get_user_details_by_email(?)',
      [email]
    );
    return rows[0][0];
  }

  async findOneByPhone(phone: string): Promise<UserDetails> {
    const [rows]: StoredProcedureResponse = await dbConnection.query(
      'CALL sp_get_user_details_by_phone(?)',
      [phone]
    );
    return rows[0][0];
  }

  async findOneByUsername(username: string): Promise<UserDetails> {
    const [rows]: StoredProcedureResponse = await dbConnection.query(
      'CALL sp_get_user_details_by_username(?)',
      [username]
    );
    console.log(rows);
    return rows[0][0];
  }

  async insertOne(user: InsertUser): Promise<number> {
    const [rows]: StoredProcedureResponse = await dbConnection.query(
      'CALL sp_insert_user(?,?,?,?,?,?)',
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
    return rows;
  }
}
