'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getUserProfile, UserDetail, followUser, unfollowUser } from '@/lib/user/userApi';
import {
  getUserReviewedProducts,
  getUserCreatedProducts,
  getUserFavoriteProducts,
  ProductListItem,
} from '@/lib/user/userProductsApi';
import Image from 'next/image';
import ProductCard from '@/components/common/ProductCard';
import { useAuthStore } from '@/lib/stores/authStore';

export default function UserProfilePage() {
  const params = useParams();
  const userId = params.userId as string;
  const { user } = useAuthStore();
  const [profile, setProfile] = useState<UserDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [followLoading, setFollowLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; show: boolean }>({
    message: '',
    show: false,
  });

  // 탭 상태
  const [activeTab, setActiveTab] = useState<'reviewed' | 'created' | 'favorite'>('reviewed');
  const [products, setProducts] = useState<ProductListItem[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getUserProfile(userId);
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  // 상품 목록 fetch 함수
  const fetchProducts = async (tab: 'reviewed' | 'created' | 'favorite') => {
    if (!userId) return;

    try {
      setProductsLoading(true);
      setProductsError(null);
      let data;

      switch (tab) {
        case 'reviewed':
          data = await getUserReviewedProducts(parseInt(userId));
          break;
        case 'created':
          data = await getUserCreatedProducts(parseInt(userId));
          break;
        case 'favorite':
          data = await getUserFavoriteProducts(parseInt(userId));
          break;
      }

      setProducts(data.list);
    } catch (err) {
      setProductsError(err instanceof Error ? err.message : 'Failed to load products');
    } finally {
      setProductsLoading(false);
    }
  };

  // 탭 변경 시 상품 목록 다시 로드
  useEffect(() => {
    if (profile) {
      fetchProducts(activeTab);
    }
  }, [activeTab, profile]);

  const handleTabChange = (tab: 'reviewed' | 'created' | 'favorite') => {
    setActiveTab(tab);
  };

  const showToast = (message: string) => {
    setToast({ message, show: true });
    setTimeout(() => {
      setToast({ message: '', show: false });
    }, 1500);
  };

  const handleFollow = async () => {
    if (!profile || followLoading) return;

    // 자기 자신을 팔로우하려고 할 때
    if (user && user.id === userId) {
      showToast('본인을 팔로우할 수 없습니다.');
      return;
    }

    try {
      setFollowLoading(true);
      if (profile.isFollowing) {
        await unfollowUser(profile.id);
        setProfile((prev) =>
          prev ? { ...prev, followersCount: prev.followersCount - 1, isFollowing: false } : null,
        );
      } else {
        await followUser(profile.id);
        setProfile((prev) =>
          prev ? { ...prev, followersCount: prev.followersCount + 1, isFollowing: true } : null,
        );
      }
    } catch (err) {
      console.error('Failed to toggle follow:', err);
    } finally {
      setFollowLoading(false);
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-[#0B0B0B] flex items-center justify-center'>
        <div className='text-[#F1F1F5]'>로딩 중...</div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className='min-h-screen bg-[#0B0B0B] flex items-center justify-center'>
        <div className='text-red-500'>{error || '프로필을 찾을 수 없습니다.'}</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-[#1C1C22] text-[#F1F1F5]'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <div className='flex flex-col lg:flex-row gap-8'>
          {/* 좌측 프로필 섹션 */}
          <div className='w-full lg:w-[340px] flex-shrink-0'>
            <div className='bg-[#21212A] rounded-xl p-6 min-h-[500px] flex flex-col'>
              {/* 프로필 이미지 */}
              <div className='flex justify-center mb-8'>
                <div className='w-[200px] h-[200px] rounded-full overflow-hidden bg-[#35353F]'>
                  {profile.image ? (
                    <Image
                      src={profile.image}
                      alt={profile.nickname}
                      width={200}
                      height={200}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <div className='w-full h-full flex items-center justify-center text-3xl'>
                      👤
                    </div>
                  )}
                </div>
              </div>

              {/* 닉네임과 설명 */}
              <div className='text-center mb-6 flex-grow'>
                <h1 className='text-2xl font-bold mb-2'>{profile.nickname}</h1>
                {profile.description && (
                  <p className='text-[#6E6E82] text-base leading-relaxed'>{profile.description}</p>
                )}
              </div>

              {/* 팔로워/팔로잉 */}
              <div className='flex justify-center gap-12 mb-6 text-sm mt-auto'>
                <div className='text-center'>
                  <div className='font-bold text-lg'>{profile.followersCount}</div>
                  <div className='text-[#9FA0A7]'>팔로워</div>
                </div>
                <div className='w-px h-12 bg-[#35353F] self-center'></div>
                <div className='text-center'>
                  <div className='font-bold text-lg'>{profile.followeesCount}</div>
                  <div className='text-[#9FA0A7]'>팔로잉</div>
                </div>
              </div>

              {/* 팔로우 버튼 */}
              <button
                onClick={handleFollow}
                disabled={followLoading}
                className={`w-full py-4 rounded-lg font-medium transition-colors ${
                  profile.isFollowing
                    ? 'bg-[#35353F] text-[#F1F1F5] hover:bg-[#43434F]'
                    : 'bg-[#5097FA] text-white hover:bg-[#4285E8]'
                } disabled:opacity-50`}
              >
                {followLoading ? '로딩...' : profile.isFollowing ? '언팔로우' : '팔로우'}
              </button>
            </div>
          </div>

          {/* 우측 활동 내역 섹션 */}
          <div className='flex-1'>
            {/* 활동 내역 헤더 */}
            <div className='mb-6'>
              <h2 className='text-xl font-bold mb-4'>활동 내역</h2>

              {/* 통계 카드들 */}
              <div className='flex flex-col md:flex-row gap-4 mb-6'>
                <div className='bg-[#21212A] rounded-xl p-4 text-center w-full md:w-[300px] h-[128px] flex flex-col justify-center'>
                  <div className='text-[#9FA0A7] text-sm mb-2'>남긴 별점 평균</div>
                  <div className='text-2xl font-bold text-[#FFD700]'>
                    ⭐ {profile.averageRating}
                  </div>
                </div>
                <div className='bg-[#21212A] rounded-xl p-4 text-center w-full md:w-[300px] h-[128px] flex flex-col justify-center'>
                  <div className='text-[#9FA0A7] text-sm mb-2'>남긴 리뷰</div>
                  <div className='text-2xl font-bold text-[#5097FA]'>📝 {profile.reviewCount}</div>
                </div>
                <div className='bg-[#21212A] rounded-xl p-4 text-center w-full md:w-[300px] h-[128px] flex flex-col justify-center'>
                  <div className='text-[#9FA0A7] text-sm mb-2'>관심 카테고리</div>
                  <div className='text-lg font-medium text-[#00D2A3]'>
                    {profile.mostFavoriteCategory ? profile.mostFavoriteCategory.name : '없음'}
                  </div>
                </div>
              </div>
            </div>

            {/* 상품 목록 탭 */}
            <div className='mb-6'>
              <nav className='flex space-x-8'>
                <button
                  onClick={() => handleTabChange('reviewed')}
                  className={`py-2 px-1 text-xl whitespace-nowrap ${
                    activeTab === 'reviewed'
                      ? 'font-semibold text-[#F1F1F5]'
                      : 'font-normal text-[#6E6E82] hover:text-[#F1F1F5]'
                  }`}
                >
                  리뷰 남긴 상품
                </button>
                <button
                  onClick={() => handleTabChange('created')}
                  className={`py-2 px-1 text-xl whitespace-nowrap ${
                    activeTab === 'created'
                      ? 'font-semibold text-[#F1F1F5]'
                      : 'font-normal text-[#6E6E82] hover:text-[#F1F1F5]'
                  }`}
                >
                  등록한 상품
                </button>
                <button
                  onClick={() => handleTabChange('favorite')}
                  className={`py-2 px-1 text-xl whitespace-nowrap ${
                    activeTab === 'favorite'
                      ? 'font-semibold text-[#F1F1F5]'
                      : 'font-normal text-[#6E6E82] hover:text-[#F1F1F5]'
                  }`}
                >
                  찜한 상품
                </button>
              </nav>
            </div>

            {/* 상품 목록 내용 */}
            <div>
              {productsLoading && <div className='text-center text-[#9FA0A7] py-12'> </div>}

              {productsError && (
                <div className='text-center text-red-500 py-12'>{productsError}</div>
              )}

              {!productsLoading && !productsError && products.length === 0 && (
                <div className='text-center text-[#9FA0A7] py-12'>
                  {activeTab === 'reviewed' && '리뷰를 남긴 상품이 없습니다.'}
                  {activeTab === 'created' && '등록한 상품이 없습니다.'}
                  {activeTab === 'favorite' && '찜한 상품이 없습니다.'}
                </div>
              )}

              {!productsLoading && !productsError && products.length > 0 && (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {products.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={{
                        id: product.id,
                        name: product.name,
                        image: product.image,
                        rating: product.rating,
                        reviewCount: product.reviewCount,
                        favoriteCount: product.favoriteCount,
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Toast 알림 */}
      {toast.show && (
        <div className='fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#21212A] text-[#F1F1F5] px-6 py-3 rounded-lg shadow-lg border border-[#35353F] z-50 animate-fade-in'>
          {toast.message}
        </div>
      )}
    </div>
  );
}
