import express from 'express';
import {getAllUsers, getUser} from './controller.ts';

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers);
userRouter.route('/:id').get(getUser);

export default userRouter;