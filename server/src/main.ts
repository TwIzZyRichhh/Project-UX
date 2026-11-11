import express, {type Express} from 'express';

import restaurantRouter from './restaurants/routes.ts';
import userRouter from './users/routes.ts';

const app: Express = express();

app.use(express.json());

app.use('/restaurants', restaurantRouter);
app.use('/users', userRouter);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
