// Category Types
export interface Category {
  category_id: number;
  category_name: string;
  description?: string;
  created_at: Date;
}

export interface CategoryInput {
  category_name: string;
  description?: string;
}

// Product Types
export interface Product {
  product_id: number;
  product_name: string;
  description?: string;
  price: number;
  stock_quantity: number;
  category_id?: number;
  created_at: Date;
  updated_at: Date;
}

export interface ProductInput {
  product_name: string;
  description?: string;
  price: number;
  stock_quantity: number;
  category_id?: number;
}

// Customer Types
export interface Customer {
  customer_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country: string;
  registration_date: Date;
}

export interface CustomerInput {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  country?: string;
}

// Order Types
export interface Order {
  order_id: number;
  customer_id: number;
  order_date: Date;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total_amount: number;
  shipping_address?: string;
}

export interface OrderInput {
  customer_id: number;
  status?: string;
  total_amount: number;
  shipping_address?: string;
}

// Order Item Types
export interface OrderItem {
  order_item_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export interface OrderItemInput {
  order_id: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

// Payment Types
export interface Payment {
  payment_id: number;
  order_id: number;
  payment_date: Date;
  payment_method:
    | 'credit_card'
    | 'debit_card'
    | 'paypal'
    | 'bank_transfer'
    | 'cash';
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
}

export interface PaymentInput {
  order_id: number;
  payment_method: string;
  amount: number;
  status?: string;
}

// Review Types
export interface Review {
  review_id: number;
  product_id: number;
  customer_id: number;
  rating: number;
  review_text?: string;
  review_date: Date;
}

export interface ReviewInput {
  product_id: number;
  customer_id: number;
  rating: number;
  review_text?: string;
}
