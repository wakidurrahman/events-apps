import categoryService from '../../services/categoryService';
import customerService from '../../services/customerService';
import orderItemService from '../../services/orderItemService';
import orderService from '../../services/orderService';
import paymentService from '../../services/paymentService';
import productService from '../../services/productService';
import reviewService from '../../services/reviewService';

export const resolvers = {
  Query: {
    // Categories
    categories: () => categoryService.getAllCategories(),
    category: (_: any, { category_id }: { category_id: number }) =>
      categoryService.getCategoryById(category_id),

    // Products
    products: () => productService.getAllProducts(),
    product: (_: any, { product_id }: { product_id: number }) =>
      productService.getProductById(product_id),
    productsByCategory: (_: any, { category_id }: { category_id: number }) =>
      productService.getProductsByCategory(category_id),

    // Customers
    customers: () => customerService.getAllCustomers(),
    customer: (_: any, { customer_id }: { customer_id: number }) =>
      customerService.getCustomerById(customer_id),
    customerByEmail: (_: any, { email }: { email: string }) =>
      customerService.getCustomerByEmail(email),

    // Orders
    orders: () => orderService.getAllOrders(),
    order: (_: any, { order_id }: { order_id: number }) =>
      orderService.getOrderById(order_id),
    ordersByCustomer: (_: any, { customer_id }: { customer_id: number }) =>
      orderService.getOrdersByCustomer(customer_id),

    // Order Items
    orderItems: () => orderItemService.getAllOrderItems(),
    orderItem: (_: any, { order_item_id }: { order_item_id: number }) =>
      orderItemService.getOrderItemById(order_item_id),
    orderItemsByOrder: (_: any, { order_id }: { order_id: number }) =>
      orderItemService.getOrderItemsByOrder(order_id),

    // Payments
    payments: () => paymentService.getAllPayments(),
    payment: (_: any, { payment_id }: { payment_id: number }) =>
      paymentService.getPaymentById(payment_id),
    paymentByOrder: (_: any, { order_id }: { order_id: number }) =>
      paymentService.getPaymentByOrder(order_id),

    // Reviews
    reviews: () => reviewService.getAllReviews(),
    review: (_: any, { review_id }: { review_id: number }) =>
      reviewService.getReviewById(review_id),
    reviewsByProduct: (_: any, { product_id }: { product_id: number }) =>
      reviewService.getReviewsByProduct(product_id),
    reviewsByCustomer: (_: any, { customer_id }: { customer_id: number }) =>
      reviewService.getReviewsByCustomer(customer_id),
  },

  Mutation: {
    // Categories
    createCategory: (_: any, { input }: any) =>
      categoryService.createCategory(input),
    updateCategory: (_: any, { category_id, input }: any) =>
      categoryService.updateCategory(category_id, input),
    deleteCategory: (_: any, { category_id }: { category_id: number }) =>
      categoryService.deleteCategory(category_id),

    // Products
    createProduct: (_: any, { input }: any) =>
      productService.createProduct(input),
    updateProduct: (_: any, { product_id, input }: any) =>
      productService.updateProduct(product_id, input),
    deleteProduct: (_: any, { product_id }: { product_id: number }) =>
      productService.deleteProduct(product_id),

    // Customers
    createCustomer: (_: any, { input }: any) =>
      customerService.createCustomer(input),
    updateCustomer: (_: any, { customer_id, input }: any) =>
      customerService.updateCustomer(customer_id, input),
    deleteCustomer: (_: any, { customer_id }: { customer_id: number }) =>
      customerService.deleteCustomer(customer_id),

    // Orders
    createOrder: (_: any, { input }: any) => orderService.createOrder(input),
    updateOrder: (_: any, { order_id, input }: any) =>
      orderService.updateOrder(order_id, input),
    deleteOrder: (_: any, { order_id }: { order_id: number }) =>
      orderService.deleteOrder(order_id),

    // Order Items
    createOrderItem: (_: any, { input }: any) =>
      orderItemService.createOrderItem(input),
    updateOrderItem: (_: any, { order_item_id, input }: any) =>
      orderItemService.updateOrderItem(order_item_id, input),
    deleteOrderItem: (_: any, { order_item_id }: { order_item_id: number }) =>
      orderItemService.deleteOrderItem(order_item_id),

    // Payments
    createPayment: (_: any, { input }: any) =>
      paymentService.createPayment(input),
    updatePayment: (_: any, { payment_id, input }: any) =>
      paymentService.updatePayment(payment_id, input),
    deletePayment: (_: any, { payment_id }: { payment_id: number }) =>
      paymentService.deletePayment(payment_id),

    // Reviews
    createReview: (_: any, { input }: any) => reviewService.createReview(input),
    updateReview: (_: any, { review_id, input }: any) =>
      reviewService.updateReview(review_id, input),
    deleteReview: (_: any, { review_id }: { review_id: number }) =>
      reviewService.deleteReview(review_id),
  },

  // Field resolvers for nested data
  Category: {
    products: (parent: any) =>
      productService.getProductsByCategory(parent.category_id),
  },

  Product: {
    category: (parent: any) =>
      parent.category_id
        ? categoryService.getCategoryById(parent.category_id)
        : null,
    reviews: (parent: any) =>
      reviewService.getReviewsByProduct(parent.product_id),
  },

  Customer: {
    orders: (parent: any) =>
      orderService.getOrdersByCustomer(parent.customer_id),
    reviews: (parent: any) =>
      reviewService.getReviewsByCustomer(parent.customer_id),
  },

  Order: {
    customer: (parent: any) =>
      customerService.getCustomerById(parent.customer_id),
    order_items: (parent: any) =>
      orderItemService.getOrderItemsByOrder(parent.order_id),
    payment: (parent: any) => paymentService.getPaymentByOrder(parent.order_id),
  },

  OrderItem: {
    product: (parent: any) => productService.getProductById(parent.product_id),
    order: (parent: any) => orderService.getOrderById(parent.order_id),
  },

  Payment: {
    order: (parent: any) => orderService.getOrderById(parent.order_id),
  },

  Review: {
    product: (parent: any) => productService.getProductById(parent.product_id),
    customer: (parent: any) =>
      customerService.getCustomerById(parent.customer_id),
  },
};
