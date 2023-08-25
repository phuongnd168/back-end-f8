CREATE DATABASE database_02_phuong;
use database_02_phuong;
CREATE TABLE customers(
    id INT NOT NULL PRIMARY KEY,
    name varchar(50) NOT NULL,
    email varchar(50) NOT NULL,
    phone varchar(15) NOT NULL,
    created_at timestamp,
    updated_at timestamp,
    CONSTRAINT customers_email_phone_unique UNIQUE(email, phone)
);

CREATE TABLE products(
    id INT NOT NULL PRIMARY KEY,
    name varchar(50) NOT NULL,
    code char(5) NOT NULL,
    price float NOT NULL,
    quantity int,
    total_quantity_product INT,
    total_money_product float,
    created_at timestamp,
    updated_at timestamp
);


CREATE TABLE orders(
    id INT NOT NULL PRIMARY KEY,
    customers_id INT,
    total_products INT,
    total_money_order float,
    status_order tinyint,
    created_order timestamp,
    updated_order timestamp,
    FOREIGN KEY (customers_id) REFERENCES customers(id)

);

CREATE TABLE detail_order(
    id INT NOT NULL PRIMARY KEY,
    customers_id INT,
    products_id INT,
    status_order tinyint,
    created_order timestamp,
    updated_order timestamp,
    FOREIGN KEY (customers_id) REFERENCES customers(id),
    FOREIGN KEY (products_id) REFERENCES products(id)

);
DESCRIBE orders;
DESCRIBE detail_order;
