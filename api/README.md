# Shop Shine API

GraphQL API for the Shop Shine e-commerce application built with Apollo Server, Node.js, TypeScript, and MySQL.

## Tech Stack

- **Node.js** - Runtime environment
- **TypeScript** - Type-safe JavaScript
- **Apollo Server** - GraphQL server
- **Express** - Web framework
- **Knex.js** - SQL query builder
- **MySQL** - Database
- **Jest** - Testing framework

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

Copy `.env.example` to `.env` and update with your settings:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=shop_shine
DB_PORT=3306

PORT=4000
NODE_ENV=development
```

3. Make sure the database exists and migrations are run (see `../database` folder)

## Development

Start the development server with hot reload:

```bash
npm run dev
```

The GraphQL playground will be available at `http://localhost:4000/graphql`

## Production

Build and start the production server:

```bash
npm run build
npm start
```

## Testing

Run tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## API Structure

```
src/
├── config/           # Configuration files (database, etc.)
├── graphql/
│   ├── resolvers/    # GraphQL resolvers
│   └── schemas/      # GraphQL type definitions
├── services/         # Business logic layer
├── types/            # TypeScript type definitions
└── index.ts          # Entry point
```

## GraphQL API

### Queries

#### Categories

```graphql
query {
  categories {
    category_id
    category_name
    description
    products {
      product_name
    }
  }
}
```

#### Products

```graphql
query {
  products {
    product_id
    product_name
    price
    stock_quantity
    category {
      category_name
    }
  }
}

query GetProduct {
  product(product_id: 1) {
    product_name
    price
  }
}
```

#### Customers

```graphql
query {
  customers {
    customer_id
    first_name
    last_name
    email
  }
}

query GetCustomerOrders {
  customer(customer_id: 1) {
    first_name
    last_name
    orders {
      order_id
      total_amount
      status
    }
  }
}
```

#### Orders

```graphql
query {
  orders {
    order_id
    order_date
    status
    total_amount
    customer {
      first_name
      last_name
    }
    order_items {
      product {
        product_name
      }
      quantity
      subtotal
    }
  }
}
```

### Mutations

#### Create Product

```graphql
mutation {
  createProduct(
    input: {
      product_name: "New Product"
      description: "Product description"
      price: 99.99
      stock_quantity: 100
      category_id: 1
    }
  ) {
    product_id
    product_name
    price
  }
}
```

#### Update Product

```graphql
mutation {
  updateProduct(
    product_id: 1
    input: { product_name: "Updated Product", price: 89.99, stock_quantity: 50 }
  ) {
    product_id
    product_name
    price
  }
}
```

#### Create Order

```graphql
mutation {
  createOrder(
    input: {
      customer_id: 1
      total_amount: 199.99
      status: "pending"
      shipping_address: "123 Main St"
    }
  ) {
    order_id
    status
    total_amount
  }
}
```

#### Create Review

```graphql
mutation {
  createReview(
    input: {
      product_id: 1
      customer_id: 1
      rating: 5
      review_text: "Great product!"
    }
  ) {
    review_id
    rating
    review_text
  }
}
```

## Available Endpoints

### Categories

- `categories` - Get all categories
- `category(category_id)` - Get category by ID
- `createCategory(input)` - Create new category
- `updateCategory(category_id, input)` - Update category
- `deleteCategory(category_id)` - Delete category

### Products

- `products` - Get all products
- `product(product_id)` - Get product by ID
- `productsByCategory(category_id)` - Get products by category
- `createProduct(input)` - Create new product
- `updateProduct(product_id, input)` - Update product
- `deleteProduct(product_id)` - Delete product

### Customers

- `customers` - Get all customers
- `customer(customer_id)` - Get customer by ID
- `customerByEmail(email)` - Get customer by email
- `createCustomer(input)` - Create new customer
- `updateCustomer(customer_id, input)` - Update customer
- `deleteCustomer(customer_id)` - Delete customer

### Orders

- `orders` - Get all orders
- `order(order_id)` - Get order by ID
- `ordersByCustomer(customer_id)` - Get orders by customer
- `createOrder(input)` - Create new order
- `updateOrder(order_id, input)` - Update order
- `deleteOrder(order_id)` - Delete order

### Order Items

- `orderItems` - Get all order items
- `orderItem(order_item_id)` - Get order item by ID
- `orderItemsByOrder(order_id)` - Get order items by order
- `createOrderItem(input)` - Create new order item
- `updateOrderItem(order_item_id, input)` - Update order item
- `deleteOrderItem(order_item_id)` - Delete order item

### Payments

- `payments` - Get all payments
- `payment(payment_id)` - Get payment by ID
- `paymentByOrder(order_id)` - Get payment by order
- `createPayment(input)` - Create new payment
- `updatePayment(payment_id, input)` - Update payment
- `deletePayment(payment_id)` - Delete payment

### Reviews

- `reviews` - Get all reviews
- `review(review_id)` - Get review by ID
- `reviewsByProduct(product_id)` - Get reviews by product
- `reviewsByCustomer(customer_id)` - Get reviews by customer
- `createReview(input)` - Create new review
- `updateReview(review_id, input)` - Update review
- `deleteReview(review_id)` - Delete review
