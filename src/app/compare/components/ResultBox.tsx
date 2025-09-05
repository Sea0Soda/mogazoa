import React from 'react';

export const ResultBox: React.FC<{ icon: string; text: string }> = ({ icon, text }) => (
  <div className='flex items-center gap-3 text-gray-300'>
    <span className='text-2xl'>{icon}</span>
    <span className='font-medium'>{text}</span>
  </div>
);
