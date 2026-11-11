import express from 'express';
import {getAllRestaurants, getRestaurant} from './controller.ts';

const restaurantRouter = express.Router();

restaurantRouter.route('/').get(getAllRestaurants);
restaurantRouter.route('/:id').get(getRestaurant);

export default restaurantRouter;
