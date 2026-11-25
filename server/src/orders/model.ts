import type {RowDataPacket} from 'mysql2';
import db from '../utils/database.ts';

export const fetchOrders = async () => {
  try {
    const [rows] = await db.query<
      RowDataPacket[]
    >(`      SELECT r.name AS restaurant_name, f.food_name, f.price, u.user_name
      FROM orders o
      JOIN restaurants r ON r.restaurant_id = o.restaurant_id
      JOIN user u ON u.user_id = o.user_id
      JOIN food f ON f.food_id = o.food_id
      `);
    return {ok: true, data: rows};
  } catch (e) {
    console.error('error', e);
    return {ok: false, error: 'Database error'};
  }
};

export const fetchOrder = async (id: number) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      `
      SELECT r.name AS restaurant_name, f.food_name, f.price
      FROM orders o
      JOIN restaurants r ON r.restaurant_id = o.restaurant_id
      JOIN food f ON f.food_id = o.food_id
      WHERE o.order_id = ?
      `,
      [id],
    );
    return {ok: true, data: rows};
  } catch (e) {
    console.error('error', e);
    return {ok: false, error: 'Database error'};
  }
};
