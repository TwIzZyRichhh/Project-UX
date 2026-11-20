import jwt from 'jsonwebtoken';
import 'dotenv/config';
import {findUserByUsernameAndPassword} from '../users/model.ts';
import type {Request, Response} from 'express';

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  throw new Error('JWT_SECRET puuttuu .env-tiedostosta');
}

const postLogin = async (req: Request, res: Response) => {
    try {
        const user = await findUserByUsernameAndPassword(req.body)
        if (user) {
            const token = jwt.sign({...user}, jwtSecret, {expiresIn: '24h'});
            res.json({...user, token});
        } else {
            res.sendStatus(401);
        }
    } catch(error) {
        console.error(error);
        res.sendStatus(500)
    }
};

const getMe = async(req: Request, res: Response) => {
    if (req.user) {
        res.json({message: 'token ok', user: req.user})
    } else {
        res.sendStatus(401)
    }
};

export {postLogin, getMe};