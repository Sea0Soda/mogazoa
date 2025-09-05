'use client';
import React from 'react';
import { ViewProps } from '@/types/Product';
import { ProductSection } from '../components/ProductSection';
import { ResultBox } from '../components/ResultBox';

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
