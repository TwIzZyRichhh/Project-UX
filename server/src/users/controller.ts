import type {Request, Response} from 'express';
import {createUser, listUser, listUsers} from './model.ts';

export const getAllUsers = async (_req: Request, res: Response) => {
  const result = await listUsers();
  if (!result.ok) {
    return res.status(500).json({message: result.error});
  }
  return res.json(result.data);
};

export const getUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) {
    return res.status(400).json({message: 'Invalid user id'});
  }

  const result = await listUser(id);
  if (!result.ok) {
    if (result.error === 'User not found') {
      return res.status(404).json({message: result.error});
    }
    return res.status(500).json({message: 'Internal server error'});
  }
  return res.json(result.data);
};

export const postUser = async (req: Request, res: Response) => {
  const {username, email, password} = req.body ?? {};

  if (
    typeof username !== 'string' ||
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    !username.trim() ||
    !email.includes('@') ||
    password.length < 8
  ) {
    return res.status(400).json({message: 'Invalid user data'});
  }

  const result = await createUser({
    username: username.trim(),
    email: email.trim(),
    password,
  });

  if (!result.ok) {
    if (result.error === 'duplicate') {
      return res.status(409).json({message: 'User already exists'});
    }
    return res.status(500).json({message: 'Internal server error'});
  }
  return res.status(201).json({message: 'User created', ...result.data});
};