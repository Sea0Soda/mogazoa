'use client';
import React from 'react';
import { ViewProps } from '@/types/Product';
import { ImageUploader } from '../components/ImageUploader';
import { ProductSearchInput } from '../components/ProductSeatchInput';
import { ProductResultCard } from '../components/ProductResultCard';
import { ResultBox } from '../components/ResultBox';

const ProductSection: React.FC<ViewProps & { productLetter: 'A' | 'B' }> = (props) => {
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
        <ImageUploader
          productLetter={productLetter}
          imagePreview={product.imagePreview}
          onImageChange={(file) => props.handleImageChange(productLetter, file)}
          onClearImage={() => props.handleClearImage(productLetter)}
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

export const TabletAndDesktopView: React.FC<ViewProps> = (props) => {
  return (
    <div className='hidden md:block'>
      <div className='grid grid-cols-[1fr_auto_1fr] items-start gap-x-12'>
        <ProductSection {...props} productLetter='A' />

        <div className='flex flex-col justify-between items-center h-full pt-16'>
          <span className='text-5xl font-semibold text-gray-500'>VS</span>
          {props.comparisonResult && (
            <div className='h-56 flex flex-col items-center justify-center gap-4'>
              <ResultBox icon='⭐' text='별점' />
              <ResultBox icon='✍️' text='리뷰 개수' />
              <ResultBox icon='❤' text='찜 개수' />
            </div>
          )}
        </div>

        <ProductSection {...props} productLetter='B' />
      </div>
    </div>
  );
};
