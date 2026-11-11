import express from 'express';
import {
  getAllRestaurants,
  getRestaurant,
  getRestaurantMenu,
} from './controller.ts';

const restaurantRouter = express.Router();

restaurantRouter.route('/').get(getAllRestaurants);
restaurantRouter.route('/:id').get(getRestaurant);
restaurantRouter.route('/menu/:id').get(getRestaurantMenu);

export default restaurantRouter;
