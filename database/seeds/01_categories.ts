import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('categories').del();

  // Inserts seed entries
  await knex('categories').insert([
    {
      category_id: 1,
      category_name: 'Electronics',
      description: 'Electronic devices and accessories',
    },
    {
      category_id: 2,
      category_name: 'Clothing',
      description: 'Men and women clothing',
    },
    {
      category_id: 3,
      category_name: 'Books',
      description: 'Books and publications',
    },
    {
      category_id: 4,
      category_name: 'Home & Garden',
      description: 'Home improvement and garden supplies',
    },
    {
      category_id: 5,
      category_name: 'Sports',
      description: 'Sports equipment and accessories',
    },
  ]);
}
