import type {Request, Response} from 'express';
import {listRestaurant, listRestaurantMenu, listRestaurants} from './model.ts';

export const getAllRestaurants = async (_req: Request, res: Response) => {
  const result = await listRestaurants();
  if (!result.ok) {
    return res.status(500).json({message: result.error});
  }
  return res.json(result.data);
};

export const getRestaurant = async (req: Request, res: Response) => {
  const result = await listRestaurant(Number(req.params.id));
  if (!result.ok) {
    return res.status(500).json({message: result.error});
  }
  return res.json(result.data);
};

export const getRestaurantMenu = async (req: Request, res: Response) => {
  const result = await listRestaurantMenu(Number(req.params.id));
  if (!result.ok) {
    return res.status(500).json({message: result.error});
  }
  return res.json(result.data);
};
