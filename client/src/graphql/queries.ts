import { gql } from '@apollo/client';

// Category Queries
export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      category_id
      category_name
      description
    }
  }
`;

// Product Queries
export const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      product_id
      product_name
      description
      price
      stock_quantity
      category_id
      category {
        category_name
      }
    }
  }
`;

export const GET_PRODUCT = gql`
  query GetProduct($productId: ID!) {
    product(product_id: $productId) {
      product_id
      product_name
      description
      price
      stock_quantity
      category {
        category_id
        category_name
      }
      reviews {
        review_id
        rating
        review_text
        customer {
          first_name
          last_name
        }
      }
    }
  }
`;

// Customer Queries
export const GET_CUSTOMERS = gql`
  query GetCustomers {
    customers {
      customer_id
      first_name
      last_name
      email
      phone
      city
      state
    }
  }
`;

export const GET_CUSTOMER = gql`
  query GetCustomer($customerId: ID!) {
    customer(customer_id: $customerId) {
      customer_id
      first_name
      last_name
      email
      phone
      address
      city
      state
      zip_code
      country
      orders {
        order_id
        order_date
        status
        total_amount
      }
    }
  }
`;

// Order Queries
export const GET_ORDERS = gql`
  query GetOrders {
    orders {
      order_id
      order_date
      status
      total_amount
      customer {
        first_name
        last_name
        email
      }
    }
  }
`;

export const GET_ORDER = gql`
  query GetOrder($orderId: ID!) {
    order(order_id: $orderId) {
      order_id
      order_date
      status
      total_amount
      shipping_address
      customer {
        first_name
        last_name
        email
      }
      order_items {
        order_item_id
        quantity
        unit_price
        subtotal
        product {
          product_name
        }
      }
    }
  }
`;
