import type {RowDataPacket} from 'mysql2';
import db from '../utils/database.ts';

export const listRestaurants = async () => {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT restaurant_id, name, location, restaurant_type, restaurant_description FROM restaurants',
    );
    return {ok: true, data: rows};
  } catch (e) {
    console.error('error', e);
    return {ok: false, error: e};
  }
};

export const listRestaurant = async (id: number) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT * FROM restaurants WHERE restaurant_id = ?',
      [id],
    );
    return {ok: true, data: rows};
  } catch (e) {
    console.error('error', e);
    return {ok: false, error: e};
  }
};

export const listRestaurantMenu = async (id: number) => {
  try {
    const [rows] = await db.query<RowDataPacket[]>(
      `
      SELECT m.menu_description, f.food_name, f.price, f.special_diet
      FROM menu m
      JOIN restaurants r ON r.restaurant_id = m.restaurant_id
      JOIN food f ON f.food_id = m.food_id
      WHERE r.restaurant_id = ?
      ORDER BY f.food_name;
      `,
      [id],
    );
    return {ok: true, data: rows};
  } catch (e) {
    console.error('error', e);
    return {ok: false, error: e};
  }
};
