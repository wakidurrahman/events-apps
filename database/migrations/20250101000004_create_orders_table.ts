import type { Knex } from 'knex';

/**
 * Create the orders table
 * @param knex - The Knex instance
 * @returns A promise that resolves to void
 */

const ORDERS_TABLE = 'orders';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(ORDERS_TABLE, (table) => {
    table.increments('order_id').primary();
    table.integer('customer_id').unsigned().notNullable();
    table.timestamp('order_date').defaultTo(knex.fn.now());
    table
      .enum('status', [
        'pending',
        'processing',
        'shipped',
        'delivered',
        'cancelled',
      ])
      .defaultTo('pending');
    table.decimal('total_amount', 10, 2).defaultTo(0.0);
    table.text('shipping_address');

    // Foreign key
    table
      .foreign('customer_id')
      .references('customer_id')
      .inTable('customers')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    // Indexes
    table.index('customer_id');
    table.index('order_date');
    table.index('status');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(ORDERS_TABLE);
}
