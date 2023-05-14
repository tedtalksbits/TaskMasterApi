import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { PoolOptions } from 'mysql2/typings/mysql/lib/Pool';

dotenv.config();

if (
  !process.env.MYSQL_HOST ||
  !process.env.MYSQL_USER ||
  !process.env.MYSQL_PASS ||
  !process.env.MYSQL_DB
) {
  throw new Error('MYSQL config is not defined');
}
const dbConfig: PoolOptions = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASS,
  database: process.env.MYSQL_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  maxIdle: 10,
  idleTimeout: 60000, // 60 seconds
};

export const dbConnection = mysql.createPool(dbConfig);

dbConnection.on('connection', (connection) => {
  console.log('DB Connection established' + connection.threadId);
});
