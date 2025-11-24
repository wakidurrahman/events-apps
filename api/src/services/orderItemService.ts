import db from '../config/database';
import { OrderItem, OrderItemInput } from '../types';

const getAllOrderItems = async (): Promise<OrderItem[]> => {
  return await db('order_items').select('*');
};

const getOrderItemById = async (
  order_item_id: number
): Promise<OrderItem | undefined> => {
  return await db('order_items').where({ order_item_id }).first();
};

const getOrderItemsByOrder = async (order_id: number): Promise<OrderItem[]> => {
  return await db('order_items').where({ order_id }).select('*');
};

const createOrderItem = async (input: OrderItemInput): Promise<OrderItem> => {
  const [id] = await db('order_items').insert(input);
  return (await getOrderItemById(id))!;
};

const updateOrderItem = async (
  order_item_id: number,
  input: OrderItemInput
): Promise<OrderItem> => {
  await db('order_items').where({ order_item_id }).update(input);
  return (await getOrderItemById(order_item_id))!;
};

const deleteOrderItem = async (order_item_id: number): Promise<boolean> => {
  const deleted = await db('order_items').where({ order_item_id }).del();
  return deleted > 0;
};

export default {
  getAllOrderItems,
  getOrderItemById,
  getOrderItemsByOrder,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
