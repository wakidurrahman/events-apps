import type { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('customers').del();

  // Inserts seed entries
  await knex('customers').insert([
    {
      customer_id: 1,
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@email.com',
      phone: '555-0101',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zip_code: '10001',
    },
    {
      customer_id: 2,
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane.smith@email.com',
      phone: '555-0102',
      address: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zip_code: '90001',
    },
    {
      customer_id: 3,
      first_name: 'Mike',
      last_name: 'Johnson',
      email: 'mike.j@email.com',
      phone: '555-0103',
      address: '789 Pine Rd',
      city: 'Chicago',
      state: 'IL',
      zip_code: '60601',
    },
    {
      customer_id: 4,
      first_name: 'Emily',
      last_name: 'Brown',
      email: 'emily.b@email.com',
      phone: '555-0104',
      address: '321 Elm St',
      city: 'Houston',
      state: 'TX',
      zip_code: '77001',
    },
    {
      customer_id: 5,
      first_name: 'David',
      last_name: 'Wilson',
      email: 'david.w@email.com',
      phone: '555-0105',
      address: '654 Maple Dr',
      city: 'Phoenix',
      state: 'AZ',
      zip_code: '85001',
    },
  ]);
}
