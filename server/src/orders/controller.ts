import type {Request, Response} from 'express';
import {fetchOrder, fetchOrders} from './model.ts';

export const getOrders = async (_req: Request, res: Response) => {
  const result = await fetchOrders();
  if (!result.ok) {
    return res.status(500).json({message: result.error});
  }
  return res.json(result.data);
};

export const getOrderById = async (req: Request, res: Response) => {
  const result = await fetchOrder(Number(req.params.id));
  if (!result.ok) {
    return res.status(500).json({message: result.error});
  }
  return res.json(result.data);
};
