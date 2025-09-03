'use client';
import React, { useRef } from 'react';
import Image from 'next/image';

export const ImageUploader: React.FC<{
  productLetter: 'A' | 'B';
  imagePreview: string | null;
  onImageChange: (file: File) => void;
  onClearImage: () => void;
}> = ({ productLetter, imagePreview, onImageChange, onClearImage }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleBoxClick = () => fileInputRef.current?.click();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) onImageChange(file);
  };
  const handleClearClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onClearImage();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div
      className='relative w-40 h-40 bg-gray-700 rounded-2xl flex items-center justify-center cursor-pointer overflow-hidden'
      onClick={handleBoxClick}
    >
      <input
        type='file'
        accept='image/*'
        ref={fileInputRef}
        onChange={handleFileChange}
        className='hidden'
      />
      {imagePreview ? (
        <>
          <Image src={imagePreview} alt='상품 미리보기' fill style={{ objectFit: 'cover' }} />{' '}
          <button
            onClick={handleClearClick}
            className='absolute top-2 right-2 z-10 bg-black bg-opacity-50 text-white rounded-full w-6 h-6 flex items-center justify-center text-lg hover:bg-opacity-75'
          >
            &times;
          </button>
        </>
      ) : (
        <span className='text-8xl font-bold text-gray-500'>{productLetter}</span>
      )}
    </div>
  );
};
