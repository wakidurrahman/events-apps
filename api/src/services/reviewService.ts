import db from '../config/database';
import { Review, ReviewInput } from '../types';

const getAllReviews = async (): Promise<Review[]> => {
  return await db('reviews').select('*');
};

const getReviewById = async (
  review_id: number
): Promise<Review | undefined> => {
  return await db('reviews').where({ review_id }).first();
};

const getReviewsByProduct = async (product_id: number): Promise<Review[]> => {
  return await db('reviews').where({ product_id }).select('*');
};

const getReviewsByCustomer = async (
  customer_id: number
): Promise<Review[]> => {
  return await db('reviews').where({ customer_id }).select('*');
};

const createReview = async (input: ReviewInput): Promise<Review> => {
  const [id] = await db('reviews').insert(input);
  return (await getReviewById(id))!;
};

const updateReview = async (
  review_id: number,
  input: ReviewInput
): Promise<Review> => {
  await db('reviews').where({ review_id }).update(input);
  return (await getReviewById(review_id))!;
};

const deleteReview = async (review_id: number): Promise<boolean> => {
  const deleted = await db('reviews').where({ review_id }).del();
  return deleted > 0;
};

export default {
  getAllReviews,
  getReviewById,
  getReviewsByProduct,
  getReviewsByCustomer,
  createReview,
  updateReview,
  deleteReview,
};
