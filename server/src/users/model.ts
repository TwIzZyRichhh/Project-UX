import type {RowDataPacket} from 'mysql2';
import db from '../utils/database.ts';

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
