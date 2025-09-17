import { useQuery, queryOptions } from '@tanstack/react-query';
import { apiClient } from '@/lib/apiClient';

export interface ProductDetailType {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  favoriteCount: number;
  categoryId: number;
  writerId: number;
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
  category: {
    id: number;
    name: string;
  };
  categoryMetric: {
    rating: number;
    favoriteCount: number;
    reviewCount: number;
  };
}

export const getProduct = async (productId: number): Promise<ProductDetailType> => {
  const response = await apiClient.get(`/products/${productId}`);
  return response.data;
};

export const productQueryOptions = (productId: number) =>
  queryOptions({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId),
    enabled: !!productId,
    staleTime: 10 * 60 * 1000, // 10분
    gcTime: 30 * 60 * 1000, // 30분
  });

export const useGetProduct = (productId: number) => {
  return useQuery(productQueryOptions(productId));
};
