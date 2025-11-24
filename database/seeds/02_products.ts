import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('products').del();

  // Inserts seed entries
  await knex('products').insert([
    {
      product_id: 1,
      product_name: 'Laptop Pro 15',
      description: 'High-performance laptop with 16GB RAM',
      price: 1299.99,
      stock_quantity: 50,
      category_id: 1,
    },
    {
      product_id: 2,
      product_name: 'Wireless Mouse',
      description: 'Ergonomic wireless mouse',
      price: 29.99,
      stock_quantity: 200,
      category_id: 1,
    },
    {
      product_id: 3,
      product_name: 'Cotton T-Shirt',
      description: 'Comfortable cotton t-shirt',
      price: 19.99,
      stock_quantity: 150,
      category_id: 2,
    },
    {
      product_id: 4,
      product_name: 'Denim Jeans',
      description: 'Classic blue denim jeans',
      price: 49.99,
      stock_quantity: 100,
      category_id: 2,
    },
    {
      product_id: 5,
      product_name: 'Python Programming',
      description: 'Learn Python from scratch',
      price: 39.99,
      stock_quantity: 75,
      category_id: 3,
    },
    {
      product_id: 6,
      product_name: 'Garden Tools Set',
      description: 'Complete set of garden tools',
      price: 89.99,
      stock_quantity: 30,
      category_id: 4,
    },
    {
      product_id: 7,
      product_name: 'Yoga Mat',
      description: 'Non-slip yoga mat',
      price: 24.99,
      stock_quantity: 80,
      category_id: 5,
    },
  ]);
}
