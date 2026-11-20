import jwt from 'jsonwebtoken';
import 'dotenv/config';
import type {NextFunction, Request, Response} from 'express';
import {findRestaurantByID} from '../restaurants/model.ts';

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET puuttuu .env-tiedostosta');
}

const authorizeMediaOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await findRestaurantByID(Number(req.params.id));

    if (!result.ok) {
      const notFound = result.error === 'Ravintolaa ei löytynyt';
      return res.status(notFound ? 404 : 500).json({message: result.error});
    }

    if (result.data?.user_id !== req.user?.user_id) {
      return res.status(403).json({message: 'You are not the owner of this restaurant'});
    }
    next();
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const authorizeSelf = (req: Request, res: Response, next: NextFunction) => {
  if (Number(req.params.id) !== req.user?.user_id) {
    return res.status(403).json({message: 'This is not your account'});
  }
  next();
};

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401);
  }
  try {
    req.user = jwt.verify(token, jwtSecret) as Express.Request['user'];
    next();
  } catch (err) {
    res.status(403).send({message: 'Invalid token'});
  }
};

export {authenticateToken, authorizeMediaOwner, authorizeSelf};