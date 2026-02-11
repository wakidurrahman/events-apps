# MySQL Essential Training - Complete Guide

## MySQL Essential Training

1. Overview of SQL

- A brief overview of SQL
- Database organization
- Selecting rows
- Selecting columns
- Counting rows
- Inserting data
- Updating data
- Deleting data
- Joining queries across tables
- Finding databases, tables, and columns

2. Data Types

- What are data types?
- The CREATE TABLE statement
- Numeric types
- Date and time types
- String types
- Enumeration types
- The SERIAL type alias

3. Operators and Functions

- Comparison operators
- Logical operators
- Arithmetic operators
- Operator precedence
- The CASE statement
- The IF function

4. Sring Functions

- String comparisons
- Regular expressions
- String concatenation
- Numeric conversions
- Trimming and padding
- Case conversion
- Substrings
- Soundex

5. Math Functions

- Value functions
- Basic math
- Simple trigonometry
- Logarithms
- Radians and degrees

6. Differences from Standard SQL

- String concatenation
- Quote marks
- Integer division
- Comments

Conclusion Thank you

markdown

## Using shop_shine E-commerce Database

---

## Table of Contents

1. [Overview of SQL](#1-overview-of-sql)
2. [Data Types](#2-data-types)
3. [Operators and Functions](#3-operators-and-functions)
4. [String Functions](#4-string-functions)
5. [Math Functions](#5-math-functions)
6. [Differences from Standard SQL](#6-differences-from-standard-sql)

---

## Database Setup

First, create the shop_shine database and tables:

```sql
-- Create the database
CREATE DATABASE shop_shine;
USE shop_shine;

-- Create categories table
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create products table
CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT DEFAULT 0,
    category_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

-- Create customers table
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(50),
    state VARCHAR(50),
    zip_code VARCHAR(10),
    country VARCHAR(50) DEFAULT 'USA',
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    total_amount DECIMAL(10, 2) DEFAULT 0.00,
    shipping_address TEXT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Create order_items table
CREATE TABLE order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Create payments table
CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    payment_method ENUM('credit_card', 'debit_card', 'paypal', 'bank_transfer', 'cash') NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

-- Create reviews table
CREATE TABLE reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    customer_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);
```

### Sample Data for Practice

```sql
-- Insert categories
INSERT INTO categories (category_name, description) VALUES
('Electronics', 'Electronic devices and accessories'),
('Clothing', 'Apparel and fashion items'),
('Books', 'Physical and digital books'),
('Home & Garden', 'Home improvement and gardening supplies'),
('Sports', 'Sports equipment and accessories');

-- Insert products
INSERT INTO products (product_name, description, price, stock_quantity, category_id) VALUES
('Laptop Pro 15', 'High-performance laptop with 16GB RAM', 1299.99, 50, 1),
('Wireless Mouse', 'Ergonomic wireless mouse', 29.99, 200, 1),
('Cotton T-Shirt', 'Comfortable cotton t-shirt', 19.99, 150, 2),
('Running Shoes', 'Professional running shoes', 89.99, 75, 5),
('Python Programming Book', 'Learn Python from basics to advanced', 39.99, 100, 3),
('Garden Hose 50ft', 'Durable garden hose', 24.99, 80, 4),
('Yoga Mat', 'Non-slip yoga mat', 34.99, 120, 5),
('LED Desk Lamp', 'Adjustable LED desk lamp', 45.99, 60, 1);

-- Insert customers
INSERT INTO customers (first_name, last_name, email, phone, address, city, state, zip_code) VALUES
('John', 'Doe', 'john.doe@email.com', '555-0101', '123 Main St', 'New York', 'NY', '10001'),
('Jane', 'Smith', 'jane.smith@email.com', '555-0102', '456 Oak Ave', 'Los Angeles', 'CA', '90001'),
('Mike', 'Johnson', 'mike.j@email.com', '555-0103', '789 Pine Rd', 'Chicago', 'IL', '60601'),
('Sarah', 'Williams', 'sarah.w@email.com', '555-0104', '321 Elm St', 'Houston', 'TX', '77001'),
('David', 'Brown', 'david.b@email.com', '555-0105', '654 Maple Dr', 'Phoenix', 'AZ', '85001');

-- Insert orders
INSERT INTO orders (customer_id, status, total_amount, shipping_address) VALUES
(1, 'delivered', 1329.98, '123 Main St, New York, NY 10001'),
(2, 'shipped', 89.99, '456 Oak Ave, Los Angeles, CA 90001'),
(3, 'processing', 104.97, '789 Pine Rd, Chicago, IL 60601'),
(1, 'pending', 45.99, '123 Main St, New York, NY 10001'),
(4, 'delivered', 39.99, '321 Elm St, Houston, TX 77001');

-- Insert order_items
INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal) VALUES
(1, 1, 1, 1299.99, 1299.99),
(1, 2, 1, 29.99, 29.99),
(2, 4, 1, 89.99, 89.99),
(3, 3, 2, 19.99, 39.98),
(3, 7, 1, 34.99, 34.99),
(3, 2, 1, 29.99, 29.99),
(4, 8, 1, 45.99, 45.99),
(5, 5, 1, 39.99, 39.99);

-- Insert payments
INSERT INTO payments (order_id, payment_method, amount, status) VALUES
(1, 'credit_card', 1329.98, 'completed'),
(2, 'paypal', 89.99, 'completed'),
(3, 'debit_card', 104.97, 'completed'),
(4, 'credit_card', 45.99, 'pending'),
(5, 'bank_transfer', 39.99, 'completed');

-- Insert reviews
INSERT INTO reviews (product_id, customer_id, rating, review_text) VALUES
(1, 1, 5, 'Excellent laptop! Very fast and reliable.'),
(2, 1, 4, 'Good mouse, comfortable to use.'),
(4, 2, 5, 'Best running shoes I have ever owned!'),
(5, 4, 5, 'Great book for learning Python.'),
(7, 3, 4, 'Good quality yoga mat.');
```

---

## 1. Overview of SQL

### 1.1 A Brief Overview of SQL

**Description:**
SQL (Structured Query Language) is a standardized language for managing and manipulating relational databases. It allows you to create, read, update, and delete data (CRUD operations).

**Key Concepts:**

- **SQL** is declarative - you specify _what_ you want, not _how_ to get it
- Used for data definition (DDL), data manipulation (DML), and data control (DCL)
- Case-insensitive for keywords (SELECT = select = SeLeCt)

**Example:**

```sql
-- Simple query to see all products
SELECT * FROM products;

-- Get database version
SELECT VERSION();

-- Get current date and time
SELECT NOW();
```

**Practice Query:**

```sql
-- See what databases exist
SHOW DATABASES;

-- Use our shop_shine database
USE shop_shine;

-- See all tables in current database
SHOW TABLES;
```

---

### 1.2 Database Organization

**Description:**
A MySQL database is organized hierarchically: Server → Databases → Tables → Rows & Columns. Understanding this structure helps you navigate and manage data effectively.

**Key Concepts:**

- **Server**: MySQL installation (can host multiple databases)
- **Database**: Collection of related tables (e.g., shop_shine)
- **Table**: Collection of related data (e.g., customers, products)
- **Row**: Single record in a table
- **Column**: Single field in a table

**Example:**

```sql
-- Show all databases on the server
SHOW DATABASES;

-- Show all tables in shop_shine database
USE shop_shine;
SHOW TABLES;

-- Show structure of a specific table
DESCRIBE customers;
-- OR
SHOW COLUMNS FROM customers;
```

**Practice Query:**

```sql
-- Get detailed information about products table
SHOW CREATE TABLE products;

-- See table structure with data types
DESCRIBE orders;

-- List all tables with additional information
SHOW TABLE STATUS;
```

---

### 1.3 Selecting Rows

**Description:**
The SELECT statement retrieves rows from a table. You can filter rows using the WHERE clause to get specific records based on conditions.

**Key Concepts:**

- Use `WHERE` to filter rows
- Combine multiple conditions with `AND`, `OR`
- Common operators: `=`, `!=`, `<`, `>`, `<=`, `>=`

**Example:**

```sql
-- Get all customers
SELECT * FROM customers;

-- Get customers from a specific city
SELECT * FROM customers
WHERE city = 'New York';

-- Get customers from New York OR Los Angeles
SELECT * FROM customers
WHERE city = 'New York' OR city = 'Los Angeles';

-- Get customers from California
SELECT * FROM customers
WHERE state = 'CA';
```

**Practice Query:**

```sql
-- Get all products with price less than $50
SELECT * FROM products
WHERE price < 50;

-- Get products with stock quantity greater than 100
SELECT * FROM products
WHERE stock_quantity > 100;

-- Get orders with status 'delivered'
SELECT * FROM orders
WHERE status = 'delivered';

-- Get products in category_id 1 (Electronics) with price > $100
SELECT * FROM products
WHERE category_id = 1 AND price > 100;

-- Get orders that are either 'pending' or 'processing'
SELECT * FROM orders
WHERE status = 'pending' OR status = 'processing';
```

---

### 1.4 Selecting Columns

**Description:**
Instead of selecting all columns with `*`, you can specify which columns to retrieve. This improves performance and makes results easier to read.

**Key Concepts:**

- List specific column names after SELECT
- Use column aliases with `AS` for better readability
- Can perform calculations on columns

**Example:**

```sql
-- Get only names and emails of customers
SELECT first_name, last_name, email
FROM customers;

-- Use aliases for better column names
SELECT
    first_name AS 'First Name',
    last_name AS 'Last Name',
    email AS 'Email Address'
FROM customers;

-- Get product names and prices
SELECT product_name, price
FROM products;
```

**Practice Query:**

```sql
-- Get customer names and cities
SELECT first_name, last_name, city, state
FROM customers;

-- Get product information with custom column names
SELECT
    product_name AS 'Product',
    price AS 'Price ($)',
    stock_quantity AS 'In Stock'
FROM products;

-- Get order summary information
SELECT
    order_id AS 'Order #',
    customer_id AS 'Customer',
    order_date AS 'Date',
    total_amount AS 'Total'
FROM orders;

-- Calculate price with 10% discount
SELECT
    product_name,
    price AS original_price,
    price * 0.9 AS discounted_price
FROM products;
```

---

### 1.5 Counting Rows

**Description:**
The COUNT() function returns the number of rows that match a specified criterion. It's useful for getting statistics about your data.

**Key Concepts:**

- `COUNT(*)` counts all rows
- `COUNT(column_name)` counts non-NULL values in that column
- Can combine with WHERE to count specific subsets

**Example:**

```sql
-- Count total number of customers
SELECT COUNT(*) FROM customers;

-- Count customers with custom column name
SELECT COUNT(*) AS total_customers
FROM customers;

-- Count customers in a specific city
SELECT COUNT(*) AS ny_customers
FROM customers
WHERE city = 'New York';
```

**Practice Query:**

```sql
-- Count total products
SELECT COUNT(*) AS total_products FROM products;

-- Count products in Electronics category (category_id = 1)
SELECT COUNT(*) AS electronics_count
FROM products
WHERE category_id = 1;

-- Count how many orders are delivered
SELECT COUNT(*) AS delivered_orders
FROM orders
WHERE status = 'delivered';

-- Count products with low stock (less than 100)
SELECT COUNT(*) AS low_stock_products
FROM products
WHERE stock_quantity < 100;

-- Count completed payments
SELECT COUNT(*) AS completed_payments
FROM payments
WHERE status = 'completed';

-- Count 5-star reviews
SELECT COUNT(*) AS five_star_reviews
FROM reviews
WHERE rating = 5;
```

---

### 1.6 Inserting Data

**Description:**
The INSERT statement adds new rows to a table. You can insert one row at a time or multiple rows in a single statement.

**Key Concepts:**

- Specify table name and columns to insert into
- Provide VALUES for each column
- Can omit columns with DEFAULT values or AUTO_INCREMENT
- Multiple rows can be inserted at once

**Example:**

```sql
-- Insert a new customer (single row)
INSERT INTO customers (first_name, last_name, email, phone, city, state, zip_code)
VALUES ('Alice', 'Cooper', 'alice.cooper@email.com', '555-0106', 'Boston', 'MA', '02101');

-- Insert without specifying all columns (using defaults)
INSERT INTO customers (first_name, last_name, email)
VALUES ('Bob', 'Dylan', 'bob.dylan@email.com');

-- Insert multiple rows at once
INSERT INTO categories (category_name, description)
VALUES
    ('Toys', 'Toys and games for all ages'),
    ('Beauty', 'Beauty and personal care products'),
    ('Automotive', 'Car parts and accessories');
```

**Practice Query:**

```sql
-- Insert a new product
INSERT INTO products (product_name, description, price, stock_quantity, category_id)
VALUES ('Mechanical Keyboard', 'RGB mechanical gaming keyboard', 129.99, 45, 1);

-- Insert multiple products
INSERT INTO products (product_name, price, stock_quantity, category_id)
VALUES
    ('USB Cable', 9.99, 500, 1),
    ('Notebook', 5.99, 300, 3),
    ('Water Bottle', 14.99, 150, 5);

-- Verify insertions
SELECT * FROM products
ORDER BY product_id DESC
LIMIT 5;

-- Insert a new customer with full details
INSERT INTO customers (first_name, last_name, email, phone, address, city, state, zip_code)
VALUES ('Emily', 'Davis', 'emily.davis@email.com', '555-0107', '999 Broadway', 'Seattle', 'WA', '98101');

-- Verify the insert
SELECT * FROM customers WHERE email = 'emily.davis@email.com';
```

---

### 1.7 Updating Data

**Description:**
The UPDATE statement modifies existing rows in a table. Always use a WHERE clause to specify which rows to update, or you'll update ALL rows!

**Key Concepts:**

- Use UPDATE with SET to change column values
- **CRITICAL**: Always include WHERE clause (unless you want to update all rows)
- Can update multiple columns at once
- Can use expressions and calculations

**Example:**

```sql
-- Update a single column for a specific customer
UPDATE customers
SET city = 'New York City'
WHERE customer_id = 1;

-- Update multiple columns
UPDATE customers
SET phone = '555-9999', state = 'NY'
WHERE customer_id = 1;

-- Update based on a condition
UPDATE products
SET stock_quantity = stock_quantity + 50
WHERE stock_quantity < 100;
```

**Practice Query:**

```sql
-- Update product price
UPDATE products
SET price = 1399.99
WHERE product_id = 1;

-- Verify the update
SELECT product_name, price FROM products WHERE product_id = 1;

-- Increase all product prices by 5%
UPDATE products
SET price = price * 1.05
WHERE category_id = 1;

-- Update order status
UPDATE orders
SET status = 'delivered'
WHERE order_id = 4;

-- Verify
SELECT order_id, status FROM orders WHERE order_id = 4;

-- Update customer address
UPDATE customers
SET address = '123 New Address St',
    city = 'Miami',
    state = 'FL',
    zip_code = '33101'
WHERE customer_id = 2;

-- Add stock to low-stock products
UPDATE products
SET stock_quantity = stock_quantity + 100
WHERE stock_quantity < 50;

-- Verify the changes
SELECT product_name, stock_quantity
FROM products
WHERE stock_quantity < 150
ORDER BY stock_quantity;
```

---

### 1.8 Deleting Data

**Description:**
The DELETE statement removes rows from a table. Like UPDATE, always use a WHERE clause unless you want to delete ALL rows!

**Key Concepts:**

- DELETE removes entire rows (not individual column values)
- **CRITICAL**: Always include WHERE clause (unless deleting all data)
- Cannot delete rows that are referenced by foreign keys
- Use TRUNCATE to quickly delete all rows

**Example:**

```sql
-- Delete a specific customer
DELETE FROM customers
WHERE customer_id = 100;

-- Delete based on condition
DELETE FROM products
WHERE stock_quantity = 0 AND price < 10;

-- Delete reviews older than a certain date
DELETE FROM reviews
WHERE review_date < '2024-01-01';
```

**Practice Query:**

```sql
-- First, insert a test record to delete
INSERT INTO customers (first_name, last_name, email)
VALUES ('Test', 'User', 'test.delete@email.com');

-- Find the test record
SELECT * FROM customers WHERE email = 'test.delete@email.com';

-- Delete the test record
DELETE FROM customers
WHERE email = 'test.delete@email.com';

-- Verify deletion
SELECT * FROM customers WHERE email = 'test.delete@email.com';

-- Delete products with zero stock (be careful with foreign keys!)
-- This might fail if products are referenced in order_items
DELETE FROM products
WHERE stock_quantity = 0 AND product_id NOT IN (SELECT DISTINCT product_id FROM order_items);

-- Delete pending orders older than 30 days
DELETE FROM orders
WHERE status = 'pending'
  AND order_date < DATE_SUB(NOW(), INTERVAL 30 DAY);
```

**⚠️ Important Safety Note:**

```sql
-- DANGEROUS! This deletes ALL rows
-- DELETE FROM customers;

-- SAFE: Always use WHERE
DELETE FROM customers WHERE customer_id = 999;

-- To delete all data and reset AUTO_INCREMENT
TRUNCATE TABLE table_name;
```

---

### 1.9 Joining Queries Across Tables

**Description:**
JOINs combine rows from two or more tables based on related columns. This is one of the most powerful features of SQL.

**Key Concepts:**

- **INNER JOIN**: Returns matching rows from both tables
- **LEFT JOIN**: Returns all rows from left table, matching rows from right
- **RIGHT JOIN**: Returns all rows from right table, matching rows from left
- **JOIN** condition uses ON clause

**Example:**

```sql
-- Get products with their category names
SELECT
    products.product_name,
    products.price,
    categories.category_name
FROM products
INNER JOIN categories ON products.category_id = categories.category_id;

-- Get orders with customer information
SELECT
    orders.order_id,
    customers.first_name,
    customers.last_name,
    orders.order_date,
    orders.total_amount
FROM orders
INNER JOIN customers ON orders.customer_id = customers.customer_id;
```

**Practice Query:**

```sql
-- Get all order details with customer names
SELECT
    o.order_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    o.order_date,
    o.status,
    o.total_amount
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
ORDER BY o.order_date DESC;

-- Get order items with product names and prices
SELECT
    oi.order_id,
    p.product_name,
    oi.quantity,
    oi.unit_price,
    oi.subtotal
FROM order_items oi
INNER JOIN products p ON oi.product_id = p.product_id;

-- Get reviews with customer names and product names
SELECT
    r.review_id,
    CONCAT(c.first_name, ' ', c.last_name) AS reviewer,
    p.product_name,
    r.rating,
    r.review_text,
    r.review_date
FROM reviews r
INNER JOIN customers c ON r.customer_id = c.customer_id
INNER JOIN products p ON r.product_id = p.product_id;

-- Complex join: Get complete order information
SELECT
    o.order_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer,
    o.order_date,
    p.product_name,
    oi.quantity,
    oi.unit_price,
    oi.subtotal,
    o.status
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
INNER JOIN order_items oi ON o.order_id = oi.order_id
INNER JOIN products p ON oi.product_id = p.product_id
ORDER BY o.order_id, oi.order_item_id;

-- LEFT JOIN: Show all products, even without orders
SELECT
    p.product_name,
    COUNT(oi.order_item_id) AS times_ordered
FROM products p
LEFT JOIN order_items oi ON p.product_id = oi.product_id
GROUP BY p.product_id, p.product_name
ORDER BY times_ordered DESC;
```

---

### 1.10 Finding Databases, Tables, and Columns

**Description:**
MySQL provides several commands to explore the database structure and find information about databases, tables, and columns.

**Key Concepts:**

- Use SHOW commands to explore database objects
- INFORMATION_SCHEMA database contains metadata
- DESCRIBE shows table structure

**Example:**

```sql
-- Show all databases
SHOW DATABASES;

-- Show all tables in current database
SHOW TABLES;

-- Show table structure
DESCRIBE products;

-- Show CREATE statement for a table
SHOW CREATE TABLE customers;
```

**Practice Query:**

```sql
-- List all databases on the server
SHOW DATABASES;

-- Switch to shop_shine database
USE shop_shine;

-- Show all tables
SHOW TABLES;

-- Get detailed table information
SHOW TABLE STATUS;

-- Describe specific table structure
DESCRIBE customers;
DESCRIBE orders;
DESCRIBE products;

-- Show columns from a table
SHOW COLUMNS FROM products;

-- Show indexes on a table
SHOW INDEX FROM customers;

-- Get table creation SQL
SHOW CREATE TABLE order_items;

-- Query INFORMATION_SCHEMA for table details
SELECT
    TABLE_NAME,
    TABLE_ROWS,
    AVG_ROW_LENGTH,
    DATA_LENGTH
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = 'shop_shine';

-- Get all columns in a table from INFORMATION_SCHEMA
SELECT
    COLUMN_NAME,
    DATA_TYPE,
    IS_NULLABLE,
    COLUMN_DEFAULT,
    COLUMN_KEY
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'shop_shine'
  AND TABLE_NAME = 'products';

-- Find all tables with a specific column name
SELECT
    TABLE_NAME,
    COLUMN_NAME
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'shop_shine'
  AND COLUMN_NAME LIKE '%customer%';

-- Show all foreign keys in database
SELECT
    TABLE_NAME,
    COLUMN_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = 'shop_shine'
  AND REFERENCED_TABLE_NAME IS NOT NULL;
```

---

## 2. Data Types

### 2.1 What Are Data Types?

**Description:**
Data types define what kind of data a column can hold. Choosing the right data type is important for data integrity, storage efficiency, and performance.

**Key Concepts:**

- Data types enforce rules on what values can be stored
- Different types use different amounts of storage
- Proper data types improve query performance
- Main categories: Numeric, Date/Time, String, and Special types

**Example:**

```sql
-- See data types in the products table
DESCRIBE products;

-- See how different types are used
SELECT
    COLUMN_NAME,
    DATA_TYPE,
    COLUMN_TYPE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'products' AND TABLE_SCHEMA = 'shop_shine';
```

**Practice Query:**

```sql
-- Examine data types across all tables
SELECT
    TABLE_NAME,
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH,
    NUMERIC_PRECISION,
    NUMERIC_SCALE
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'shop_shine'
ORDER BY TABLE_NAME, ORDINAL_POSITION;

-- Create a test table showing various data types
CREATE TABLE data_type_examples (
    -- Numeric types
    tiny_num TINYINT,
    small_num SMALLINT,
    medium_num MEDIUMINT,
    regular_num INT,
    big_num BIGINT,
    decimal_num DECIMAL(10, 2),
    float_num FLOAT,
    double_num DOUBLE,

    -- String types
    fixed_char CHAR(10),
    variable_char VARCHAR(100),
    tiny_text TINYTEXT,
    regular_text TEXT,
    medium_text MEDIUMTEXT,
    long_text LONGTEXT,

    -- Date and time types
    date_col DATE,
    time_col TIME,
    datetime_col DATETIME,
    timestamp_col TIMESTAMP,
    year_col YEAR,

    -- Other types
    enum_col ENUM('option1', 'option2', 'option3'),
    set_col SET('tag1', 'tag2', 'tag3'),
    bool_col BOOLEAN
);

-- View the table structure
DESCRIBE data_type_examples;

-- Drop the test table
DROP TABLE data_type_examples;
```

---

### 2.2 The CREATE TABLE Statement

**Description:**
CREATE TABLE statement defines a new table's structure, including column names, data types, constraints, and indexes.

**Key Concepts:**

- Specify column name and data type
- Add constraints (NOT NULL, UNIQUE, PRIMARY KEY, FOREIGN KEY)
- Set default values with DEFAULT
- Define AUTO_INCREMENT for automatic ID generation

**Example:**

```sql
-- Basic table creation
CREATE TABLE simple_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table with foreign key
CREATE TABLE product_images (
    image_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    is_primary BOOLEAN DEFAULT FALSE,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
```

**Practice Query:**

```sql
-- Create a table for customer addresses (one-to-many relationship)
CREATE TABLE customer_addresses (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    address_type ENUM('billing', 'shipping', 'both') NOT NULL,
    street_address VARCHAR(200) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(50) NOT NULL,
    zip_code VARCHAR(10) NOT NULL,
    country VARCHAR(50) DEFAULT 'USA',
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);

-- View the new table structure
DESCRIBE customer_addresses;

-- Create a wishlist table
CREATE TABLE wishlists (
    wishlist_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    product_id INT NOT NULL,
    added_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id),
    UNIQUE KEY unique_wishlist (customer_id, product_id)
);

-- Create a product inventory log table
CREATE TABLE inventory_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    change_type ENUM('restock', 'sale', 'return', 'adjustment') NOT NULL,
    quantity_change INT NOT NULL,
    old_quantity INT NOT NULL,
    new_quantity INT NOT NULL,
    changed_by VARCHAR(100),
    change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

-- Show all tables including new ones
SHOW TABLES;

-- Clean up test tables (optional)
-- DROP TABLE customer_addresses;
-- DROP TABLE wishlists;
-- DROP TABLE inventory_log;
```

---

### 2.3 Numeric Types

**Description:**
Numeric types store numbers. MySQL offers integer types (whole numbers) and floating-point types (decimals).

**Key Concepts:**

- **Integer types**: TINYINT, SMALLINT, MEDIUMINT, INT, BIGINT
- **Decimal types**: DECIMAL(M,D) - exact precision, FLOAT, DOUBLE - approximate
- UNSIGNED modifier for positive numbers only
- Choose size based on value range needed

**Type Ranges:**

- TINYINT: -128 to 127 (UNSIGNED: 0 to 255)
- SMALLINT: -32,768 to 32,767 (UNSIGNED: 0 to 65,535)
- MEDIUMINT: -8,388,608 to 8,388,607
- INT: -2,147,483,648 to 2,147,483,647
- BIGINT: Very large numbers
- DECIMAL(10,2): Up to 10 digits, 2 after decimal point

**Example:**

```sql
-- Create table demonstrating numeric types
CREATE TABLE numeric_examples (
    id INT AUTO_INCREMENT PRIMARY KEY,
    age TINYINT UNSIGNED,           -- 0-255, good for age
    quantity SMALLINT,               -- Small numbers
    price DECIMAL(10, 2),            -- Money (exact precision)
    weight DOUBLE,                   -- Scientific measurements
    discount_percent FLOAT           -- Percentages
);

-- Insert sample data
INSERT INTO numeric_examples (age, quantity, price, weight, discount_percent)
VALUES (25, 150, 99.99, 15.75, 10.5);

SELECT * FROM numeric_examples;
```

**Practice Query:**

```sql
-- View numeric columns in products table
SELECT product_id, product_name, price, stock_quantity
FROM products;

-- Arithmetic operations with numeric types
SELECT
    product_name,
    price,
    price * 1.08 AS price_with_tax,
    ROUND(price * 1.08, 2) AS rounded_price,
    stock_quantity,
    price * stock_quantity AS total_inventory_value
FROM products;

-- Using DECIMAL for financial calculations
SELECT
    order_id,
    total_amount,
    total_amount * 0.1 AS tax,
    total_amount * 1.1 AS total_with_tax,
    ROUND(total_amount * 1.1, 2) AS rounded_total
FROM orders;

-- Aggregating numeric data
SELECT
    category_id,
    COUNT(*) AS product_count,
    MIN(price) AS lowest_price,
    MAX(price) AS highest_price,
    AVG(price) AS average_price,
    SUM(stock_quantity) AS total_stock
FROM products
GROUP BY category_id;

-- Integer division and modulo
SELECT
    product_id,
    stock_quantity,
    stock_quantity DIV 10 AS full_packages,  -- Integer division
    stock_quantity MOD 10 AS remainder       -- Modulo (remainder)
FROM products;

-- Testing numeric ranges
SELECT
    customer_id,
    YEAR(CURRENT_DATE) - YEAR(registration_date) AS years_registered,
    TIMESTAMPDIFF(MONTH, registration_date, CURRENT_DATE) AS months_registered
FROM customers;
```

---

### 2.4 Date and Time Types

**Description:**
Date and time types store temporal data. Choose the appropriate type based on whether you need date, time, or both.

**Key Concepts:**

- **DATE**: YYYY-MM-DD (e.g., 2024-01-15)
- **TIME**: HH:MM:SS (e.g., 14:30:00)
- **DATETIME**: YYYY-MM-DD HH:MM:SS (e.g., 2024-01-15 14:30:00)
- **TIMESTAMP**: Auto-updates, timezone aware
- **YEAR**: Just the year (e.g., 2024)

**Example:**

```sql
-- Create table with various date/time types
CREATE TABLE datetime_examples (
    id INT AUTO_INCREMENT PRIMARY KEY,
    event_date DATE,
    event_time TIME,
    event_datetime DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    birth_year YEAR
);

-- Insert sample data
INSERT INTO datetime_examples (event_date, event_time, event_datetime, birth_year)
VALUES
    ('2024-01-15', '14:30:00', '2024-01-15 14:30:00', 1990),
    (CURDATE(), CURTIME(), NOW(), 1995);

SELECT * FROM datetime_examples;
```

**Practice Query:**

```sql
-- View date/time data in orders
SELECT
    order_id,
    customer_id,
    order_date,
    DATE(order_date) AS order_date_only,
    TIME(order_date) AS order_time_only,
    YEAR(order_date) AS order_year,
    MONTH(order_date) AS order_month,
    DAY(order_date) AS order_day
FROM orders;

-- Get current date and time functions
SELECT
    NOW() AS current_datetime,
    CURDATE() AS current_date,
    CURTIME() AS current_time,
    CURRENT_TIMESTAMP() AS timestamp_now,
    UTC_TIMESTAMP() AS utc_time;

-- Date calculations
SELECT
    customer_id,
    first_name,
    last_name,
    registration_date,
    DATEDIFF(NOW(), registration_date) AS days_registered,
    TIMESTAMPDIFF(MONTH, registration_date, NOW()) AS months_registered,
    DATE_ADD(registration_date, INTERVAL 1 YEAR) AS one_year_anniversary
FROM customers;

-- Extract parts of dates
SELECT
    order_id,
    order_date,
    DAYNAME(order_date) AS day_of_week,
    MONTHNAME(order_date) AS month_name,
    QUARTER(order_date) AS quarter,
    WEEK(order_date) AS week_number
FROM orders;

-- Format dates
SELECT
    order_id,
    order_date,
    DATE_FORMAT(order_date, '%W, %M %d, %Y') AS formatted_date,
    DATE_FORMAT(order_date, '%m/%d/%Y %h:%i %p') AS us_format
FROM orders;

-- Find orders in a date range
SELECT *
FROM orders
WHERE order_date BETWEEN '2024-01-01' AND '2024-12-31';

-- Find orders from last 30 days
SELECT *
FROM orders
WHERE order_date >= DATE_SUB(NOW(), INTERVAL 30 DAY);
```

---

### 2.5 String Types

**Description:**
String types store text data. Choose the appropriate type based on the maximum length and use case.

**Key Concepts:**

- **CHAR(n)**: Fixed length, faster for known-length data
- **VARCHAR(n)**: Variable length, more efficient for varying text
- **TEXT types**: TINYTEXT, TEXT, MEDIUMTEXT, LONGTEXT for large text
- **CHAR** uses full space, **VARCHAR** uses actual length + 1-2 bytes

**Size Limits:**

- CHAR/VARCHAR: up to 255/65,535 characters
- TINYTEXT: 255 characters
- TEXT: 65,535 characters
- MEDIUMTEXT: 16,777,215 characters
- LONGTEXT: 4,294,967,295 characters

**Example:**

```sql
-- Create table showing string types
CREATE TABLE string_examples (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code CHAR(10),              -- Fixed length (e.g., product codes)
    name VARCHAR(100),          -- Variable length names
    short_desc TINYTEXT,        -- Short descriptions
    description TEXT,           -- Regular text
    long_content MEDIUMTEXT     -- Large content
);

-- Insert data
INSERT INTO string_examples (code, name, short_desc, description)
VALUES
    ('PROD001   ', 'Test Product', 'A short description', 'A longer description with more details about the product.');

SELECT code, LENGTH(code) AS code_length, name FROM string_examples;
```

**Practice Query:**

```sql
-- View string columns and their lengths
SELECT
    product_name,
    LENGTH(product_name) AS name_length,
    description,
    LENGTH(description) AS desc_length
FROM products;

-- String concatenation
SELECT
    customer_id,
    CONCAT(first_name, ' ', last_name) AS full_name,
    CONCAT(city, ', ', state, ' ', zip_code) AS location,
    CONCAT_WS(' | ', first_name, last_name, email) AS customer_info
FROM customers;

-- String operations
SELECT
    product_name,
    UPPER(product_name) AS uppercase,
    LOWER(product_name) AS lowercase,
    LENGTH(product_name) AS length,
    CHAR_LENGTH(product_name) AS char_count
FROM products;

-- Substring operations
SELECT
    product_name,
    LEFT(product_name, 10) AS first_10_chars,
    RIGHT(product_name, 5) AS last_5_chars,
    SUBSTRING(product_name, 1, 15) AS first_15_chars
FROM products;

-- Search in strings
SELECT *
FROM products
WHERE product_name LIKE '%Laptop%';

SELECT *
FROM customers
WHERE email LIKE '%@email.com';

-- CHAR vs VARCHAR comparison
SELECT
    COLUMN_NAME,
    DATA_TYPE,
    CHARACTER_MAXIMUM_LENGTH
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_NAME = 'customers'
  AND DATA_TYPE IN ('char', 'varchar', 'text')
  AND TABLE_SCHEMA = 'shop_shine';
```

---

### 2.6 Enumeration Types

**Description:**
ENUM and SET are special string types for predefined values. ENUM allows one value from a list, SET allows multiple values.

**Key Concepts:**

- **ENUM**: Choose exactly ONE value from a predefined list
- **SET**: Choose ZERO or more values from a predefined list
- Values are stored as integers but displayed as strings
- More efficient than VARCHAR for fixed options

**Example:**

```sql
-- ENUM example - one choice only
CREATE TABLE employee (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    status ENUM('active', 'inactive', 'on_leave') DEFAULT 'active',
    shift ENUM('morning', 'afternoon', 'night')
);

-- SET example - multiple choices allowed
CREATE TABLE permissions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    roles SET('read', 'write', 'delete', 'admin')
);

-- Insert into ENUM
INSERT INTO employee (name, status, shift)
VALUES ('John Doe', 'active', 'morning');

-- Insert into SET (multiple values)
INSERT INTO permissions (username, roles)
VALUES ('alice', 'read,write,admin');

SELECT * FROM employee;
SELECT * FROM permissions;
```

**Practice Query:**

```sql
-- View ENUM columns in our database
SELECT
    order_id,
    status,
    total_amount
FROM orders;

-- Count by ENUM values
SELECT
    status,
    COUNT(*) AS order_count,
    SUM(total_amount) AS total_revenue
FROM orders
GROUP BY status;

-- Payment methods (ENUM)
SELECT
    payment_method,
    COUNT(*) AS payment_count,
    SUM(amount) AS total_amount
FROM payments
GROUP BY payment_method;

-- Filter by ENUM value
SELECT *
FROM orders
WHERE status = 'delivered';

SELECT *
FROM payments
WHERE payment_method IN ('credit_card', 'debit_card');

-- Update ENUM value
UPDATE orders
SET status = 'shipped'
WHERE order_id = 3 AND status = 'processing';

-- See ENUM definition
SHOW COLUMNS FROM orders LIKE 'status';
SHOW COLUMNS FROM payments LIKE 'payment_method';

-- Create table with both ENUM and SET
CREATE TABLE user_preferences (
    pref_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    newsletter_freq ENUM('daily', 'weekly', 'monthly', 'never') DEFAULT 'weekly',
    interests SET('electronics', 'clothing', 'books', 'sports', 'home') DEFAULT 'electronics',
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- Insert with SET (multiple values)
INSERT INTO user_preferences (customer_id, newsletter_freq, interests)
VALUES (1, 'weekly', 'electronics,books,sports');

-- Query SET values
SELECT * FROM user_preferences;

-- Find records with specific SET value
SELECT * FROM user_preferences
WHERE FIND_IN_SET('electronics', interests) > 0;
```

---

### 2.7 The SERIAL Type Alias

**Description:**
SERIAL is a shorthand alias for creating an auto-incrementing primary key. It's equivalent to `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE`.

**Key Concepts:**

- SERIAL = BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE
- Convenient shorthand for ID columns
- Automatically creates unique, incrementing values
- Commonly used for primary keys

**Example:**

```sql
-- Using SERIAL (shorthand)
CREATE TABLE with_serial (
    id SERIAL,
    name VARCHAR(100)
);

-- This is equivalent to:
CREATE TABLE without_serial (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE,
    name VARCHAR(100)
);

-- Both create the same structure
DESCRIBE with_serial;
DESCRIBE without_serial;
```

**Practice Query:**

```sql
-- View AUTO_INCREMENT columns in shop_shine
SELECT
    TABLE_NAME,
    COLUMN_NAME,
    DATA_TYPE,
    EXTRA
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = 'shop_shine'
  AND EXTRA LIKE '%auto_increment%';

-- Create table using SERIAL
CREATE TABLE activity_log (
    log_id SERIAL,
    activity_type VARCHAR(50),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DESCRIBE activity_log;

-- Insert data - ID auto-generates
INSERT INTO activity_log (activity_type, description)
VALUES
    ('login', 'User logged in'),
    ('purchase', 'Order placed'),
    ('logout', 'User logged out');

SELECT * FROM activity_log;

-- See current AUTO_INCREMENT value
SHOW TABLE STATUS WHERE Name = 'activity_log';

-- Reset AUTO_INCREMENT (careful with existing data!)
-- ALTER TABLE activity_log AUTO_INCREMENT = 1;

-- Compare with traditional approach
CREATE TABLE traditional_id (
    id INT AUTO_INCREMENT PRIMARY KEY,
    data VARCHAR(100)
);

CREATE TABLE serial_id (
    id SERIAL,
    data VARCHAR(100)
);

DESCRIBE traditional_id;
DESCRIBE serial_id;

-- Clean up
DROP TABLE activity_log;
DROP TABLE traditional_id;
DROP TABLE serial_id;
```

---

## 3. Operators and Functions

### 3.1 Comparison Operators

**Description:**
Comparison operators compare values and return TRUE or FALSE. They're essential for filtering data in WHERE clauses.

**Key Concepts:**

- `=` Equal to
- `!=` or `<>` Not equal to
- `<` Less than
- `>` Greater than
- `<=` Less than or equal to
- `>=` Greater than or equal to
- `BETWEEN` Range check
- `IN` Match any value in a list
- `IS NULL` / `IS NOT NULL` Check for NULL values

**Example:**

```sql
-- Equal to
SELECT * FROM products WHERE price = 29.99;

-- Not equal to
SELECT * FROM orders WHERE status != 'delivered';

-- Greater than / Less than
SELECT * FROM products WHERE price > 100;
SELECT * FROM products WHERE stock_quantity < 50;

-- Between (inclusive)
SELECT * FROM products WHERE price BETWEEN 20 AND 50;

-- IN operator
SELECT * FROM orders WHERE status IN ('pending', 'processing');

-- IS NULL / IS NOT NULL
SELECT * FROM customers WHERE phone IS NULL;
SELECT * FROM customers WHERE phone IS NOT NULL;
```

**Practice Query:**

```sql
-- Find expensive products (price > $100)
SELECT product_name, price
FROM products
WHERE price > 100;

-- Find products NOT in Electronics category
SELECT product_name, category_id
FROM products
WHERE category_id != 1;

-- Find products in specific price range
SELECT product_name, price
FROM products
WHERE price BETWEEN 25 AND 75
ORDER BY price;

-- Find orders with specific statuses
SELECT order_id, customer_id, status, total_amount
FROM orders
WHERE status IN ('pending', 'processing', 'shipped');

-- Find customers without phone numbers
SELECT first_name, last_name, email
FROM customers
WHERE phone IS NULL;

-- Find customers with complete address information
SELECT first_name, last_name, city, state
FROM customers
WHERE city IS NOT NULL
  AND state IS NOT NULL
  AND zip_code IS NOT NULL;

-- Products with low or zero stock
SELECT product_name, stock_quantity
FROM products
WHERE stock_quantity <= 50
ORDER BY stock_quantity;

-- Completed payments over $100
SELECT payment_id, order_id, amount, payment_method
FROM payments
WHERE status = 'completed' AND amount >= 100;

-- Reviews with high ratings
SELECT product_id, rating, review_text
FROM reviews
WHERE rating >= 4;
```

---

### 3.2 Logical Operators

**Description:**
Logical operators combine multiple conditions. They allow complex filtering by connecting comparison expressions.

**Key Concepts:**

- `AND`: All conditions must be TRUE
- `OR`: At least one condition must be TRUE
- `NOT`: Negates a condition
- Use parentheses `()` to group conditions

**Example:**

```sql
-- AND - both conditions must be true
SELECT * FROM products
WHERE price > 50 AND stock_quantity > 100;

-- OR - at least one condition must be true
SELECT * FROM customers
WHERE state = 'CA' OR state = 'NY';

-- NOT - negates the condition
SELECT * FROM products
WHERE NOT category_id = 1;

-- Complex combinations with parentheses
SELECT * FROM products
WHERE (price < 30 OR price > 100)
  AND stock_quantity > 50;
```

**Practice Query:**

```sql
-- Products that are cheap AND in stock
SELECT product_name, price, stock_quantity
FROM products
WHERE price < 50 AND stock_quantity > 100;

-- Customers from California OR New York
SELECT first_name, last_name, state
FROM customers
WHERE state = 'CA' OR state = 'NY';

-- Orders that are NOT delivered or cancelled
SELECT order_id, status, total_amount
FROM orders
WHERE NOT (status = 'delivered' OR status = 'cancelled');

-- Expensive electronics (combining conditions)
SELECT product_name, price, category_id
FROM products
WHERE category_id = 1 AND price > 100;

-- Complex condition: Cheap OR expensive products, but must be in stock
SELECT product_name, price, stock_quantity
FROM products
WHERE (price < 20 OR price > 100) AND stock_quantity > 0;

-- Customers from specific states with phone numbers
SELECT first_name, last_name, state, phone
FROM customers
WHERE (state = 'CA' OR state = 'NY' OR state = 'TX')
  AND phone IS NOT NULL;

-- High-value completed orders
SELECT order_id, total_amount, status
FROM orders
WHERE total_amount > 100 AND status = 'delivered';

-- Products low in stock OR discontinued (price = 0)
SELECT product_name, price, stock_quantity
FROM products
WHERE stock_quantity < 50 OR price = 0;

-- Find orders from New York customers who spent over $50
SELECT
    o.order_id,
    CONCAT(c.first_name, ' ', c.last_name) AS customer_name,
    c.state,
    o.total_amount
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
WHERE c.state = 'NY' AND o.total_amount > 50;
```

---

### 3.3 Arithmetic Operators

**Description:**
Arithmetic operators perform mathematical calculations on numeric values. Essential for price calculations, totals, and aggregations.

**Key Concepts:**

- `+` Addition
- `-` Subtraction
- `*` Multiplication
- `/` Division
- `%` or `MOD` Modulo (remainder)
- `DIV` Integer division

**Example:**

```sql
-- Addition
SELECT product_name, price, price + 10 AS price_plus_10
FROM products;

-- Subtraction
SELECT product_name, stock_quantity, stock_quantity - 5 AS after_sale
FROM products;

-- Multiplication (calculate tax)
SELECT order_id, total_amount, total_amount * 0.08 AS tax
FROM orders;

-- Division
SELECT product_name, price, price / 2 AS half_price
FROM products;

-- Modulo (remainder)
SELECT product_id, stock_quantity, stock_quantity MOD 10 AS remainder
FROM products;
```

**Practice Query:**

```sql
-- Calculate price with 8% sales tax
SELECT
    product_name,
    price,
    price * 0.08 AS tax,
    price * 1.08 AS total_with_tax,
    ROUND(price * 1.08, 2) AS rounded_total
FROM products;

-- Calculate 20% discount
SELECT
    product_name,
    price AS original_price,
    price * 0.20 AS discount_amount,
    price * 0.80 AS sale_price
FROM products;

-- Calculate total inventory value
SELECT
    product_name,
    price,
    stock_quantity,
    price * stock_quantity AS inventory_value
FROM products;

-- Calculate profit margin (30% markup)
SELECT
    product_name,
    price AS selling_price,
    price / 1.30 AS cost_price,
    price - (price / 1.30) AS profit_per_unit
FROM products;

-- Division examples
SELECT
    product_name,
    stock_quantity,
    stock_quantity / 10 AS regular_division,
    stock_quantity DIV 10 AS integer_division,
    stock_quantity MOD 10 AS remainder
FROM products;

-- Calculate average order value
SELECT
    order_id,
    total_amount,
    (SELECT COUNT(*) FROM order_items WHERE order_id = o.order_id) AS item_count,
    total_amount / (SELECT COUNT(*) FROM order_items WHERE order_id = o.order_id) AS avg_per_item
FROM orders o;

-- Multiple arithmetic operations
SELECT
    product_name,
    price,
    stock_quantity,
    (price * stock_quantity) AS current_value,
    (price * 1.15 * stock_quantity) AS value_after_15_percent_increase,
    ((price * 1.15 * stock_quantity) - (price * stock_quantity)) AS value_increase
FROM products;
```

---

### 3.4 Operator Precedence

**Description:**
Operator precedence determines the order in which operations are evaluated. Understanding precedence prevents calculation errors.

**Key Concepts:**

- Parentheses `()` - Highest precedence (evaluated first)
- Multiplication `*`, Division `/`, Modulo `%` - High precedence
- Addition `+`, Subtraction `-` - Medium precedence
- Comparison operators `=`, `<`, `>`, etc. - Lower precedence
- Logical `NOT` → `AND` → `OR` - Lowest precedence

**Order:** `()` → `*` `/` `%` → `+` `-` → Comparisons → `NOT` → `AND` → `OR`

**Example:**

```sql
-- Without parentheses - multiplication happens first
SELECT 5 + 3 * 2;  -- Result: 11 (not 16)

-- With parentheses - force addition first
SELECT (5 + 3) * 2;  -- Result: 16

-- Complex calculation
SELECT
    product_name,
    price,
    price + 10 * 2 AS without_parens,  -- 10*2 first, then + price
    (price + 10) * 2 AS with_parens    -- (price+10) first, then *2
FROM products
LIMIT 3;
```

**Practice Query:**

```sql
-- Demonstrate precedence with price calculations
SELECT
    product_name,
    price,
    price + 5 * 2 AS calc1,        -- 5*2=10, then price+10
    (price + 5) * 2 AS calc2,      -- price+5 first, then *2
    price * 1.08 + 5 AS calc3,     -- price*1.08 first, then +5
    price * (1.08 + 0.05) AS calc4 -- 1.08+0.05 first, then *price
FROM products
LIMIT 5;

-- Logical operator precedence: NOT > AND > OR
SELECT
    product_name,
    price,
    stock_quantity
FROM products
WHERE price < 50 OR stock_quantity > 100 AND category_id = 1;
-- This evaluates as: (stock_quantity > 100 AND category_id = 1) OR price < 50

-- Use parentheses to change precedence
SELECT
    product_name,
    price,
    stock_quantity
FROM products
WHERE (price < 50 OR stock_quantity > 100) AND category_id = 1;
-- This evaluates as: (price < 50 OR stock_quantity > 100) AND category_id = 1

-- Complex calculation with proper grouping
SELECT
    product_name,
    price,
    stock_quantity,
    (price * 1.08 + 2.50) * stock_quantity AS total_cost,
    price * (1.08 + 0.10) * stock_quantity AS alternative_calc
FROM products;

-- Comparison and arithmetic precedence
SELECT
    order_id,
    total_amount,
    total_amount > 50 + 50 AS comparison1,    -- Evaluated as: total_amount > (50+50)
    (total_amount > 50) + 50 AS comparison2   -- Evaluated as: (total_amount>50) + 50
FROM orders;

-- Best practice: Always use parentheses for clarity
SELECT
    product_name,
    price,
    ((price * 0.80) * 1.08) AS final_price  -- Clear: 20% discount, then add 8% tax
FROM products;
```

---

### 3.5 The CASE Statement

**Description:**
CASE statement provides conditional logic in SQL queries. It's like an if-else statement that returns different values based on conditions.

**Key Concepts:**

- Two forms: Simple CASE and Searched CASE
- Returns different values based on conditions
- Can be used in SELECT, WHERE, ORDER BY
- Always ends with END
- Optional ELSE for default value

**Example:**

```sql
-- Simple CASE (comparing one expression)
SELECT
    product_name,
    stock_quantity,
    CASE category_id
        WHEN 1 THEN 'Electronics'
        WHEN 2 THEN 'Clothing'
        WHEN 3 THEN 'Books'
        ELSE 'Other'
    END AS category_name
FROM products;

-- Searched CASE (multiple conditions)
SELECT
    product_name,
    price,
    CASE
        WHEN price < 25 THEN 'Budget'
        WHEN price BETWEEN 25 AND 75 THEN 'Mid-Range'
        WHEN price > 75 THEN 'Premium'
        ELSE 'Unknown'
    END AS price_category
FROM products;
```

**Practice Query:**

```sql
-- Categorize products by stock level
SELECT
    product_name,
    stock_quantity,
    CASE
        WHEN stock_quantity = 0 THEN 'Out of Stock'
        WHEN stock_quantity < 50 THEN 'Low Stock'
        WHEN stock_quantity < 100 THEN 'Medium Stock'
        ELSE 'Well Stocked'
    END AS stock_status
FROM products;

-- Categorize orders by value
SELECT
    order_id,
    total_amount,
    CASE
        WHEN total_amount < 50 THEN 'Small Order'
        WHEN total_amount BETWEEN 50 AND 150 THEN 'Medium Order'
        WHEN total_amount > 150 THEN 'Large Order'
    END AS order_size
FROM orders;

-- Apply different discounts based on price
SELECT
    product_name,
    price,
    CASE
        WHEN price > 100 THEN price * 0.85  -- 15% discount
        WHEN price > 50 THEN price * 0.90   -- 10% discount
        ELSE price * 0.95                    -- 5% discount
    END AS discounted_price
FROM products;

-- Create priority levels for order status
SELECT
    order_id,
    status,
    total_amount,
    CASE status
        WHEN 'pending' THEN 'HIGH - Needs Processing'
        WHEN 'processing' THEN 'MEDIUM - In Progress'
        WHEN 'shipped' THEN 'LOW - In Transit'
        WHEN 'delivered' THEN 'COMPLETE'
        WHEN 'cancelled' THEN 'CLOSED'
        ELSE 'UNKNOWN'
    END AS priority_status
FROM orders;

-- Use CASE in ORDER BY
SELECT
    product_name,
    stock_quantity
FROM products
ORDER BY
    CASE
        WHEN stock_quantity = 0 THEN 1
        WHEN stock_quantity < 50 THEN 2
        ELSE 3
    END,
    stock_quantity;

-- Use CASE in aggregation
SELECT
    CASE
        WHEN price < 50 THEN 'Under $50'
        WHEN price < 100 THEN '$50-$100'
        ELSE 'Over $100'
    END AS price_range,
    COUNT(*) AS product_count,
    AVG(price) AS avg_price
FROM products
GROUP BY price_range;

-- Nested CASE statements
SELECT
    product_name,
    price,
    stock_quantity,
    CASE
        WHEN stock_quantity = 0 THEN 'Cannot Sell'
        WHEN stock_quantity > 0 THEN
            CASE
                WHEN price < 30 THEN 'Clearance Item'
                WHEN price < 70 THEN 'Regular Item'
                ELSE 'Premium Item'
            END
    END AS sales_category
FROM products;
```

---

### 3.6 The IF Function

**Description:**
IF() function is a simpler alternative to CASE when you only need to test one condition. It returns one value if true, another if false.

**Key Concepts:**

- Syntax: `IF(condition, value_if_true, value_if_false)`
- Simpler than CASE for basic true/false logic
- Can be nested for multiple conditions
- Returns the data type of the result values

**Example:**

```sql
-- Basic IF
SELECT
    product_name,
    price,
    IF(price > 50, 'Expensive', 'Affordable') AS price_label
FROM products;

-- IF with calculations
SELECT
    product_name,
    stock_quantity,
    IF(stock_quantity > 100, 'Yes', 'No') AS has_plenty
FROM products;

-- Nested IF
SELECT
    product_name,
    price,
    IF(price < 25, 'Budget',
        IF(price < 75, 'Mid-Range', 'Premium')
    ) AS category
FROM products;
```

**Practice Query:**

```sql
-- Simple true/false labeling
SELECT
    product_name,
    stock_quantity,
    IF(stock_quantity > 0, 'Available', 'Out of Stock') AS availability
FROM products;

-- Determine if reorder is needed
SELECT
    product_name,
    stock_quantity,
    IF(stock_quantity < 75, 'Reorder Now', 'Stock OK') AS reorder_status
FROM products;

-- Apply conditional pricing
SELECT
    product_name,
    price,
    IF(stock_quantity < 50, price * 0.90, price) AS special_price
FROM products;

-- Check order completion
SELECT
    order_id,
    status,
    total_amount,
    IF(status = 'delivered', 'Completed', 'In Progress') AS completion_status
FROM orders;

-- Nested IF for multiple conditions
SELECT
    product_name,
    price,
    IF(price < 30, 'Low',
        IF(price < 80, 'Medium', 'High')
    ) AS price_tier
FROM products;

-- Calculate shipping fee based on order total
SELECT
    order_id,
    total_amount,
    IF(total_amount > 100, 0, 9.99) AS shipping_fee,
    IF(total_amount > 100, total_amount, total_amount + 9.99) AS final_total
FROM orders;

-- Membership status based on registration date
SELECT
    customer_id,
    first_name,
    last_name,
    registration_date,
    IF(DATEDIFF(NOW(), registration_date) > 365, 'Veteran', 'New') AS member_status
FROM customers;

-- Compare IF vs CASE (both achieve same result)
SELECT
    product_name,
    stock_quantity,
    -- Using IF
    IF(stock_quantity = 0, 'None',
        IF(stock_quantity < 50, 'Low', 'Good')
    ) AS if_status,
    -- Using CASE
    CASE
        WHEN stock_quantity = 0 THEN 'None'
        WHEN stock_quantity < 50 THEN 'Low'
        ELSE 'Good'
    END AS case_status
FROM products;

-- Use IF in WHERE clause
SELECT
    product_name,
    price,
    stock_quantity
FROM products
WHERE IF(stock_quantity > 100, price < 50, price < 100);
```

---

## 4. String Functions

### 4.1 String Comparisons

**Description:**
String comparisons test relationships between text values. MySQL offers various operators for matching patterns and comparing strings.

**Key Concepts:**

- `=` Exact match (case-insensitive by default)
- `LIKE` Pattern matching with wildcards
  - `%` matches any sequence of characters
  - `_` matches exactly one character
- `BINARY` for case-sensitive comparison
- `REGEXP` or `RLIKE` for regular expressions

**Example:**

```sql
-- Exact match
SELECT * FROM customers
WHERE first_name = 'John';

-- LIKE with wildcard
SELECT * FROM products
WHERE product_name LIKE '%Laptop%';

-- LIKE with single character wildcard
SELECT * FROM customers
WHERE first_name LIKE 'J___';  -- 4 letters starting with J

-- Case-sensitive comparison
SELECT * FROM customers
WHERE BINARY first_name = 'john';  -- Won't match 'John'
```

**Practice Query:**

```sql
-- Find products with specific words
SELECT product_name
FROM products
WHERE product_name LIKE '%Shoe%';

-- Find emails from specific domain
SELECT first_name, last_name, email
FROM customers
WHERE email LIKE '%@email.com';

-- Find products starting with specific letter
SELECT product_name
FROM products
WHERE product_name LIKE 'L%';

-- Find products ending with specific word
SELECT product_name
FROM products
WHERE product_name LIKE '%Mat';

-- Find names with exactly 4 characters
SELECT first_name
FROM customers
WHERE first_name LIKE '____';

-- Multiple wildcards
SELECT product_name
FROM products
WHERE product_name LIKE '%o%o%';  -- Contains two 'o's

-- Case-sensitive search
SELECT first_name
FROM customers
WHERE BINARY first_name = 'JOHN';  -- Exact case match

-- NOT LIKE
SELECT product_name
FROM products
WHERE product_name NOT LIKE '%Book%';

-- Combining LIKE conditions
SELECT product_name
FROM products
WHERE product_name LIKE '%Wireless%'
   OR product_name LIKE '%LED%';

-- Find customers from cities starting with 'New'
SELECT first_name, last_name, city
FROM customers
WHERE city LIKE 'New%';
```

---

### 4.2 Regular Expressions

**Description:**
Regular expressions (regex) provide powerful pattern matching capabilities beyond simple wildcards. Use REGEXP or RLIKE operators.

**Key Concepts:**

- `^` Start of string
- `$` End of string
- `.` Any single character
- `*` Zero or more of preceding
- `+` One or more of preceding
- `[abc]` Match any character in brackets
- `[^abc]` Match any character NOT in brackets
- `|` OR operator

**Example:**

```sql
-- Match products starting with specific letters
SELECT product_name
FROM products
WHERE product_name REGEXP '^[LM]';  -- Starts with L or M

-- Match email pattern
SELECT email
FROM customers
WHERE email REGEXP '^[a-z]+\.[a-z]+@';  -- firstname.lastname@

-- Match numbers
SELECT product_name
FROM products
WHERE product_name REGEXP '[0-9]+';  -- Contains digits
```

**Practice Query:**

```sql
-- Find products with numbers in the name
SELECT product_name
FROM products
WHERE product_name REGEXP '[0-9]';

-- Find products starting with vowels
SELECT product_name
FROM products
WHERE product_name REGEXP '^[AEIOUaeiou]';

-- Find names ending with specific letters
SELECT first_name
FROM customers
WHERE first_name REGEXP 'n$';  -- Ends with 'n'

-- Find products with exactly pattern
SELECT product_name
FROM products
WHERE product_name REGEXP '^[A-Z][a-z]+';

-- Match phone number pattern (555-####)
SELECT first_name, last_name, phone
FROM customers
WHERE phone REGEXP '^555-[0-9]{4}$';

-- Find products containing 'Pro' or 'Max'
SELECT product_name
FROM products
WHERE product_name REGEXP 'Pro|Max';

-- Find emails with specific patterns
SELECT email
FROM customers
WHERE email REGEXP '^[jm].*@email\.com$';  -- Starts with j or m

-- Find products with repeated characters
SELECT product_name
FROM products
WHERE product_name REGEXP '([a-z])\\1';  -- Same letter twice in a row

-- Case-insensitive regex (default)
SELECT product_name
FROM products
WHERE product_name REGEXP '^laptop';

-- Complex pattern: Find codes like AB123
CREATE TEMPORARY TABLE codes (code VARCHAR(20));
INSERT INTO codes VALUES ('AB123'), ('CD456'), ('XY7'), ('PQ999');

SELECT code
FROM codes
WHERE code REGEXP '^[A-Z]{2}[0-9]{3}$';

DROP TEMPORARY TABLE codes;
```

---

### 4.3 String Concatenation

**Description:**
String concatenation combines multiple strings into one. MySQL provides CONCAT() and CONCAT_WS() functions.

**Key Concepts:**

- `CONCAT(str1, str2, ...)` Combines strings
- `CONCAT_WS(separator, str1, str2, ...)` Combines with separator
- Returns NULL if any argument is NULL (except CONCAT_WS)
- Useful for formatting output

**Example:**

```sql
-- Basic concatenation
SELECT CONCAT(first_name, ' ', last_name) AS full_name
FROM customers;

-- Concatenation with separator
SELECT CONCAT_WS(', ', last_name, first_name) AS name
FROM customers;

-- Concatenation with text
SELECT CONCAT('Product: ', product_name, ' - $', price) AS description
FROM products;
```

**Practice Query:**

```sql
-- Create full name
SELECT
    customer_id,
    CONCAT(first_name, ' ', last_name) AS full_name
FROM customers;

-- Create formatted address
SELECT
    customer_id,
    CONCAT(first_name, ' ', last_name) AS name,
    CONCAT(address, ', ', city, ', ', state, ' ', zip_code) AS full_address
FROM customers;

-- Using CONCAT_WS (With Separator)
SELECT
    customer_id,
    CONCAT_WS(' ', first_name, last_name) AS full_name,
    CONCAT_WS(', ', city, state) AS location
FROM customers;

-- Product information string
SELECT
    CONCAT(
        product_name,
        ' - $', price,
        ' (', stock_quantity, ' in stock)'
    ) AS product_info
FROM products;

-- Email template
SELECT
    CONCAT(
        'Hello ', first_name, ',\n',
        'Your email is: ', email
    ) AS email_message
FROM customers;

-- Order summary
SELECT
    CONCAT('Order #', order_id, ' - ', status) AS order_status,
    CONCAT('$', total_amount) AS amount
FROM orders;

-- NULL handling difference
SELECT
    CONCAT('Name: ', first_name, ' ', phone) AS concat_result,
    CONCAT_WS(' - ', first_name, phone) AS concat_ws_result
FROM customers
WHERE phone IS NULL
LIMIT 1;

-- Create product SKU
SELECT
    CONCAT(
        UPPER(LEFT(category_id, 1)),
        '-',
        LPAD(product_id, 5, '0')
    ) AS sku,
    product_name
FROM products;

-- Multiple separators
SELECT
    CONCAT_WS(
        ' | ',
        first_name,
        last_name,
        email,
        city
    ) AS customer_info
FROM customers;
```

---

### 4.4 Numeric Conversions

**Description:**
Convert between strings and numbers, format numbers as strings, and extract numeric values from text.

**Key Concepts:**

- `CAST(value AS type)` Explicit type conversion
- `CONVERT(value, type)` Alternative conversion syntax
- Implicit conversion happens automatically
- `FORMAT(number, decimals)` Format number with commas

**Example:**

```sql
-- Convert string to number
SELECT CAST('123' AS UNSIGNED) AS number;

-- Convert number to string
SELECT CAST(123 AS CHAR) AS text;

-- Format number with commas
SELECT FORMAT(1234567.89, 2) AS formatted;  -- 1,234,567.89
```

**Practice Query:**

```sql
-- Cast price to integer (remove decimals)
SELECT
    product_name,
    price,
    CAST(price AS UNSIGNED) AS price_integer
FROM products;

-- Convert string to decimal
SELECT
    CAST('99.99' AS DECIMAL(10,2)) AS numeric_value;

-- Format prices with commas
SELECT
    product_name,
    FORMAT(price, 2) AS formatted_price,
    CONCAT('$', FORMAT(price, 2)) AS price_display
FROM products;

-- Format large numbers
SELECT
    order_id,
    FORMAT(total_amount, 2) AS formatted_total
FROM orders;

-- Implicit conversion in calculations
SELECT
    product_name,
    CONCAT('$', price) AS price_string,
    CONCAT('$', price) + 0 AS back_to_number  -- Implicit conversion
FROM products;

-- Extract numbers from strings
SELECT
    CAST(REGEXP_SUBSTR(product_name, '[0-9]+') AS UNSIGNED) AS extracted_number,
    product_name
FROM products
WHERE product_name REGEXP '[0-9]';

-- Convert to different numeric types
SELECT
    price,
    CAST(price AS SIGNED) AS signed_int,
    CAST(price AS UNSIGNED) AS unsigned_int,
    CAST(price AS DECIMAL(8,2)) AS decimal_val
FROM products
LIMIT 3;

-- Round vs Cast
SELECT
    price,
    CAST(price AS UNSIGNED) AS cast_result,  -- Truncates
    ROUND(price) AS round_result              -- Rounds
FROM products;

-- Format with different decimal places
SELECT
    product_name,
    FORMAT(price, 0) AS no_decimals,
    FORMAT(price, 2) AS two_decimals,
    FORMAT(price, 4) AS four_decimals
FROM products;
```

---

### 4.5 Trimming and Padding

**Description:**
Remove unwanted whitespace from strings or add padding to reach a desired length.

**Key Concepts:**

- `TRIM()` Remove spaces from both ends
- `LTRIM()` Remove spaces from left
- `RTRIM()` Remove spaces from right
- `LPAD(str, len, padstr)` Pad left to length
- `RPAD(str, len, padstr)` Pad right to length

**Example:**

```sql
-- Remove spaces
SELECT TRIM('  hello  ') AS trimmed;      -- 'hello'
SELECT LTRIM('  hello  ') AS left_trim;   -- 'hello  '
SELECT RTRIM('  hello  ') AS right_trim;  -- '  hello'

-- Add padding
SELECT LPAD('42', 5, '0') AS padded;      -- '00042'
SELECT RPAD('ID', 10, '-') AS padded;     -- 'ID--------'
```

**Practice Query:**

```sql
-- Trim whitespace from customer data
SELECT
    TRIM(first_name) AS trimmed_first,
    TRIM(last_name) AS trimmed_last,
    TRIM(email) AS trimmed_email
FROM customers;

-- Create padded product codes
SELECT
    product_id,
    LPAD(product_id, 6, '0') AS product_code,
    product_name
FROM products;

-- Format order IDs with padding
SELECT
    LPAD(order_id, 8, '0') AS formatted_order_id,
    total_amount
FROM orders;

-- Right padding for alignment
SELECT
    RPAD(product_name, 30, '.') AS name,
    LPAD(price, 8, ' ') AS price
FROM products;

-- Create SKU with padding
SELECT
    CONCAT(
        'PROD-',
        LPAD(category_id, 2, '0'),
        '-',
        LPAD(product_id, 5, '0')
    ) AS sku,
    product_name
FROM products;

-- Trim specific characters (not just spaces)
SELECT
    TRIM(BOTH '.' FROM '...Hello...') AS trimmed;

-- Clean up phone numbers
UPDATE customers
SET phone = TRIM(phone)
WHERE phone LIKE ' %' OR phone LIKE '% ';

-- Format customer IDs
SELECT
    CONCAT('CUST-', LPAD(customer_id, 6, '0')) AS customer_code,
    first_name,
    last_name
FROM customers;

-- Create aligned table output
SELECT
    RPAD(product_name, 25, ' ') AS product,
    LPAD(CONCAT('$', FORMAT(price, 2)), 10, ' ') AS price,
    LPAD(stock_quantity, 5, ' ') AS stock
FROM products;

-- Remove and add padding in one query
SELECT
    product_name,
    LPAD(TRIM(product_name), 30, '.') AS formatted
FROM products;
```

---

### 4.6 Case Conversion

**Description:**
Convert text between uppercase, lowercase, and title case for consistent formatting and comparison.

**Key Concepts:**

- `UPPER(str)` Convert to uppercase
- `LOWER(str)` Convert to lowercase
- `UCASE(str)` Alias for UPPER
- `LCASE(str)` Alias for LOWER
- Useful for case-insensitive searches and formatting

**Example:**

```sql
-- Convert to uppercase
SELECT UPPER('hello') AS uppercase;  -- 'HELLO'

-- Convert to lowercase
SELECT LOWER('WORLD') AS lowercase;  -- 'world'

-- Format names
SELECT UPPER(first_name) AS first, LOWER(last_name) AS last
FROM customers;
```

**Practice Query:**

```sql
-- Convert names to uppercase
SELECT
    customer_id,
    UPPER(first_name) AS first_name_upper,
    UPPER(last_name) AS last_name_upper
FROM customers;

-- Convert product names to lowercase
SELECT
    product_id,
    LOWER(product_name) AS product_name_lower
FROM products;

-- Mixed case formatting
SELECT
    UPPER(first_name) AS first,
    LOWER(email) AS email
FROM customers;

-- Case-insensitive search using LOWER
SELECT *
FROM products
WHERE LOWER(product_name) LIKE LOWER('%laptop%');

-- Create email addresses in lowercase
SELECT
    customer_id,
    LOWER(CONCAT(first_name, '.', last_name, '@company.com')) AS company_email
FROM customers;

-- Format state codes to uppercase
SELECT
    first_name,
    last_name,
    UPPER(state) AS state_code
FROM customers;

-- Create display names
SELECT
    CONCAT(UPPER(LEFT(first_name, 1)), LOWER(SUBSTRING(first_name, 2))) AS formatted_first,
    CONCAT(UPPER(LEFT(last_name, 1)), LOWER(SUBSTRING(last_name, 2))) AS formatted_last
FROM customers;

-- Compare case-insensitively
SELECT
    first_name,
    last_name
FROM customers
WHERE LOWER(first_name) = LOWER('JOHN');

-- Convert category names
SELECT DISTINCT
    category_id,
    UPPER(category_name) AS category_upper
FROM categories;

-- Create hashtags (lowercase, no spaces)
SELECT
    product_name,
    CONCAT('#', LOWER(REPLACE(product_name, ' ', ''))) AS hashtag
FROM products;
```

---

### 4.7 Substrings

**Description:**
Extract portions of strings using various substring functions.

**Key Concepts:**

- `SUBSTRING(str, pos, len)` Extract substring
- `LEFT(str, len)` Get leftmost characters
- `RIGHT(str, len)` Get rightmost characters
- `MID(str, pos, len)` Alias for SUBSTRING
- Position starts at 1 (not 0)

**Example:**

```sql
-- Get first 5 characters
SELECT LEFT('Hello World', 5) AS first_five;  -- 'Hello'

-- Get last 5 characters
SELECT RIGHT('Hello World', 5) AS last_five;  -- 'World'

-- Extract middle portion
SELECT SUBSTRING('Hello World', 7, 5) AS middle;  -- 'World'

-- From position to end
SELECT SUBSTRING('Hello World', 7) AS to_end;  -- 'World'
```

**Practice Query:**

```sql
-- Get first name initial
SELECT
    first_name,
    LEFT(first_name, 1) AS initial
FROM customers;

-- Get last 4 digits of phone
SELECT
    first_name,
    phone,
    RIGHT(phone, 4) AS last_four_digits
FROM customers
WHERE phone IS NOT NULL;

-- Extract domain from email
SELECT
    email,
    SUBSTRING(email, LOCATE('@', email) + 1) AS domain
FROM customers;

-- Get first 20 characters of description
SELECT
    product_name,
    LEFT(description, 20) AS short_description
FROM products
WHERE description IS NOT NULL;

-- Extract area code from phone
SELECT
    phone,
    SUBSTRING(phone, 1, 3) AS area_code
FROM customers
WHERE phone IS NOT NULL;

-- Create abbreviations
SELECT
    product_name,
    CONCAT(
        LEFT(product_name, 3),
        '...'
    ) AS abbreviation
FROM products;

-- Extract year from timestamp
SELECT
    order_date,
    LEFT(order_date, 4) AS year
FROM orders;

-- Middle characters
SELECT
    product_name,
    SUBSTRING(product_name, 3, 5) AS middle_chars
FROM products;

-- Create initials
SELECT
    CONCAT(
        LEFT(first_name, 1),
        '.',
        LEFT(last_name, 1),
        '.'
    ) AS initials,
    first_name,
    last_name
FROM customers;

-- Extract username from email
SELECT
    email,
    LEFT(email, LOCATE('@', email) - 1) AS username
FROM customers;

-- Substring with negative position (from end)
SELECT
    product_name,
    SUBSTRING(product_name, -5) AS last_5_chars
FROM products;
```

---

### 4.8 Soundex

**Description:**
SOUNDEX creates a phonetic representation of a string, useful for finding similar-sounding names.

**Key Concepts:**

- `SOUNDEX(str)` Returns 4-character code
- Similar sounding words get same code
- Useful for name matching
- Case-insensitive
- Based on English pronunciation

**Example:**

```sql
-- Get soundex code
SELECT SOUNDEX('Smith');     -- S530
SELECT SOUNDEX('Smythe');    -- S530 (same code!)

-- Find similar sounding names
SELECT first_name, SOUNDEX(first_name)
FROM customers
WHERE SOUNDEX(first_name) = SOUNDEX('Jon');  -- Finds John, Jon, etc.
```

**Practice Query:**

```sql
-- Get soundex codes for customer names
SELECT
    first_name,
    SOUNDEX(first_name) AS first_soundex,
    last_name,
    SOUNDEX(last_name) AS last_soundex
FROM customers;

-- Find customers with similar sounding first names
SELECT
    first_name,
    SOUNDEX(first_name) AS soundex_code
FROM customers
WHERE SOUNDEX(first_name) = SOUNDEX('John');

-- Group by soundex (find names that sound alike)
SELECT
    SOUNDEX(first_name) AS soundex_code,
    GROUP_CONCAT(DISTINCT first_name) AS similar_names
FROM customers
GROUP BY SOUNDEX(first_name);

-- Find products with similar sounding names
SELECT
    p1.product_name AS product1,
    p2.product_name AS product2
FROM products p1
JOIN products p2 ON SOUNDEX(p1.product_name) = SOUNDEX(p2.product_name)
WHERE p1.product_id < p2.product_id;

-- Search by soundex (fuzzy name search)
SELECT
    first_name,
    last_name,
    email
FROM customers
WHERE SOUNDEX(last_name) = SOUNDEX('Smith');

-- Compare soundex codes
SELECT
    'Smith' AS name1,
    'Smythe' AS name2,
    SOUNDEX('Smith') AS soundex1,
    SOUNDEX('Smythe') AS soundex2,
    SOUNDEX('Smith') = SOUNDEX('Smythe') AS are_similar;

-- Create table for soundex testing
CREATE TEMPORARY TABLE name_test (name VARCHAR(50));
INSERT INTO name_test VALUES
    ('John'), ('Jon'), ('Johan'), ('Jane'),
    ('Smith'), ('Smythe'), ('Schmidt');

SELECT
    name,
    SOUNDEX(name) AS soundex_code
FROM name_test
ORDER BY soundex_code;

DROP TEMPORARY TABLE name_test;

-- Using DIFFERENCE function (returns 0-4, 4 = most similar)
SELECT
    c1.first_name AS name1,
    c2.first_name AS name2,
    SOUNDEX(c1.first_name) AS soundex1,
    SOUNDEX(c2.first_name) AS soundex2
FROM customers c1, customers c2
WHERE c1.customer_id < c2.customer_id
  AND SOUNDEX(c1.first_name) = SOUNDEX(c2.first_name);
```

---

## 5. Math Functions

### 5.1 Value Functions

**Description:**
Functions that return specific numeric values or properties of numbers.

**Key Concepts:**

- `ABS(x)` Absolute value
- `SIGN(x)` Sign of number (-1, 0, or 1)
- `MOD(x, y)` Remainder of x/y
- `GREATEST(x1, x2, ...)` Largest value
- `LEAST(x1, x2, ...)` Smallest value

**Example:**

```sql
-- Absolute value
SELECT ABS(-10);          -- 10
SELECT ABS(10);           -- 10

-- Sign function
SELECT SIGN(-5);          -- -1
SELECT SIGN(0);           -- 0
SELECT SIGN(5);           -- 1

-- Greatest and least
SELECT GREATEST(10, 20, 5, 15);   -- 20
SELECT LEAST(10, 20, 5, 15);      -- 5
```

**Practice Query:**

```sql
-- Absolute value for price differences
SELECT
    product_name,
    price,
    ABS(price - 50) AS difference_from_50
FROM products;

-- Sign of stock change
SELECT
    product_name,
    stock_quantity,
    stock_quantity - 100 AS change,
    SIGN(stock_quantity - 100) AS change_direction
FROM products;

-- Find maximum price among categories
SELECT
    product_name,
    price,
    (SELECT MAX(price) FROM products) AS max_price,
    ABS(price - (SELECT MAX(price) FROM products)) AS difference_from_max
FROM products;

-- Use GREATEST to ensure minimum value
SELECT
    product_name,
    stock_quantity,
    GREATEST(stock_quantity, 50) AS minimum_50_stock
FROM products;

-- Use LEAST for maximum discount cap
SELECT
    product_name,
    price,
    price * 0.30 AS calculated_discount,
    LEAST(price * 0.30, 50) AS capped_discount
FROM products;

-- Compare multiple values
SELECT
    order_id,
    total_amount,
    GREATEST(total_amount, 100) AS min_100_order,
    LEAST(total_amount, 500) AS max_500_order
FROM orders;

-- Modulo for even/odd detection
SELECT
    product_id,
    product_name,
    MOD(product_id, 2) AS mod_result,
    IF(MOD(product_id, 2) = 0, 'Even', 'Odd') AS even_or_odd
FROM products;

-- Absolute difference in dates
SELECT
    order_id,
    order_date,
    ABS(DATEDIFF(NOW(), order_date)) AS days_difference
FROM orders;

-- Find closest price to target
SELECT
    product_name,
    price,
    ABS(price - 75) AS distance_from_75
FROM products
ORDER BY distance_from_75
LIMIT 5;
```

---

### 5.2 Basic Math

**Description:**
Common mathematical operations and rounding functions.

**Key Concepts:**

- `ROUND(x, d)` Round to d decimal places
- `CEILING(x)` Round up to nearest integer
- `FLOOR(x)` Round down to nearest integer
- `TRUNCATE(x, d)` Truncate to d decimal places
- `POWER(x, y)` x raised to power y
- `SQRT(x)` Square root

**Example:**

```sql
-- Rounding
SELECT ROUND(123.456, 2);      -- 123.46
SELECT ROUND(123.456, 0);      -- 123
SELECT ROUND(123.456, -1);     -- 120

-- Ceiling and Floor
SELECT CEILING(123.1);         -- 124
SELECT FLOOR(123.9);           -- 123

-- Power and square root
SELECT POWER(2, 3);            -- 8
SELECT SQRT(16);               -- 4
```

**Practice Query:**

```sql
-- Round prices to nearest dollar
SELECT
    product_name,
    price,
    ROUND(price, 0) AS rounded_price,
    ROUND(price, 2) AS exact_price
FROM products;

-- Calculate price tiers using CEILING
SELECT
    product_name,
    price,
    CEILING(price / 10) * 10 AS price_tier
FROM products;

-- Floor for bulk pricing
SELECT
    product_name,
    stock_quantity,
    FLOOR(stock_quantity / 10) AS full_tens,
    FLOOR(stock_quantity / 10) * 10 AS bulk_quantity
FROM products;

-- Truncate vs Round difference
SELECT
    price,
    ROUND(price, 1) AS rounded,
    TRUNCATE(price, 1) AS truncated
FROM products;

-- Calculate area (Power demonstration)
SELECT
    product_id,
    POWER(product_id, 2) AS id_squared,
    SQRT(product_id) AS id_square_root
FROM products;

-- Price with tax calculations
SELECT
    product_name,
    price,
    ROUND(price * 1.08, 2) AS with_tax,
    CEILING(price * 1.08) AS rounded_up_tax,
    FLOOR(price * 1.08) AS rounded_down_tax
FROM products;

-- Percentage calculations
SELECT
    order_id,
    total_amount,
    ROUND(total_amount * 0.15, 2) AS fifteen_percent,
    TRUNCATE(total_amount * 0.15, 2) AS truncated_fifteen
FROM orders;

-- Calculate compound interest (Power)
SELECT
    customer_id,
    1000 AS principal,
    ROUND(1000 * POWER(1.05, 3), 2) AS amount_after_3_years
FROM customers
LIMIT 3;

-- Round to different decimal places
SELECT
    product_name,
    price,
    ROUND(price, 0) AS no_decimals,
    ROUND(price, 1) AS one_decimal,
    ROUND(price, 2) AS two_decimals,
    ROUND(price, -1) AS nearest_ten
FROM products;

-- Distance calculation using SQRT and POWER
SELECT
    product_id,
    SQRT(POWER(price, 2) + POWER(stock_quantity, 2)) AS euclidean_metric
FROM products;
```

---

### 5.3 Simple Trigonometry

**Description:**
Trigonometric functions for angle calculations and circular mathematics.

**Key Concepts:**

- `SIN(x)` Sine (x in radians)
- `COS(x)` Cosine (x in radians)
- `TAN(x)` Tangent (x in radians)
- `ASIN(x)` Arc sine
- `ACOS(x)` Arc cosine
- `ATAN(x)` Arc tangent
- Angles must be in radians

**Example:**

```sql
-- Sine, Cosine, Tangent
SELECT
    SIN(PI()/2) AS sine_90,       -- 1
    COS(0) AS cosine_0,           -- 1
    TAN(PI()/4) AS tangent_45;    -- 1

-- Inverse functions
SELECT
    ASIN(1) AS arcsin,            -- π/2
    ACOS(0) AS arccos,            -- π/2
    ATAN(1) AS arctan;            -- π/4

-- Pi value
<invoke name="str_replace">
<parameter name="description">Continuing the math functions section with trigonometry examples</parameter>
<parameter name="path">/home/claude/mysql-essential-training-complete.md</parameter>
<parameter name="old_str">-- Pi value</parameter>
<parameter name="new_str">-- Pi value
SELECT PI() AS pi_value;          -- 3.141593
```

**Practice Query:**

```sql
-- Basic trigonometric values
SELECT
    'Angle' AS description,
    0 AS degrees,
    0 AS radians,
    SIN(0) AS sine,
    COS(0) AS cosine,
    TAN(0) AS tangent
UNION ALL
SELECT 'Angle', 45, PI()/4, SIN(PI()/4), COS(PI()/4), TAN(PI()/4)
UNION ALL
SELECT 'Angle', 90, PI()/2, SIN(PI()/2), COS(PI()/2), TAN(PI()/2);

-- Circle calculations
SELECT
    product_id,
    product_id AS radius,
    2 * PI() * product_id AS circumference,
    PI() * POWER(product_id, 2) AS area
FROM products
LIMIT 5;

-- Wave patterns (for demonstration)
CREATE TEMPORARY TABLE angles (angle_deg INT);
INSERT INTO angles VALUES (0), (30), (45), (60), (90), (120), (180), (270), (360);

SELECT
    angle_deg,
    RADIANS(angle_deg) AS angle_rad,
    ROUND(SIN(RADIANS(angle_deg)), 4) AS sine,
    ROUND(COS(RADIANS(angle_deg)), 4) AS cosine,
    ROUND(TAN(RADIANS(angle_deg)), 4) AS tangent
FROM angles;

DROP TEMPORARY TABLE angles;

-- Inverse trigonometric functions
SELECT
    ROUND(ASIN(0.5), 4) AS arcsin,
    ROUND(DEGREES(ASIN(0.5)), 2) AS arcsin_degrees,
    ROUND(ACOS(0.5), 4) AS arccos,
    ROUND(DEGREES(ACOS(0.5)), 2) AS arccos_degrees;

-- Practical example: Calculate angle
SELECT
    product_id,
    price,
    stock_quantity,
    ROUND(ATAN(price / stock_quantity), 4) AS angle_radians,
    ROUND(DEGREES(ATAN(price / stock_quantity)), 2) AS angle_degrees
FROM products
WHERE stock_quantity > 0;

-- Pythagorean theorem (a² + b² = c²)
SELECT
    3 AS a,
    4 AS b,
    SQRT(POWER(3, 2) + POWER(4, 2)) AS c,
    ROUND(ATAN(4/3), 4) AS angle_rad,
    ROUND(DEGREES(ATAN(4/3)), 2) AS angle_deg;
```

---

### 5.4 Logarithms

**Description:**
Logarithmic functions for exponential growth calculations and scientific computations.

**Key Concepts:**

- `LOG(x)` Natural logarithm (base e)
- `LOG10(x)` Logarithm base 10
- `LOG2(x)` Logarithm base 2
- `LOG(b, x)` Logarithm base b
- `EXP(x)` e raised to power x (e^x)

**Example:**

```sql
-- Natural logarithm
SELECT LOG(2.718282);          -- ≈ 1 (ln(e) = 1)

-- Base 10 logarithm
SELECT LOG10(100);             -- 2

-- Base 2 logarithm
SELECT LOG2(8);                -- 3

-- Custom base
SELECT LOG(2, 8);              -- 3 (log₂(8) = 3)

-- Exponential
SELECT EXP(1);                 -- 2.718282 (e)
```

**Practice Query:**

```sql
-- Natural logarithm of prices
SELECT
    product_name,
    price,
    ROUND(LOG(price), 4) AS ln_price,
    ROUND(EXP(LOG(price)), 2) AS back_to_price
FROM products;

-- Logarithm base 10
SELECT
    product_name,
    stock_quantity,
    ROUND(LOG10(stock_quantity), 2) AS log10_stock
FROM products
WHERE stock_quantity > 0;

-- Logarithm base 2 (useful for binary calculations)
SELECT
    product_id,
    ROUND(LOG2(product_id), 2) AS log2_id,
    POWER(2, FLOOR(LOG2(product_id))) AS nearest_power_of_2
FROM products;

-- Custom base logarithm
SELECT
    product_name,
    price,
    ROUND(LOG(5, price), 4) AS log_base_5
FROM products;

-- Exponential growth
SELECT
    customer_id,
    ROUND(EXP(1), 4) AS e,
    ROUND(EXP(2), 4) AS e_squared,
    ROUND(EXP(customer_id * 0.1), 4) AS growth_factor
FROM customers;

-- Calculate doubling time (rule of 70)
SELECT
    'Growth Rate' AS description,
    5 AS percent_rate,
    ROUND(LOG(2) / LOG(1.05), 2) AS doubling_time_periods;

-- pH scale simulation (log base 10)
CREATE TEMPORARY TABLE concentrations (concentration DECIMAL(20, 10));
INSERT INTO concentrations VALUES (0.1), (0.01), (0.001), (0.0001);

SELECT
    concentration,
    ROUND(-LOG10(concentration), 2) AS pH_value
FROM concentrations;

DROP TEMPORARY TABLE concentrations;

-- Logarithmic scale for data visualization
SELECT
    product_name,
    price,
    ROUND(LOG10(price + 1), 2) AS log_scale,
    ROUND(10 * LOG10(price + 1), 0) AS scaled_for_display
FROM products;

-- Relationship between LOG and EXP
SELECT
    100 AS original_value,
    ROUND(LOG(100), 4) AS ln_value,
    ROUND(EXP(LOG(100)), 2) AS back_to_original;
```

---

### 5.5 Radians and Degrees

**Description:**
Convert between radians and degrees for trigonometric calculations.

**Key Concepts:**

- `RADIANS(x)` Convert degrees to radians
- `DEGREES(x)` Convert radians to degrees
- π radians = 180 degrees
- Full circle = 2π radians = 360 degrees

**Example:**

```sql
-- Convert degrees to radians
SELECT RADIANS(180);           -- 3.141593 (π)
SELECT RADIANS(90);            -- 1.570796 (π/2)

-- Convert radians to degrees
SELECT DEGREES(PI());          -- 180
SELECT DEGREES(PI()/2);        -- 90

-- Full circle
SELECT RADIANS(360);           -- 6.283185 (2π)
```

**Practice Query:**

```sql
-- Common angle conversions
SELECT
    0 AS degrees,
    RADIANS(0) AS radians
UNION ALL
SELECT 30, RADIANS(30)
UNION ALL
SELECT 45, RADIANS(45)
UNION ALL
SELECT 60, RADIANS(60)
UNION ALL
SELECT 90, RADIANS(90)
UNION ALL
SELECT 180, RADIANS(180)
UNION ALL
SELECT 360, RADIANS(360);

-- Convert radians back to degrees
SELECT
    PI() AS radians,
    DEGREES(PI()) AS degrees
UNION ALL
SELECT PI()/2, DEGREES(PI()/2)
UNION ALL
SELECT PI()/4, DEGREES(PI()/4)
UNION ALL
SELECT 2*PI(), DEGREES(2*PI());

-- Use in trigonometric calculations
SELECT
    45 AS angle_degrees,
    RADIANS(45) AS angle_radians,
    ROUND(SIN(RADIANS(45)), 4) AS sine_value,
    ROUND(COS(RADIANS(45)), 4) AS cosine_value
FROM DUAL;

-- Create angle table for reference
CREATE TEMPORARY TABLE angle_reference (degrees INT);
INSERT INTO angle_reference VALUES (0), (15), (30), (45), (60), (75), (90);

SELECT
    degrees,
    ROUND(RADIANS(degrees), 4) AS radians,
    ROUND(SIN(RADIANS(degrees)), 4) AS sine,
    ROUND(COS(RADIANS(degrees)), 4) AS cosine
FROM angle_reference;

DROP TEMPORARY TABLE angle_reference;

-- Practical: Calculate arc length
SELECT
    product_id,
    product_id AS radius,
    45 AS angle_degrees,
    RADIANS(45) AS angle_radians,
    ROUND(product_id * RADIANS(45), 2) AS arc_length
FROM products
WHERE product_id <= 10;

-- Convert between systems
SELECT
    'Right Angle' AS description,
    90 AS degrees,
    RADIANS(90) AS radians,
    ROUND(RADIANS(90) / PI(), 4) AS fraction_of_pi
UNION ALL
SELECT 'Straight Angle', 180, RADIANS(180), ROUND(RADIANS(180) / PI(), 4)
UNION ALL
SELECT 'Full Circle', 360, RADIANS(360), ROUND(RADIANS(360) / PI(), 4);

-- Demonstrate PI relationship
SELECT
    PI() AS pi,
    DEGREES(PI()) AS pi_in_degrees,
    2 * PI() AS two_pi,
    DEGREES(2 * PI()) AS two_pi_in_degrees;
```

---

## 6. Differences from Standard SQL

### 6.1 String Concatenation

**Description:**
MySQL uses different operators for string concatenation compared to standard SQL. Understanding these differences is important for code portability.

**Key Concepts:**

- **MySQL**: Use `CONCAT()` function
- **Standard SQL**: Use `||` operator
- MySQL `||` means OR (not concatenation) by default
- Can enable PIPES_AS_CONCAT mode for standard behavior

**Example:**

```sql
-- MySQL way (recommended)
SELECT CONCAT('Hello', ' ', 'World');  -- 'Hello World'

-- Standard SQL way (doesn't work by default in MySQL)
-- SELECT 'Hello' || ' ' || 'World';  -- This is OR operation in MySQL!

-- Enable standard SQL mode (if needed)
-- SET sql_mode = 'PIPES_AS_CONCAT';
-- SELECT 'Hello' || ' ' || 'World';  -- Now works
```

**Practice Query:**

```sql
-- MySQL concatenation (always use this)
SELECT
    CONCAT(first_name, ' ', last_name) AS full_name,
    CONCAT('Email: ', email) AS email_label
FROM customers;

-- Multiple column concatenation
SELECT
    CONCAT(product_name, ' - $', price, ' (', stock_quantity, ' in stock)') AS product_info
FROM products;

-- CONCAT_WS (With Separator) - MySQL specific
SELECT
    CONCAT_WS(' | ', first_name, last_name, email, city) AS customer_info
FROM customers;

-- Demonstrate || as OR (logical operator)
SELECT
    product_name,
    (price > 50) || (stock_quantity < 100) AS meets_criteria
FROM products;

-- Comparison: What NOT to do
-- Don't use || for concatenation in default MySQL mode
-- SELECT first_name || ' ' || last_name FROM customers;  -- WRONG!

-- Best practice: Always use CONCAT in MySQL
SELECT
    CONCAT(
        UPPER(LEFT(first_name, 1)),
        LOWER(SUBSTRING(first_name, 2)),
        ' ',
        UPPER(LEFT(last_name, 1)),
        LOWER(SUBSTRING(last_name, 2))
    ) AS formatted_name
FROM customers;

-- NULL handling in CONCAT
SELECT
    first_name,
    phone,
    CONCAT(first_name, ' - ', phone) AS concat_result,
    CONCAT(first_name, ' - ', IFNULL(phone, 'N/A')) AS with_null_handling
FROM customers;

-- Build complex strings
SELECT
    order_id,
    CONCAT(
        'Order #', LPAD(order_id, 6, '0'),
        ' - Status: ', status,
        ' - Amount: $', FORMAT(total_amount, 2)
    ) AS order_summary
FROM orders;
```

---

### 6.2 Quote Marks

**Description:**
MySQL has flexible rules for quotes compared to standard SQL. Understanding quote usage prevents errors.

**Key Concepts:**

- **Single quotes `'`**: For string literals (standard SQL)
- **Double quotes `"`**: Can be used for strings in MySQL (not standard)
- **Backticks `` ` ``**: For identifiers (table/column names) - MySQL specific
- Standard SQL uses double quotes for identifiers only

**Example:**

```sql
-- String literals (Standard SQL - use single quotes)
SELECT 'Hello World' AS greeting;

-- MySQL also allows double quotes for strings
SELECT "Hello World" AS greeting;

-- Backticks for identifiers (MySQL specific)
SELECT `product_name`, `price` FROM `products`;

-- Useful when column names are reserved words
SELECT `order`, `from`, `select` FROM reserved_words_table;
```

**Practice Query:**

```sql
-- Standard way - single quotes for strings
SELECT
    first_name,
    'Customer' AS type
FROM customers;

-- MySQL allows double quotes (but not recommended)
SELECT
    first_name,
    "Customer" AS type
FROM customers;

-- Backticks for identifiers
SELECT
    `customer_id`,
    `first_name`,
    `last_name`
FROM `customers`;

-- Essential when using reserved words or spaces
CREATE TEMPORARY TABLE `order data` (
    `order` INT,
    `from` VARCHAR(50),
    `select` VARCHAR(50)
);

SELECT `order`, `from`, `select` FROM `order data`;
DROP TEMPORARY TABLE `order data`;

-- Escape quotes within strings
SELECT
    product_name,
    CONCAT('Product: "', product_name, '"') AS quoted_name,
    CONCAT('It''s a product') AS with_apostrophe
FROM products
LIMIT 3;

-- Different quote scenarios
SELECT
    'Single quotes' AS method1,
    "Double quotes" AS method2,
    'It''s escaped' AS method3,
    "Also \"escaped\"" AS method4;

-- Backticks vs quotes
SELECT
    `price` AS with_backticks,
    price AS without_backticks,
    'price' AS string_literal
FROM products
LIMIT 1;

-- Best practices
SELECT
    c.customer_id,           -- No quotes needed for normal identifiers
    c.first_name,
    'Active' AS status,      -- Single quotes for string literals
    CONCAT(c.first_name, ' ', c.last_name) AS full_name
FROM customers c;

-- When backticks are necessary
SELECT
    product_id AS `Product ID`,          -- Space in alias
    price AS `Price ($)`,                -- Special character in alias
    stock_quantity AS `Quantity in Stock`  -- Spaces in alias
FROM products;
```

---

### 6.3 Integer Division

**Description:**
MySQL's division operator behavior differs from some SQL databases, especially for integer division.

**Key Concepts:**

- `/` operator: Returns decimal result (not integer)
- `DIV` operator: Performs integer division (MySQL specific)
- Standard SQL varies by implementation
- Use `DIV` for integer division, `/` for decimal

**Example:**

```sql
-- Regular division (returns decimal)
SELECT 10 / 3;              -- 3.3333

-- Integer division (MySQL specific)
SELECT 10 DIV 3;            -- 3

-- With columns
SELECT
    stock_quantity,
    stock_quantity / 10 AS regular_div,
    stock_quantity DIV 10 AS integer_div
FROM products;
```

**Practice Query:**

```sql
-- Demonstrate division types
SELECT
    10 AS numerator,
    3 AS denominator,
    10 / 3 AS regular_division,
    10 DIV 3 AS integer_division,
    10 MOD 3 AS modulo_remainder;

-- Product examples
SELECT
    product_name,
    stock_quantity,
    stock_quantity / 12 AS dozens_decimal,
    stock_quantity DIV 12 AS full_dozens,
    stock_quantity MOD 12 AS remaining_items
FROM products;

-- Price per unit calculations
SELECT
    product_name,
    price,
    stock_quantity,
    price / stock_quantity AS price_per_unit_decimal,
    ROUND(price / stock_quantity, 2) AS price_per_unit_rounded
FROM products
WHERE stock_quantity > 0;

-- Integer division for grouping
SELECT
    product_id,
    product_name,
    product_id DIV 5 AS group_number,
    product_id MOD 5 AS position_in_group
FROM products;

-- Calculate packages and remainders
SELECT
    product_name,
    stock_quantity,
    stock_quantity DIV 10 AS full_packages,
    stock_quantity MOD 10 AS loose_items,
    CONCAT(
        stock_quantity DIV 10,
        ' packages + ',
        stock_quantity MOD 10,
        ' items'
    ) AS breakdown
FROM products;

-- Order value distribution
SELECT
    order_id,
    total_amount,
    total_amount / 100 AS hundreds_decimal,
    total_amount DIV 100 AS full_hundreds,
    CONCAT('$', total_amount DIV 100, '00+') AS rounded_down
FROM orders;

-- Percentage calculations
SELECT
    product_name,
    price,
    stock_quantity,
    (stock_quantity DIV 100) * 100 AS rounded_to_hundreds,
    stock_quantity - ((stock_quantity DIV 100) * 100) AS remainder
FROM products;

-- Comparison table
SELECT
    'Example' AS description,
    17 AS value,
    17 / 5 AS regular_div,
    17 DIV 5 AS integer_div,
    17 MOD 5 AS modulo
UNION ALL
SELECT 'Example', 23, 23 / 7, 23 DIV 7, 23 MOD 7
UNION ALL
SELECT 'Example', 100, 100 / 12, 100 DIV 12, 100 MOD 12;
```

---

### 6.4 Comments

**Description:**
MySQL supports multiple comment styles. Understanding these helps with code documentation and debugging.

**Key Concepts:**

- `--` Single-line comment (space after -- required)
- `#` Single-line comment (MySQL specific)
- `/* */` Multi-line comment (standard SQL)
- Comments are ignored during execution

**Example:**

```sql
-- This is a single-line comment (standard SQL)
# This is also a single-line comment (MySQL specific)

/* This is a
   multi-line
   comment */

SELECT * FROM products;  -- inline comment
SELECT * FROM products;  # also works

/*
 * Block comment style
 * Often used for documentation
 */
```

**Practice Query:**

```sql
-- Single-line comment (standard SQL style)
SELECT product_name, price
FROM products;

# Single-line comment (MySQL specific style)
SELECT customer_id, first_name
FROM customers;

-- Inline comments
SELECT
    product_name,      -- The product's name
    price,             -- Price in USD
    stock_quantity     # Current inventory level
FROM products;

/* Multi-line comment
   Can span multiple lines
   Useful for longer explanations */
SELECT * FROM orders;

/*
 * Documentation-style block comment
 * Query: Get all high-value orders
 * Author: Database Admin
 * Date: 2024
 */
SELECT
    order_id,
    customer_id,
    total_amount
FROM orders
WHERE total_amount > 100;

-- Commenting out code for testing
SELECT
    product_name,
    price
    -- ,stock_quantity  -- Temporarily disabled
FROM products;

# Multiple comment styles in one query
SELECT
    c.customer_id,           -- Customer identifier
    c.first_name,            # First name
    /* c.last_name, */       /* Commented out for testing */
    c.email
FROM customers c
WHERE c.state = 'CA';      -- California customers only

/*
 * Complex query with extensive comments
 */
SELECT
    o.order_id,              -- Order number
    o.order_date,            -- When order was placed
    o.total_amount,          # Order total
    c.first_name,            -- Customer's first name
    c.last_name             /* Customer's last name */
FROM orders o
INNER JOIN customers c
    ON o.customer_id = c.customer_id  -- Join condition
WHERE o.status = 'delivered'          -- Only completed orders
ORDER BY o.order_date DESC            # Most recent first
LIMIT 10;                              -- Top 10 results

-- Nested comments (be careful!)
/* Outer comment
   -- Inner comment
   # Another inner comment
   Still in outer comment
*/

-- Comment out entire blocks
/*
SELECT * FROM products;
SELECT * FROM customers;
SELECT * FROM orders;
*/

-- Best practice: Describe what and why
-- Get customer order history for marketing analysis
SELECT
    c.customer_id,
    COUNT(o.order_id) AS total_orders,
    SUM(o.total_amount) AS lifetime_value
FROM customers c
LEFT JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id
HAVING total_orders > 0;  -- Exclude customers with no orders
```

---

## Conclusion

Congratulations! You've completed the MySQL Essential Training course.

You've learned:

- ✅ SQL fundamentals and database organization
- ✅ Data types and table creation
- ✅ Operators, functions, and conditional logic
- ✅ String manipulation and pattern matching
- ✅ Mathematical and trigonometric functions
- ✅ MySQL-specific features and standard SQL differences

### Next Steps

1. **Practice Regularly**: Use the shop_shine database to experiment with queries
2. **Build Projects**: Create your own databases and applications
3. **Explore Advanced Topics**: Indexes, stored procedures, triggers, views
4. **Performance Optimization**: Query optimization, EXPLAIN plans
5. **Security**: User management, permissions, SQL injection prevention

### Additional Resources

- Official MySQL Documentation: https://dev.mysql.com/doc/
- MySQL Workbench for visual database design
- Practice with real-world datasets
- Join MySQL communities and forums

**Remember**: The best way to learn SQL is by doing. Keep practicing with the examples in this guide and create your own queries!

---

## Quick Reference Tables

### Common Data Types

| Type          | Description             | Example               |
| ------------- | ----------------------- | --------------------- |
| INT           | Integer numbers         | 42                    |
| DECIMAL(10,2) | Exact decimal           | 99.99                 |
| VARCHAR(100)  | Variable string         | 'Hello'               |
| TEXT          | Long text               | 'Long description...' |
| DATE          | Date only               | '2024-01-15'          |
| DATETIME      | Date and time           | '2024-01-15 14:30:00' |
| TIMESTAMP     | Auto-updating timestamp | AUTO                  |
| ENUM          | List of values          | 'pending'             |

### Common Functions Quick Reference

```sql
-- String Functions
CONCAT(str1, str2)           -- Combine strings
UPPER(str) / LOWER(str)      -- Change case
SUBSTRING(str, pos, len)     -- Extract substring
LENGTH(str)                  -- String length
TRIM(str)                    -- Remove spaces

-- Math Functions
ROUND(num, decimals)         -- Round number
CEILING(num)                 -- Round up
FLOOR(num)                   -- Round down
ABS(num)                     -- Absolute value
MOD(num, divisor)            -- Remainder

-- Date Functions
NOW()                        -- Current datetime
CURDATE()                    -- Current date
DATE_FORMAT(date, format)    -- Format date
DATEDIFF(date1, date2)       -- Difference in days

-- Aggregate Functions
COUNT(*)                     -- Count rows
SUM(column)                  -- Total
AVG(column)                  -- Average
MAX(column)                  -- Maximum
MIN(column)                  -- Minimum
```

---

**Thank you for learning MySQL! Happy querying! 🎉**</parameter>ß
