import { UserDetails } from '../models/User';
import { dbConnection } from '../config/dbConfig';
// fix any type
type StoredProcedureResponse = [any, any[]];

export class UserService {
  async findAll() {
    const [rows] = await dbConnection.query('SELECT * FROM users');
    return rows;
  }

  async findOne(id: number): Promise<UserDetails> {
    const [rows]: StoredProcedureResponse = await dbConnection.query(
      'CALL sp_get_user_details_by_id(?)',
      [id]
    );
    return rows[0][0];
  }

  async insertOne(user: UserDetails): Promise<number> {
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
    return rows[0].inserted_id;
  }

  async findOneByUsername(username: string): Promise<UserDetails> {
    const [rows]: StoredProcedureResponse = await dbConnection.query(
      'CALL sp_get_user_details_by_username(?)',
      [username]
    );
    return rows[0][0];
  }
}
