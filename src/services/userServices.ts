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
    // call sp_get_user_details_by_id stored procedure
    const [rows]: StoredProcedureResponse = await dbConnection.query(
      'CALL sp_get_user_details_by_id(?)',
      [id]
    );
    return rows[0][0];
  }
}
