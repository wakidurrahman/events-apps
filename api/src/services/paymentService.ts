import db from '../config/database';
import { Payment, PaymentInput } from '../types';

const getAllPayments = async (): Promise<Payment[]> => {
  return await db('payments').select('*');
};

const getPaymentById = async (
  payment_id: number
): Promise<Payment | undefined> => {
  return await db('payments').where({ payment_id }).first();
};

const getPaymentByOrder = async (
  order_id: number
): Promise<Payment | undefined> => {
  return await db('payments').where({ order_id }).first();
};

const createPayment = async (input: PaymentInput): Promise<Payment> => {
  const [id] = await db('payments').insert(input);
  return (await getPaymentById(id))!;
};

const updatePayment = async (
  payment_id: number,
  input: PaymentInput
): Promise<Payment> => {
  await db('payments').where({ payment_id }).update(input);
  return (await getPaymentById(payment_id))!;
};

const deletePayment = async (payment_id: number): Promise<boolean> => {
  const deleted = await db('payments').where({ payment_id }).del();
  return deleted > 0;
};

export default {
  getAllPayments,
  getPaymentById,
  getPaymentByOrder,
  createPayment,
  updatePayment,
  deletePayment,
};
