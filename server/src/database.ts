
import mysql from 'mysql2/promise';
import 'dotenv/config';


console.log('DB HOST:', process.env.DB_HOST);
console.log('DB USER:', process.env.DB_USER);
console.log('DB NAME:', process.env.DB_NAME);
console.log('PASSWORD EXISTS:', !!process.env.DB_PASSWORD);

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});

export default db;
