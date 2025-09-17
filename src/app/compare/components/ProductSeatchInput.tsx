'use client';
import React, { useState, useEffect } from 'react';
import { Product } from '@/types/Product';
import { useGetProducts } from '@/api/categories/getProductList';

export const ProductSearchInput: React.FC<{
  selectedProduct: Product | null;
  onSelectProduct: (product: Product | null) => void;
  placeholder: string;
}> = ({ selectedProduct, onSelectProduct, placeholder }) => {
  const [query, setQuery] = useState(selectedProduct?.name || '');
  const [results, setResults] = useState<Product[]>([]);
  const [isActive, setIsActive] = useState(false);

  // 실제 API에서 상품 목록 가져오기
  const { data: productsData } = useGetProducts({ keyword: query.trim() || undefined });

  useEffect(() => {
    setQuery(selectedProduct?.name || '');
  }, [selectedProduct]);
  useEffect(() => {
    if (query.trim() === '' || (selectedProduct && query === selectedProduct.name)) {
      setResults([]);
      setIsActive(false);
      return;
    }

    // API에서 받은 데이터 사용
    if (productsData?.list) {
      setResults(productsData.list.slice(0, 10)); // 최대 10개만 표시
      setIsActive(true);
    } else {
      setResults([]);
      setIsActive(false);
    }
  }, [query, selectedProduct, productsData]);

  const handleSelect = (product: Product) => {
    onSelectProduct(product);
    setIsActive(false);
  };
  const handleClear = () => {
    onSelectProduct(null);
  };

  return (
    <div className='w-full relative'>
      <div
        className={`rounded-full p-0.5 bg-gray-800 ${!selectedProduct ? 'focus-within:bg-gradient-to-r focus-within:from-[#5097FA] focus-within:to-[#5363FF]' : ''}`}
      >
        <div className='relative'>
          <input
            type='text'
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`w-full py-3 px-6 text-center rounded-full bg-[#252530] text-white focus:outline-none ${selectedProduct ? 'font-semibold pr-10 bg-gray-700' : ''}`}
            readOnly={!!selectedProduct}
          />
          {selectedProduct && (
            <button
              onClick={handleClear}
              className='absolute right-4 top-1/2 -translate-y-1/2 z-10 text-xl text-gray-400 hover:text-white'
            >
              &times;
            </button>
          )}
        </div>
      </div>
      {isActive && results.length > 0 && (
        <ul className='absolute z-20 w-full mt-2 bg-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto'>
          {results.map((p) => (
            <li
              key={p.id}
              onClick={() => handleSelect(p)}
              className='p-3 hover:bg-gray-600 cursor-pointer text-white text-center'
            >
              {p.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
