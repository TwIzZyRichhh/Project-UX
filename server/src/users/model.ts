import type {RowDataPacket} from 'mysql2';
import db from '../utils/database.ts';
import crypto from 'node:crypto';

type Credentials = {username?: string; password?: string};

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
        return {ok: false, error: 'Käyttäjää ei löytynyt'}
    }

    return {ok: true, data: rows};
  } catch (e) {
    console.error('error', e);
    return {ok: false, error: e};
  }
};

export const findUserByUsernameAndPassword = async (credentials: Credentials) => {
  const {username, password} = credentials;
  if (!username || !password) return null;

  const [rows] = await db.query<RowDataPacket[]>(
    `SELECT user_id, user_name, user_password, user_email, user_role, user_address
     FROM \`user\` WHERE user_name = ?`,
    [username],
  );
  const user = rows[0];
  if (!user || !verifyPassword(password, user.user_password)) return null;

  const {user_password: _pw, ...userWithoutPassword} = user;
  return userWithoutPassword;
};

const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
};

const verifyPassword = (password: string, stored: string | null) => {
  const [salt, hash] = (stored ?? '').split(':');
  if (!salt || !hash) return false;
  const test = crypto.scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, 'hex');
  return expected.length === test.length && crypto.timingSafeEqual(expected, test);
};