import type {ResultSetHeader, RowDataPacket} from 'mysql2';
import bcrypt from 'bcrypt';
import db from '../utils/database.ts';

type Credentials = {username?: string; password?: string};
type NewUser = {username: string; email: string; password: string};

const SALT_ROUNDS = 10;

export const listUsers = async () => {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      `
      SELECT user_id, user_name, user_email, user_role, user_address
      FROM \`user\`;
      `,
    );
    return {ok: true, data: rows};
  } catch (e) {
    console.error('error', e);
    return {ok: false, error: 'Database error'};
  }
};

export const listUser = async (id: number) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      `
        SELECT user_id, user_name, user_email, user_role, user_address
        FROM \`user\`
        WHERE user_id = ?;
        `,
      [id],
    );

    if (rows.length === 0) {
      return {ok: false, error: 'Käyttäjää ei löytynyt'};
    }

    return {ok: true, data: rows};
  } catch (e) {
    console.error('error', e);
    return {ok: false, error: e};
  }
};

export const createUser = async ({username, email, password}: NewUser) => {
  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    const [result] = await db.query<ResultSetHeader>(
      `INSERT INTO \`user\` (user_name, user_email, user_password, user_role)
       VALUES (?, ?, ?, ?)`,
      [username, email, hash, 'customer'],
    );
    return {ok: true, data: {user_id: result.insertId}};
  } catch (error: any) {
    if (error.code === 'ER_DUP_ENTRY') {
      return {ok: false, error: 'duplicate'};
    }
    console.error('error', error);
    return {ok: false, error: 'Database error'};
  }
};

export const findUserByUsernameAndPassword = async (
  credentials: Credentials,
) => {
  const {username, password} = credentials;
  if (!username || !password) return null;

  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT user_id, user_name, user_password, user_email, user_role, user_address
     FROM \`user\` WHERE user_name = ?`,
    [username],
  );
  const user = rows[0];
  if (!user || !(await verifyPassword(password, user.user_password))) {
    return null;
  }

  const {user_password: _pw, ...userWithoutPassword} = user;
  return userWithoutPassword;
};

const verifyPassword = async (password: string, stored: string | null) => {
  if (!stored) return false;
  return bcrypt.compare(password, stored);
};