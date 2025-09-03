export interface Product {
  id?: number;
  name: string;
  description?: string;
  image: string;
  rating?: number;
  reviewCount?: number;
  favoriteCount?: number;
}

export interface ProductGridProps {
  title: string;
  products: Product[];
}

// 비교 페이지에서 각 상품(A, B)의 상태를 관리하기 위한 타입
export interface ProductState {
  imagePreview: string | null;
  selectedProduct: Product | null;
}

// 비교 결과를 저장하기 위한 타입
export interface ComparisonResult {
  rating: { winner: 'A' | 'B' | 'draw'; diff: number };
  reviews: { winner: 'A' | 'B' | 'draw'; diff: number };
  likes: { winner: 'A' | 'B' | 'draw'; diff: number };
  overallWinner: 'A' | 'B' | 'draw';
}

// 뷰 컴포넌트(Mobile, Tablet 등)들이 공통으로 받을 Props 타입
export interface ViewProps {
  productA: ProductState;
  productB: ProductState;
  comparisonResult: ComparisonResult | null;
  handleImageChange: (productLetter: 'A' | 'B', file: File) => void;
  handleClearImage: (productLetter: 'A' | 'B') => void;
  handleProductSelect: (productLetter: 'A' | 'B', product: Product | null) => void;
}
