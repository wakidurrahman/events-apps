import { gql } from '@apollo/client';

// Product Mutations
export const CREATE_PRODUCT = gql`
  mutation CreateProduct($input: ProductInput!) {
    createProduct(input: $input) {
      product_id
      product_name
      price
      stock_quantity
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($productId: ID!, $input: ProductInput!) {
    updateProduct(product_id: $productId, input: $input) {
      product_id
      product_name
      price
      stock_quantity
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($productId: ID!) {
    deleteProduct(product_id: $productId)
  }
`;

// Customer Mutations
export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($input: CustomerInput!) {
    createCustomer(input: $input) {
      customer_id
      first_name
      last_name
      email
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($customerId: ID!, $input: CustomerInput!) {
    updateCustomer(customer_id: $customerId, input: $input) {
      customer_id
      first_name
      last_name
      email
    }
  }
`;

// Order Mutations
export const CREATE_ORDER = gql`
  mutation CreateOrder($input: OrderInput!) {
    createOrder(input: $input) {
      order_id
      order_date
      status
      total_amount
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($orderId: ID!, $input: OrderInput!) {
    updateOrder(order_id: $orderId, input: $input) {
      order_id
      status
      total_amount
    }
  }
`;

// Review Mutations
export const CREATE_REVIEW = gql`
  mutation CreateReview($input: ReviewInput!) {
    createReview(input: $input) {
      review_id
      rating
      review_text
    }
  }
`;
