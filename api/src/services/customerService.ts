import db from '../config/database';
import { Customer, CustomerInput } from '../types';

const getAllCustomers = async (): Promise<Customer[]> => {
  return await db('customers').select('*');
};

const getCustomerById = async (
  customer_id: number
): Promise<Customer | undefined> => {
  return await db('customers').where({ customer_id }).first();
};

const getCustomerByEmail = async (
  email: string
): Promise<Customer | undefined> => {
  return await db('customers').where({ email }).first();
};

const createCustomer = async (input: CustomerInput): Promise<Customer> => {
  const [id] = await db('customers').insert(input);
  return (await getCustomerById(id))!;
};

const updateCustomer = async (
  customer_id: number,
  input: CustomerInput
): Promise<Customer> => {
  await db('customers').where({ customer_id }).update(input);
  return (await getCustomerById(customer_id))!;
};

const deleteCustomer = async (customer_id: number): Promise<boolean> => {
  const deleted = await db('customers').where({ customer_id }).del();
  return deleted > 0;
};

export default {
  getAllCustomers,
  getCustomerById,
  getCustomerByEmail,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
