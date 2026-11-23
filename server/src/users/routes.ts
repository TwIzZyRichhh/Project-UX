import express from 'express';
import {getAllUsers, getUser, postUser} from './controller.ts';

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(postUser);
userRouter.route('/:id').get(getUser);

export default userRouter;