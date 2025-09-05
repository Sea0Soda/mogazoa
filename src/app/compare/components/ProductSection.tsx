'use client';
import React from 'react';
import { ViewProps } from '@/types/Product';
import { ProductImagePreview } from './ProductImagePreview';
import { ProductSearchInput } from './ProductSeatchInput';
import { ProductResultCard } from './ProductResultCard';

export const ProductSection: React.FC<ViewProps & { productLetter: 'A' | 'B' }> = (props) => {
  const { productLetter, productA, productB, comparisonResult } = props;
  const product = productLetter === 'A' ? productA : productB;

  const WinnerBadge = () => (
    <div className='absolute top-[-10px] right-[-10px] bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg'>
      이게 좋아! ✨
    </div>
  );

  return (
    <div className='flex flex-col items-center gap-6'>
      <div className='relative'>
        <ProductImagePreview
          productLetter={productLetter}
          selectedProduct={product.selectedProduct}
        />
        {comparisonResult &&
          (comparisonResult.overallWinner === productLetter ||
            comparisonResult.overallWinner === 'draw') && <WinnerBadge />}
      </div>
      <ProductSearchInput
        selectedProduct={product.selectedProduct}
        onSelectProduct={(p) => props.handleProductSelect(productLetter, p)}
        placeholder='상품명을 입력해 주세요'
      />
      <ProductResultCard
        product={product.selectedProduct}
        label={`비교할 상품 ${productLetter}를 입력해 주세요`}
        comparisonResult={comparisonResult}
        productLetter={productLetter}
      />
    </div>
  );
};
