import { getAuthToken } from '../authApi';

const API_BASE_URL = 'https://mogazoa-api.vercel.app';
const TEAM_ID = '16-5';

export interface ProductListItem {
  id: number;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  favoriteCount: number;
  categoryId: number;
  writerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductListResponse {
  nextCursor: number | null;
  list: ProductListItem[];
}

export interface GetUserProductsParams {
  cursor?: number;
}

// 사용자가 리뷰 남긴 상품 목록
export const getUserReviewedProducts = async (
  userId: number,
  params?: GetUserProductsParams,
): Promise<ProductListResponse> => {
  const url = new URL(`${API_BASE_URL}/${TEAM_ID}/users/${userId}/reviewed-products`);
  if (params?.cursor) {
    url.searchParams.append('cursor', params.cursor.toString());
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch reviewed products');
  }

  return response.json();
};

// 사용자가 등록한 상품 목록
export const getUserCreatedProducts = async (
  userId: number,
  params?: GetUserProductsParams,
): Promise<ProductListResponse> => {
  const url = new URL(`${API_BASE_URL}/${TEAM_ID}/users/${userId}/created-products`);
  if (params?.cursor) {
    url.searchParams.append('cursor', params.cursor.toString());
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch created products');
  }

  return response.json();
};

// 사용자가 찜한 상품 목록
export const getUserFavoriteProducts = async (
  userId: number,
  params?: GetUserProductsParams,
): Promise<ProductListResponse> => {
  const url = new URL(`${API_BASE_URL}/${TEAM_ID}/users/${userId}/favorite-products`);
  if (params?.cursor) {
    url.searchParams.append('cursor', params.cursor.toString());
  }

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch favorite products');
  }

  return response.json();
};
