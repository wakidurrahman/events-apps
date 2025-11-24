export const typeDefs = `#graphql
  # Category Types
  type Category {
    category_id: ID!
    category_name: String!
    description: String
    created_at: String!
    products: [Product!]
  }

  input CategoryInput {
    category_name: String!
    description: String
  }

  # Product Types
  type Product {
    product_id: ID!
    product_name: String!
    description: String
    price: Float!
    stock_quantity: Int!
    category_id: Int
    created_at: String!
    updated_at: String!
    category: Category
    reviews: [Review!]
  }

  input ProductInput {
    product_name: String!
    description: String
    price: Float!
    stock_quantity: Int!
    category_id: Int
  }

  # Customer Types
  type Customer {
    customer_id: ID!
    first_name: String!
    last_name: String!
    email: String!
    phone: String
    address: String
    city: String
    state: String
    zip_code: String
    country: String!
    registration_date: String!
    orders: [Order!]
    reviews: [Review!]
  }

  input CustomerInput {
    first_name: String!
    last_name: String!
    email: String!
    phone: String
    address: String
    city: String
    state: String
    zip_code: String
    country: String
  }

  # Order Types
  type Order {
    order_id: ID!
    customer_id: Int!
    order_date: String!
    status: String!
    total_amount: Float!
    shipping_address: String
    customer: Customer
    order_items: [OrderItem!]
    payment: Payment
  }

  input OrderInput {
    customer_id: Int!
    status: String
    total_amount: Float!
    shipping_address: String
  }

  # Order Item Types
  type OrderItem {
    order_item_id: ID!
    order_id: Int!
    product_id: Int!
    quantity: Int!
    unit_price: Float!
    subtotal: Float!
    product: Product
    order: Order
  }

  input OrderItemInput {
    order_id: Int!
    product_id: Int!
    quantity: Int!
    unit_price: Float!
    subtotal: Float!
  }

  # Payment Types
  type Payment {
    payment_id: ID!
    order_id: Int!
    payment_date: String!
    payment_method: String!
    amount: Float!
    status: String!
    order: Order
  }

  input PaymentInput {
    order_id: Int!
    payment_method: String!
    amount: Float!
    status: String
  }

  # Review Types
  type Review {
    review_id: ID!
    product_id: Int!
    customer_id: Int!
    rating: Int!
    review_text: String
    review_date: String!
    product: Product
    customer: Customer
  }

  input ReviewInput {
    product_id: Int!
    customer_id: Int!
    rating: Int!
    review_text: String
  }

  # Query Types
  type Query {
    # Categories
    categories: [Category!]!
    category(category_id: ID!): Category

    # Products
    products: [Product!]!
    product(product_id: ID!): Product
    productsByCategory(category_id: ID!): [Product!]!

    # Customers
    customers: [Customer!]!
    customer(customer_id: ID!): Customer
    customerByEmail(email: String!): Customer

    # Orders
    orders: [Order!]!
    order(order_id: ID!): Order
    ordersByCustomer(customer_id: ID!): [Order!]!

    # Order Items
    orderItems: [OrderItem!]!
    orderItem(order_item_id: ID!): OrderItem
    orderItemsByOrder(order_id: ID!): [OrderItem!]!

    # Payments
    payments: [Payment!]!
    payment(payment_id: ID!): Payment
    paymentByOrder(order_id: ID!): Payment

    # Reviews
    reviews: [Review!]!
    review(review_id: ID!): Review
    reviewsByProduct(product_id: ID!): [Review!]!
    reviewsByCustomer(customer_id: ID!): [Review!]!
  }

  # Mutation Types
  type Mutation {
    # Categories
    createCategory(input: CategoryInput!): Category!
    updateCategory(category_id: ID!, input: CategoryInput!): Category!
    deleteCategory(category_id: ID!): Boolean!

    # Products
    createProduct(input: ProductInput!): Product!
    updateProduct(product_id: ID!, input: ProductInput!): Product!
    deleteProduct(product_id: ID!): Boolean!

    # Customers
    createCustomer(input: CustomerInput!): Customer!
    updateCustomer(customer_id: ID!, input: CustomerInput!): Customer!
    deleteCustomer(customer_id: ID!): Boolean!

    # Orders
    createOrder(input: OrderInput!): Order!
    updateOrder(order_id: ID!, input: OrderInput!): Order!
    deleteOrder(order_id: ID!): Boolean!

    # Order Items
    createOrderItem(input: OrderItemInput!): OrderItem!
    updateOrderItem(order_item_id: ID!, input: OrderItemInput!): OrderItem!
    deleteOrderItem(order_item_id: ID!): Boolean!

    # Payments
    createPayment(input: PaymentInput!): Payment!
    updatePayment(payment_id: ID!, input: PaymentInput!): Payment!
    deletePayment(payment_id: ID!): Boolean!

    # Reviews
    createReview(input: ReviewInput!): Review!
    updateReview(review_id: ID!, input: ReviewInput!): Review!
    deleteReview(review_id: ID!): Boolean!
  }
`;
