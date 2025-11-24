import db from '../config/database';
import { Product, ProductInput } from '../types';

const getAllProducts = async (): Promise<Product[]> => {
  return await db('products').select('*');
};

const getProductById = async (
  product_id: number
): Promise<Product | undefined> => {
  return await db('products').where({ product_id }).first();
};

const getProductsByCategory = async (
  category_id: number
): Promise<Product[]> => {
  return await db('products').where({ category_id }).select('*');
};

const createProduct = async (input: ProductInput): Promise<Product> => {
  const [id] = await db('products').insert(input);
  return (await getProductById(id))!;
};

const updateProduct = async (
  product_id: number,
  input: ProductInput
): Promise<Product> => {
  await db('products').where({ product_id }).update(input);
  return (await getProductById(product_id))!;
};

const deleteProduct = async (product_id: number): Promise<boolean> => {
  const deleted = await db('products').where({ product_id }).del();
  return deleted > 0;
};

export default {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct,
};
