# Shop Shine Database

Database migrations and seeds for the Shop Shine e-commerce application using Knex.js and MySQL.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

Copy `.env.example` to `.env` and update with your MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=shop_shine
DB_PORT=3306
```

## Migrations

### Run all migrations

```bash
npm run migrate:latest
```

### Rollback last migration

```bash
npm run migrate:rollback
```

### Create a new migration

```bash
npm run migrate:make migration_name
```

## Seeds

### Run all seeds

```bash
npm run seed:run
```

### Create a new seed

```bash
npm run seed:make seed_name
```

## Database Schema

The database includes the following tables:

- **categories**: Product categories
- **products**: Product catalog with pricing and inventory
- **customers**: Customer information
- **orders**: Customer orders
- **order_items**: Line items for each order
- **payments**: Payment records
- **reviews**: Product reviews and ratings

## Tables Overview

### Categories

- `category_id` (PK)
- `category_name`
- `description`
- `created_at`

### Products

- `product_id` (PK)
- `product_name`
- `description`
- `price`
- `stock_quantity`
- `category_id` (FK)
- `created_at`
- `updated_at`

### Customers

- `customer_id` (PK)
- `first_name`
- `last_name`
- `email` (unique)
- `phone`
- `address`
- `city`
- `state`
- `zip_code`
- `country`
- `registration_date`

### Orders

- `order_id` (PK)
- `customer_id` (FK)
- `order_date`
- `status`
- `total_amount`
- `shipping_address`

### Order Items

- `order_item_id` (PK)
- `order_id` (FK)
- `product_id` (FK)
- `quantity`
- `unit_price`
- `subtotal`

### Payments

- `payment_id` (PK)
- `order_id` (FK)
- `payment_date`
- `payment_method`
- `amount`
- `status`

### Reviews

- `review_id` (PK)
- `product_id` (FK)
- `customer_id` (FK)
- `rating`
- `review_text`
- `review_date`
