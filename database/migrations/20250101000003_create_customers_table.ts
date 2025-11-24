import type { Knex } from 'knex';

/**
 * Create the customers table
 * @param knex - The Knex instance
 * @returns A promise that resolves to void
 */

const CUSTOMERS_TABLE = 'customers';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(CUSTOMERS_TABLE, (table) => {
    table.increments('customer_id').primary();
    table.string('first_name', 50).notNullable();
    table.string('last_name', 50).notNullable();
    table.string('email', 100).notNullable().unique();
    table.string('phone', 20);
    table.text('address');
    table.string('city', 50);
    table.string('state', 50);
    table.string('zip_code', 10);
    table.string('country', 50).defaultTo('USA');
    table.timestamp('registration_date').defaultTo(knex.fn.now());

    // Indexes
    table.index('email');
    table.index(['last_name', 'first_name']);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(CUSTOMERS_TABLE);
}
