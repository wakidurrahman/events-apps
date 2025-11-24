import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('orders').del();

  // Inserts seed entries
  await knex('orders').insert([
    {
      order_id: 1,
      customer_id: 1,
      status: 'delivered',
      total_amount: 1329.98,
      shipping_address: '123 Main St, New York, NY 10001',
    },
    {
      order_id: 2,
      customer_id: 2,
      status: 'shipped',
      total_amount: 69.98,
      shipping_address: '456 Oak Ave, Los Angeles, CA 90001',
    },
    {
      order_id: 3,
      customer_id: 3,
      status: 'processing',
      total_amount: 89.99,
      shipping_address: '789 Pine Rd, Chicago, IL 60601',
    },
    {
      order_id: 4,
      customer_id: 1,
      status: 'pending',
      total_amount: 69.98,
      shipping_address: '123 Main St, New York, NY 10001',
    },
    {
      order_id: 5,
      customer_id: 4,
      status: 'delivered',
      total_amount: 39.99,
      shipping_address: '321 Elm St, Houston, TX 77001',
    },
  ]);
}
