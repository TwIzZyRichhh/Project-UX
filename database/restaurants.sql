DROP DATABASE IF EXISTS ProjectDB;
CREATE DATABASE ProjectDB;
USE ProjectDB;

CREATE TABLE restaurants (
  restaurant_id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(100) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  restaurant_type VARCHAR(50) NOT NULL,
  restaurant_description VARCHAR(200) NOT NULL,
  PRIMARY KEY (restaurant_id)
);

CREATE TABLE food (
  food_id INT NOT NULL AUTO_INCREMENT,
  price DECIMAL(6,2) NOT NULL,
  special_diet VARCHAR(50) NOT NULL,
  food_name VARCHAR(50) NOT NULL,
  PRIMARY KEY (food_id)
);

CREATE TABLE menu (
  menu_id INT NOT NULL AUTO_INCREMENT,
  menu_description VARCHAR(50) NOT NULL,
  food_id INT NOT NULL,
  restaurant_id INT NOT NULL,
  PRIMARY KEY (menu_id),
  FOREIGN KEY (food_id) REFERENCES food(food_id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id)
);

CREATE TABLE `user` (
  user_id INT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(50) NOT NULL,
  user_email VARCHAR(100) NOT NULL UNIQUE,
  user_role VARCHAR(50) NOT NULL,
  user_address VARCHAR(100) NULL,
  PRIMARY KEY (user_id)
);

CREATE TABLE orders (
  order_id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  restaurant_id INT NOT NULL,
  food_id INT NOT NULL,
  PRIMARY KEY (order_id),
  FOREIGN KEY (user_id) REFERENCES `user`(user_id),
  FOREIGN KEY (restaurant_id) REFERENCES restaurants(restaurant_id),
  FOREIGN KEY (food_id) REFERENCES food(food_id)
);