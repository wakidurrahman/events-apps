import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('reviews').del();

  // Inserts seed entries
  await knex('reviews').insert([
    {
      review_id: 1,
      product_id: 1,
      customer_id: 1,
      rating: 5,
      review_text: 'Excellent laptop! Fast and reliable.',
    },
    {
      review_id: 2,
      product_id: 2,
      customer_id: 1,
      rating: 4,
      review_text: 'Good mouse, comfortable to use.',
    },
    {
      review_id: 3,
      product_id: 3,
      customer_id: 2,
      rating: 5,
      review_text: 'Great quality t-shirt, fits perfectly!',
    },
    {
      review_id: 4,
      product_id: 5,
      customer_id: 4,
      rating: 5,
      review_text: 'Best programming book I have read!',
    },
    {
      review_id: 5,
      product_id: 6,
      customer_id: 3,
      rating: 4,
      review_text: 'Quality tools, good value for money.',
    },
  ]);
}
