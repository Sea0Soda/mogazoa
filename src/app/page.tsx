'use client';

import ReviewerRanking from './home/ReviewerRanking';
import MobileCategorySheet from './home/MobileCategorySheet';
import ProductGrid from '@/components/common/ProductGrid';
import CategoryList from './home/CategoryList';
import { getCategories } from '@/api/categories/getCategories';
import { useEffect, useState } from 'react';
import { Category } from '@/types/Category';

const products = [
  {
    id: 1,
    name: '다이슨 슈퍼소닉 블루',
    image: '/images/reviewers/user1.jpg',
    reviewCount: 120,
    rating: 4.8,
    favoriteCount: 5,
  },
  {
    id: 2,
    name: 'Apple Watch 7',
    image: '/images/reviewers/user2.jpg',
    reviewCount: 98,
    rating: 4.6,
    favoriteCount: 213,
  },
  {
    id: 3,
    name: '헤라 블랙쿠션',
    image: '/images/reviewers/user3.jpg',
    reviewCount: 75,
    rating: 4.2,
    favoriteCount: 123,
  },
  {
    id: 4,
    name: '우스티드 울 폴로 셔츠',
    image: '/images/reviewers/user4.jpg',
    reviewCount: 150,
    rating: 4.9,
    favoriteCount: 234,
  },
  {
    id: 5,
    name: '돌화분',
    image: '/images/reviewers/user5.jpg',
    reviewCount: 60,
    rating: 4.4,
    favoriteCount: 6,
  },
  {
    id: 6,
    name: '아디다스 퍼피렛 코어 블랙',
    image: '/images/reviewers/user6.jpg',
    reviewCount: 124,
    rating: 4.2,
    favoriteCount: 7,
  },
];

const Home = () => {
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(`카테고리 불러오기 실패`, error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <main className='flex m-5'>
      {/* pc버전에서는 그냥 메뉴 */}
      <aside className='hidden md:flex flex-col p-2.5 md:pt-[45px] gap-1 w-45 lg:w-55'>
        <CategoryList
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
        />
      </aside>
      {/* 위에서 분부하신 메뉴창 */}
      <aside className='md:hidden'>
        <MobileCategorySheet
          categories={categories}
          selectedId={selectedCategoryId}
          onSelect={setSelectedCategoryId}
        />
      </aside>
      <section className=' flex flex-col lg:flex-row '>
        {/* 태블릿/모바일 버전: 가로 스크롤 */}
        <div className='grid grid-cols-2 lg:hidden overflow-x-auto space-x-4 mb-[60px]'>
          <ReviewerRanking />
        </div>
        <div className='flex flex-col justify-center flex-1'>
          <ProductGrid title='지금 핫한 상품' products={products} />
        </div>
        {/* PC 버전: grid */}
        <div className='hidden lg:flex flex-col'>
          <ReviewerRanking />
        </div>
      </section>
    </main>
  );
};

export default Home;
