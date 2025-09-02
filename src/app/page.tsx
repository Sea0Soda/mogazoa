'use client';

import ReviewerRanking from './home/ReviewerRanking';
import MobileCategorySheet from './home/MobileCategorySheet';
import ProductGrid from '@/components/common/ProductGrid';
import CategoryList from './home/CategoryList';
import { useState } from 'react';

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

const categories = [
  {
    id: 1,
    name: '음악',
    createdAt: '2024-01-29T09:08:53.506Z',
    updatedAt: '2024-01-29T09:08:53.506Z',
  },
  {
    id: 2,
    name: '영화/드라마',
    createdAt: '2024-01-29T09:08:53.506Z',
    updatedAt: '2024-01-29T09:08:53.506Z',
  },
  {
    id: 3,
    name: '강의/책',
    createdAt: '2024-01-29T09:08:53.506Z',
    updatedAt: '2024-01-29T09:08:53.506Z',
  },
  {
    id: 4,
    name: '호텔',
    createdAt: '2024-01-29T09:08:53.506Z',
    updatedAt: '2024-01-29T09:08:53.506Z',
  },
  {
    id: 5,
    name: '가구/인테리어',
    createdAt: '2024-01-29T09:08:53.506Z',
    updatedAt: '2024-01-29T09:08:53.506Z',
  },
  {
    id: 6,
    name: '식당',
    createdAt: '2024-01-29T09:08:53.506Z',
    updatedAt: '2024-01-29T09:08:53.506Z',
  },
  {
    id: 7,
    name: '전자기기',
    createdAt: '2024-01-29T09:08:53.506Z',
    updatedAt: '2024-01-29T09:08:53.506Z',
  },
  {
    id: 8,
    name: '화장품',
    createdAt: '2024-01-29T09:08:53.506Z',
    updatedAt: '2024-01-29T09:08:53.506Z',
  },
  {
    id: 9,
    name: '의류/잡화',
    createdAt: '2024-01-29T09:08:53.506Z',
    updatedAt: '2024-01-29T09:08:53.506Z',
  },
  {
    id: 10,
    name: '앱',
    createdAt: '2024-01-29T09:08:53.506Z',
    updatedAt: '2024-01-29T09:08:53.506Z',
  },
];

const reviewers = [
  {
    id: 1,
    nickname: '루나',
    image: '/images/reviewers/user1.jpg',
    description: '패션과 뷰티 리뷰 전문',
    teamId: 'teamA',
    reviewCount: 120,
    followersCount: 500,
    createdAt: '2025-09-01T05:48:07.519Z',
    updatedAt: '2025-09-01T05:48:07.519Z',
  },
  {
    id: 2,
    nickname: '민수',
    image: '/images/reviewers/user2.jpg',
    description: '전자기기 리뷰 마스터',
    teamId: 'teamB',
    reviewCount: 98,
    followersCount: 430,
    createdAt: '2025-09-01T05:48:07.519Z',
    updatedAt: '2025-09-01T05:48:07.519Z',
  },
  {
    id: 3,
    nickname: '하린',
    image: '/images/reviewers/user3.jpg',
    description: '책과 강의 리뷰 전문',
    teamId: 'teamC',
    reviewCount: 75,
    followersCount: 250,
    createdAt: '2025-09-01T05:48:07.519Z',
    updatedAt: '2025-09-01T05:48:07.519Z',
  },
  {
    id: 4,
    nickname: '준호',
    image: '/images/reviewers/user4.jpg',
    description: '여행과 호텔 리뷰 전문',
    teamId: 'teamD',
    reviewCount: 150,
    followersCount: 620,
    createdAt: '2025-09-01T05:48:07.519Z',
    updatedAt: '2025-09-01T05:48:07.519Z',
  },
  {
    id: 5,
    nickname: '서연',
    image: '/images/reviewers/user5.jpg',
    description: '가구/인테리어 리뷰 전문가',
    teamId: 'teamE',
    reviewCount: 60,
    followersCount: 180,
    createdAt: '2025-09-01T05:48:07.519Z',
    updatedAt: '2025-09-01T05:48:07.519Z',
  },
  {
    id: 6,
    nickname: '태현',
    image: '/images/reviewers/user6.jpg',
    description: '레스토랑과 음식 리뷰 전문',
    teamId: 'teamF',
    reviewCount: 124,
    followersCount: 350,
    createdAt: '2025-09-01T05:48:07.519Z',
    updatedAt: '2025-09-01T05:48:07.519Z',
  },
];

const Home = () => {
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

  return (
    <main className='flex m-5'>
      {/* pc버전에서는 그냥 메뉴 */}
      <aside className='hidden md:flex flex-col p-2.5 md:pt-[45px] gap-1 w-45 lg:w-55'>
        <div className='px-5 py-[15px] text-[#F1F1F5] md:text-sm lg:text-base'>카테고리</div>
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
        <div className='grid grid-cols-2 lg:hidden overflow-x-auto space-x-4 scrollbar-hide'>
          <ReviewerRanking reviewers={reviewers} />
        </div>
        <div className='flex flex-col justify-center flex-1'>
          <ProductGrid title='지금 핫한 상품' products={products} />
        </div>
        {/* PC 버전: grid */}/
        <div className='hidden lg:grid grid-cols-1 gap-4 '>
          <ReviewerRanking reviewers={reviewers} />
        </div>
      </section>
    </main>
  );
};

export default Home;
