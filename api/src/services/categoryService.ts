import db from '../config/database';
import { Category, CategoryInput } from '../types';

const getAllCategories = async (): Promise<Category[]> => {
  return await db('categories').select('*');
};

const getCategoryById = async (
  category_id: number
): Promise<Category | undefined> => {
  return await db('categories').where({ category_id }).first();
};

const createCategory = async (input: CategoryInput): Promise<Category> => {
  const [id] = await db('categories').insert(input);
  return (await getCategoryById(id))!;
};

const updateCategory = async (
  category_id: number,
  input: CategoryInput
): Promise<Category> => {
  await db('categories').where({ category_id }).update(input);
  return (await getCategoryById(category_id))!;
};

const deleteCategory = async (category_id: number): Promise<boolean> => {
  const deleted = await db('categories').where({ category_id }).del();
  return deleted > 0;
};

export default {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
