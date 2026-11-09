INSERT INTO `user` (user_name, user_email, user_role, user_address) VALUES
('Aino Virtanen',  'aino.virtanen@example.com',  'customer', 'Mannerheimintie 12 A 5, 00100 Helsinki'),
('Mikko Korhonen', 'mikko.korhonen@example.com', 'customer', 'Fredrikinkatu 34 B 12, 00100 Helsinki'),
('Robo Admin',     'admin@robotdelivery.example', 'admin',   NULL);

INSERT INTO restaurants (name, location, phone_number, restaurant_type, restaurant_description) VALUES
('Sushi Bento Kamppi', 'Urho Kekkosen katu 1, 00100 Helsinki', '+358 40 111 2233', 'Japanese',
 'Fresh sushi and bento boxes, popular for quick lunches.'),
('Pizzeria Napoli',    'Fredrikinkatu 50, 00100 Helsinki',     '+358 40 222 3344', 'Italian',
 'Stone-oven pizzas made with imported Italian ingredients.'),
('Green Bowl',         'Annankatu 20, 00100 Helsinki',         '+358 40 333 4455', 'Vegan / Healthy',
 'Plant-based bowls, salads and smoothies.');

INSERT INTO food (food_name, price, special_diet) VALUES
('Salmon Nigiri Set',   12.90, 'lactose-free'),  -- 1
('Margherita Pizza',    11.90, 'vegetarian'),    -- 2
('Pepperoni Pizza',     13.50, 'none'),          -- 3
('Falafel Bowl',        12.50, 'vegan');         -- 4

INSERT INTO menu (menu_description, food_id, restaurant_id) VALUES
('Lunch special, ready in 10 min', 1, 1),
('Classic pizza',                  2, 2),
('Best seller',                    3, 2),
('Chef recommendation',            4, 3);

INSERT INTO orders (user_id, restaurant_id, food_id) VALUES
(1, 1, 1),
(2, 2, 3),
(3, 3, 4),
(3, 2, 2);