import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('order_items').del();

  // Inserts seed entries
  await knex('order_items').insert([
    {
      order_item_id: 1,
      order_id: 1,
      product_id: 1,
      quantity: 1,
      unit_price: 1299.99,
      subtotal: 1299.99,
    },
    {
      order_item_id: 2,
      order_id: 1,
      product_id: 2,
      quantity: 1,
      unit_price: 29.99,
      subtotal: 29.99,
    },
    {
      order_item_id: 3,
      order_id: 2,
      product_id: 3,
      quantity: 2,
      unit_price: 19.99,
      subtotal: 39.98,
    },
    {
      order_item_id: 4,
      order_id: 2,
      product_id: 2,
      quantity: 1,
      unit_price: 29.99,
      subtotal: 29.99,
    },
    {
      order_item_id: 5,
      order_id: 3,
      product_id: 6,
      quantity: 1,
      unit_price: 89.99,
      subtotal: 89.99,
    },
    {
      order_item_id: 6,
      order_id: 4,
      product_id: 4,
      quantity: 1,
      unit_price: 49.99,
      subtotal: 49.99,
    },
    {
      order_item_id: 7,
      order_id: 4,
      product_id: 3,
      quantity: 1,
      unit_price: 19.99,
      subtotal: 19.99,
    },
    {
      order_item_id: 8,
      order_id: 5,
      product_id: 5,
      quantity: 1,
      unit_price: 39.99,
      subtotal: 39.99,
    },
  ]);
}
