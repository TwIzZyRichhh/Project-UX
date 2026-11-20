/* Käyttäjä selaa ravintoloita */
SELECT restaurant_id, name, location, restaurant_type, restaurant_description
FROM restaurants
ORDER BY name;

/* Käyttäjä avaa ravintolan ja näkee sen menun */
SELECT r.name AS restaurant, m.menu_description, f.food_name, f.price, f.special_diet
FROM menu m
JOIN restaurants r ON r.restaurant_id = m.restaurant_id
JOIN food f ON f.food_id = m.food_id
WHERE r.restaurant_id = 1
ORDER BY f.food_name;

/* Käyttäjä filtteröi menun hinnan mukaan */
SELECT r.name AS restaurant, f.food_name, f.price
FROM menu m
JOIN restaurants r ON r.restaurant_id = m.restaurant_id
JOIN food f ON f.food_id = m.food_id
WHERE f.price < 10.00
ORDER BY f.price;

/* Käyttäjä filtteröi ruokavalion mukaan */
SELECT r.name AS restaurant, f.food_name, f.price, f.special_diet
FROM menu m
JOIN restaurants r ON r.restaurant_id = m.restaurant_id
JOIN food f ON f.food_id = m.food_id
WHERE f.special_diet LIKE '%vegan%'
ORDER BY r.name, f.food_name;

/* Ravintola muuttaa ruoan hintaa */
UPDATE food
SET price = 12.90
WHERE food_id = 3;

/* Käyttäjä muuttaa profiilin osoitetta */
UPDATE `user`
SET user_address = 'Mannerheimintie 10, Helsinki'
WHERE user_id = 2;

/* Käyttäjä peruuttaa tilauksen */
DELETE FROM orders
WHERE order_id = 5;

/* Käyttäjä poistaa tilinsä */
START TRANSACTION;
UPDATE restaurants SET user_id = NULL WHERE user_id = 3;
DELETE FROM orders WHERE user_id = 3;
DELETE FROM `user` WHERE user_id = 3;
COMMIT;