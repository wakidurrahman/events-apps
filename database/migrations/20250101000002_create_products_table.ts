import type { Knex } from 'knex';

/**
 * Create the products table
 * @param knex - The Knex instance
 * @returns A promise that resolves to void
 */

const PRODUCTS_TABLE = 'products';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(PRODUCTS_TABLE, (table) => {
    table.increments('product_id').primary();
    table.string('product_name', 200).notNullable();
    table.text('description');
    table.decimal('price', 10, 2).notNullable();
    table.integer('stock_quantity').defaultTo(0);
    table.integer('category_id').unsigned();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table
      .timestamp('updated_at')
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    // Foreign key
    table
      .foreign('category_id')
      .references('category_id')
      .inTable('categories')
      .onDelete('SET NULL')
      .onUpdate('CASCADE');

    // Indexes
    table.index('category_id');
    table.index('product_name');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(PRODUCTS_TABLE);
}
