import type { Knex } from 'knex';

/**
 * Create the payments table
 * @param knex - The Knex instance
 * @returns A promise that resolves to void
 */

const PAYMENTS_TABLE = 'payments';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(PAYMENTS_TABLE, (table) => {
    table.increments('payment_id').primary();
    table.integer('order_id').unsigned().notNullable();
    table.timestamp('payment_date').defaultTo(knex.fn.now());
    table
      .enum('payment_method', [
        'credit_card',
        'debit_card',
        'paypal',
        'bank_transfer',
        'cash',
      ])
      .notNullable();
    table.decimal('amount', 10, 2).notNullable();
    table
      .enum('status', ['pending', 'completed', 'failed', 'refunded'])
      .defaultTo('pending');

    // Foreign key
    table
      .foreign('order_id')
      .references('order_id')
      .inTable('orders')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    // Indexes
    table.index('order_id');
    table.index('status');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(PAYMENTS_TABLE);
}
