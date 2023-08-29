CREATE DATABASE database_03_phuong;
use database_03_phuong;
CREATE TABLE `product_properties` (
  `id` int PRIMARY KEY NOT NULL auto_increment,
  `color` varchar(20) NOT NULL,
  `brand` varchar(20) NOT NULL,
  `RAM` varchar(20) NOT NULL,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `products` (
  `id` int PRIMARY KEY NOT NULL auto_increment,
  `code` char(5) NOT NULL,
  `name` varchar(100) NOT NULL,
  `cost` float NOT NULL,
  `price` float NOT NULL,
  `description` text,
  `quantity` int,
  `user_manual` text,
  `product_properties_id` int NOT NULL,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `product_infor` (
  `id` int PRIMARY KEY NOT NULL auto_increment,
  `product_id` int NOT NULL,
  `created_at` timestamp,
  `updated_at` timestamp
);

ALTER TABLE `products` ADD FOREIGN KEY (`product_properties_id`) REFERENCES `product_properties` (`id`);

ALTER TABLE `product_infor` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);


INSERT INTO product_properties(color, brand, RAM, created_at, updated_at)
VALUES("Red", "Apple", "8GB", NOW(), NOW());
INSERT INTO product_properties(color, brand, RAM, created_at, updated_at)
VALUES("Black", "Apple", "4GB", NOW(), NOW());
INSERT INTO product_properties(color, brand, RAM, created_at, updated_at)
VALUES("Blue", "Apple", "2GB", NOW(), NOW());

INSERT INTO products(code, name, cost, price, description, quantity, user_manual, product_properties_id, created_at, updated_at)
VALUES("N23H2", "Iphone 14 Pro Max", 20000000, 18000000, "Polished glass and stainless steel back design", 20, "Unbox", 1, NOW(), NOW());
INSERT INTO products(code, name, cost, price, description, quantity, user_manual, product_properties_id, created_at, updated_at)
VALUES("N42H2", "Iphone 13 Pro Max", 16000000, 15000000, "Polished glass back design", 5, "Unbox", 2, NOW(), NOW());
INSERT INTO products(code, name, cost, price, description, quantity, user_manual, product_properties_id, created_at, updated_at)
VALUES("N47H2", "Iphone 12 Pro Max", 13000000, 11000000, "Stainless Steel", 0, "Unbox", 3, NOW(), NOW());


SELECT * FROM products;
SELECT * FROM product_properties WHERE id = 2;  
SELECT * FROM products WHERE quantity != 0; 