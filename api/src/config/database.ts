import dotenv from 'dotenv';
import knex, { Knex } from 'knex';

dotenv.config();

/**
 * Database configuration
 * @returns A promise that resolves to void
 */

const DATABASE_CONFIG: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306'),
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'shop_shine',
  },
  pool: {
    min: 2,
    max: 10,
  },
  debug: process.env.NODE_ENV === 'development',
};

const db = knex(DATABASE_CONFIG);

export default db;
