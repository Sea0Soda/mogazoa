'use client';
import React from 'react';
import { ProductSearchInput } from '../components/ProductSeatchInput';
import { ViewProps } from '@/types/Product';

export const MobileView: React.FC<ViewProps> = ({ productA, productB, handleProductSelect }) => {
  return (
    <div className='md:hidden'>
      <div className='flex items-center justify-center gap-12 my-8'>
        <div className='w-28 h-28 bg-gray-700 rounded-2xl flex items-center justify-center'>
          <span className='text-5xl font-bold text-gray-500'>A</span>
        </div>
        <span className='text-2xl font-semibold text-gray-500'>VS</span>
        <div className='w-28 h-28 bg-gray-700 rounded-2xl flex items-center justify-center'>
          <span className='text-5xl font-bold text-gray-500'>B</span>
        </div>
      </div>
      <div className='px-2 space-y-6'>
        <div>
          <label className='block mb-2 font-semibold text-gray-200'>상품 1</label>
          <ProductSearchInput
            selectedProduct={productA.selectedProduct}
            onSelectProduct={(p) => handleProductSelect('A', p)}
            placeholder='상품명을 입력해주세요'
          />
        </div>
        <div>
          <label className='block mb-2 font-semibold text-gray-200'>상품 2</label>
          <ProductSearchInput
            selectedProduct={productB.selectedProduct}
            onSelectProduct={(p) => handleProductSelect('B', p)}
            placeholder='상품명을 입력해주세요'
          />
        </div>
      </div>
    </div>
  );
};
