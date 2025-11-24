import type { Knex } from 'knex';

/**
 * Create the order items table
 * @param knex - The Knex instance
 * @returns A promise that resolves to void
 */

const ORDER_ITEMS_TABLE = 'order_items';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(ORDER_ITEMS_TABLE, (table) => {
    table.increments('order_item_id').primary();
    table.integer('order_id').unsigned().notNullable();
    table.integer('product_id').unsigned().notNullable();
    table.integer('quantity').notNullable();
    table.decimal('unit_price', 10, 2).notNullable();
    table.decimal('subtotal', 10, 2).notNullable();

    // Foreign keys
    table
      .foreign('order_id')
      .references('order_id')
      .inTable('orders')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table
      .foreign('product_id')
      .references('product_id')
      .inTable('products')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    // Indexes
    table.index('order_id');
    table.index('product_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(ORDER_ITEMS_TABLE);
}
