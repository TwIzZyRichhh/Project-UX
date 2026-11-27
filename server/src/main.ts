import express, {type Express} from 'express';

import restaurantRouter from './restaurants/routes.ts';
import userRouter from './users/routes.ts';
import authRouter from './authentication/router.ts';
const app: Express = express();
import cors from 'cors';
import orderRouter from './orders/routes.ts';

app.use(cors());

app.use(express.json());

app.use('/auth', authRouter);
app.use('/restaurants', restaurantRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
