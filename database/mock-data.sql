INSERT INTO `user` (user_name, user_email, user_password, user_role, user_address) VALUES
('Aino Virtanen',  'aino.virtanen@example.com',  '351aeeef937dafa09a9f3a138549bc26:d59e7b1ee2e252a7b9b5ac386b639ce3ed6857a1d25008c0c4cc88e45e5c8a7d4619bc551e5b0e82055129a5517b75522fbd95256f57bfc86c2ac6959bd9108d', 'customer', 'Mannerheimintie 12 A 5, 00100 Helsinki'),
('Mikko Korhonen', 'mikko.korhonen@example.com', '57f65436d0c81265f8da41273696c0ab:8882eb2679828783c67917f80f276ffb0c237accea26e7344e086a85771e8084f2f48675a2eafdbcb72850dc6a6b7b2fe2c9bfc60c5e90ee91aaa9795dc0b4ff', 'customer', 'Fredrikinkatu 34 B 12, 00100 Helsinki'),
('Robo Admin',     'admin@robotdelivery.example', '2d00083be58b672ca695594bc2882c69:fae8080dd24d2714003597876c866bb090465377ab517a097867445f787c1b4d8056cab0d8ab070b1214bf9fe3bd2ea52ceb44bc943c0c43ea241575b1567068', 'admin', NULL);

INSERT INTO restaurants (name, location, phone_number, restaurant_type, restaurant_description) VALUES
('Sushi Bento Kamppi',   'Urho Kekkosen katu 1, 00100 Helsinki', '+358 40 111 2233', 'Japanese',
 'Fresh sushi and bento boxes, popular for quick lunches.'),
('Pizzeria Napoli',      'Fredrikinkatu 50, 00100 Helsinki',     '+358 40 222 3344', 'Italian',
 'Stone-oven pizzas made with imported Italian ingredients.'),
('Green Bowl',           'Annankatu 20, 00100 Helsinki',         '+358 40 333 4455', 'Vegan / Healthy',
 'Plant-based bowls, salads and smoothies.'),
('Burger Joint Kluuvi',  'Aleksanterinkatu 17, 00100 Helsinki',  '+358 40 444 5566', 'American',
 'Juicy burgers, fries and milkshakes made from Finnish beef.'),
('Taj Mahal Curry House','Hämeentie 4, 00530 Helsinki',          '+358 40 555 6677', 'Indian',
 'Traditional North Indian curries, naan bread and tandoori dishes.'),
('Thai Orchid',          'Iso Roobertinkatu 9, 00120 Helsinki',  '+358 40 666 7788', 'Thai',
 'Authentic Thai street food with fresh herbs and adjustable spice level.'),
('Café Kaisla',          'Kauppatori 3, 00170 Helsinki',         '+358 40 777 8899', 'Café / Bakery',
 'Cozy waterfront café with Finnish pastries, soups and coffee.'),
('Taco Fiesta',          'Kalevankatu 31, 00100 Helsinki',       '+358 40 888 9900', 'Mexican',
 'Tacos, burritos and quesadillas with homemade salsas.');

INSERT INTO food (food_name, price, special_diet) VALUES
('Vegetable Maki Set',        9.90, 'vegan'),         -- 18
('Tuna Sashimi Plate',       14.90, 'lactose-free'),  -- 19
('Miso Soup',                 4.50, 'vegan'),         -- 20
('Salmon Avocado Roll',      10.90, 'lactose-free'),  -- 21
('Vegan Marinara Pizza',     10.90, 'vegan'),         -- 22
('Prosciutto e Funghi Pizza',14.20, 'none'),          -- 23
('Tiramisu',                  6.50, 'vegetarian'),    -- 24
('Quinoa Buddha Bowl',       12.90, 'vegan'),         -- 25
('Avocado Chickpea Salad',   10.50, 'vegan'),         -- 26
('Green Detox Smoothie',      6.50, 'vegan'),         -- 27
('Double Bacon Burger',      14.50, 'none'),          -- 28
('Sweet Potato Fries',        5.50, 'vegan'),         -- 29
('Chocolate Milkshake',       5.90, 'vegetarian'),    -- 30
('Butter Chicken',           13.90, 'gluten-free'),   -- 31
('Palak Paneer',             12.50, 'vegetarian'),    -- 32
('Garlic Naan',               3.50, 'vegetarian'),    -- 33
('Chana Masala',             11.90, 'vegan'),         -- 34
('Tom Yum Soup',             10.90, 'lactose-free'),  -- 35
('Vegetable Spring Rolls',    7.50, 'vegan'),         -- 36
('Massaman Curry',           13.50, 'lactose-free'),  -- 37
('Karelian Pie',              4.50, 'vegetarian'),    -- 38
('Rye Salmon Sandwich',       7.90, 'none'),          -- 39
('Blueberry Pie',             5.20, 'vegetarian'),    -- 40
('Vegan Lentil Soup',         8.90, 'vegan'),         -- 41
('Beef Quesadilla',          11.90, 'none'),          -- 42
('Veggie Burrito',           10.90, 'vegetarian'),    -- 43
('Guacamole & Chips',         6.90, 'vegan');         -- 44

INSERT INTO menu (menu_description, food_id, restaurant_id) VALUES
('Light and colourful',                 18, 1),
('Chef''s premium cut',                 19, 1),
('Perfect starter',                     20, 1),
('Creamy avocado with fresh salmon',    21, 1),
('Dairy-free classic',                  22, 2),
('Cured ham and mushrooms',             23, 2),
('Homemade dessert',                    24, 2),
('Protein-packed and filling',          25, 3),
('Crunchy and fresh',                   26, 3),
('Spinach, kale and apple',             27, 3),
('For the very hungry',                 28, 4),
('Crispy side dish',                    29, 4),
('Thick and creamy',                    30, 4),
('Tandoori-style, mild spice',          31, 5),
('Spinach and cottage cheese curry',    32, 5),
('Baked fresh in the tandoor',          33, 5),
('Chickpeas in spicy tomato sauce',     34, 5),
('Hot and sour with lemongrass',        35, 6),
('Served with sweet chili sauce',       36, 6),
('Mild, peanut and potato curry',       37, 6),
('Traditional rice pastry with egg butter', 38, 7),
('Open sandwich with dill cream',       39, 7),
('Wild Finnish blueberries',            40, 7),
('Warm and hearty',                     41, 7),
('Grilled with melted cheese',          42, 8),
('Beans, rice and fresh vegetables',    43, 8),
('Made fresh to order',                 44, 8);

INSERT INTO orders (user_id, restaurant_id, food_id) VALUES
(1, 1, 1),
(2, 2, 3),
(3, 3, 4),
(3, 2, 2),
(1, 4, 5),
(2, 5, 7),
(1, 6, 9),
(2, 7, 11),
(1, 8, 14);