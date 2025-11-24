import type { Knex } from 'knex';

/**
 * Create the reviews table
 * @param knex - The Knex instance
 * @returns A promise that resolves to void
 */

const REVIEWS_TABLE = 'reviews';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(REVIEWS_TABLE, (table) => {
    table.increments('review_id').primary();
    table.integer('product_id').unsigned().notNullable();
    table.integer('customer_id').unsigned().notNullable();
    table.integer('rating').notNullable().checkBetween([1, 5]);
    table.text('review_text');
    table.timestamp('review_date').defaultTo(knex.fn.now());

    // Foreign keys
    table
      .foreign('product_id')
      .references('product_id')
      .inTable('products')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table
      .foreign('customer_id')
      .references('customer_id')
      .inTable('customers')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    // Indexes
    table.index('product_id');
    table.index('customer_id');
    table.index('rating');
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(REVIEWS_TABLE);
}
