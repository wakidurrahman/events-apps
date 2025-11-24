import type { Knex } from 'knex';

/**
 * Create the categories table
 * @param knex - The Knex instance
 * @returns A promise that resolves to void
 */

const CATEGORIES_TABLE = 'categories';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(CATEGORIES_TABLE, (table) => {
    table.increments('category_id').primary();
    table.string('category_name', 100).notNullable();
    table.text('description');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(CATEGORIES_TABLE);
}
