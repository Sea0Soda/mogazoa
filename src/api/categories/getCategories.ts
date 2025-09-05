import { apiClient } from '@/lib/apiClient';
import type { Category } from '@/types/Category';

export const getCategories = async (): Promise<Category[]> => {
  const response = await apiClient.get<Category[]>(`/categories`);
  return response.data;
};
