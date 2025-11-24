import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('payments').del();

  // Inserts seed entries
  await knex('payments').insert([
    {
      payment_id: 1,
      order_id: 1,
      payment_method: 'credit_card',
      amount: 1329.98,
      status: 'completed',
    },
    {
      payment_id: 2,
      order_id: 2,
      payment_method: 'paypal',
      amount: 69.98,
      status: 'completed',
    },
    {
      payment_id: 3,
      order_id: 3,
      payment_method: 'debit_card',
      amount: 89.99,
      status: 'pending',
    },
    {
      payment_id: 4,
      order_id: 5,
      payment_method: 'credit_card',
      amount: 39.99,
      status: 'completed',
    },
  ]);
}
