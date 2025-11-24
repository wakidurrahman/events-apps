import db from '../config/database';
import { Order, OrderInput } from '../types';

const getAllOrders = async (): Promise<Order[]> => {
  return await db('orders').select('*');
};

const getOrderById = async (order_id: number): Promise<Order | undefined> => {
  return await db('orders').where({ order_id }).first();
};

const getOrdersByCustomer = async (customer_id: number): Promise<Order[]> => {
  return await db('orders').where({ customer_id }).select('*');
};

const createOrder = async (input: OrderInput): Promise<Order> => {
  const [id] = await db('orders').insert(input);
  return (await getOrderById(id))!;
};

const updateOrder = async (
  order_id: number,
  input: OrderInput
): Promise<Order> => {
  await db('orders').where({ order_id }).update(input);
  return (await getOrderById(order_id))!;
};

const deleteOrder = async (order_id: number): Promise<boolean> => {
  const deleted = await db('orders').where({ order_id }).del();
  return deleted > 0;
};

export default {
  getAllOrders,
  getOrderById,
  getOrdersByCustomer,
  createOrder,
  updateOrder,
  deleteOrder,
};
