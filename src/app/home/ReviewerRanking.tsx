// import { useGetUserRanking } from '@/api/users/getUserRanking';
// import ReviewerCard from './ReviewerCard';

// // 랭킹 전체 리스트
// const ReviewerRanking = () => {
//   const { data: reviewers, isLoading, error } = useGetUserRanking();

//   if (isLoading) return <div>로딩중</div>;
//   if (error) return <div>데이터를 불러오지 못했습니다.</div>;

//   return (
//     <div className='flex lg:flex-col gap-4'>
//       {reviewers?.map((reviewer) => (
//         <ReviewerCard key={reviewer.id} {...reviewer} />
//       ))}
//     </div>
//   );
// };

// export default ReviewerRanking;
import { useEffect, useState } from 'react';
import ReviewerCard from './ReviewerCard';
import { UserRanking } from '@/types/UserRanking';
import { apiClient } from '@/lib/apiClient';

const ReviewerRanking = () => {
  const [reviewers, setReviewers] = useState<UserRanking[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .get('/users/ranking')
      .then((res) => setReviewers(res.data))
      .catch(() => setError('유저 랭킹을 불러올 수 없습니다.'));
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div className='flex flex-col gap-4 lg:justify-center'>
      <h2 className='text-[#F1F1F5] text-sm lg:text-base lg:font-normal shrink-0'>리뷰어 랭킹</h2>
      <div className='flex lg:flex-col gap-[20px] lg:gap-[30px]'>
        {reviewers.slice(0, 5).map((reviewer, index) => (
          <ReviewerCard key={reviewer.id} rank={index + 1} {...reviewer} />
        ))}
      </div>
    </div>
  );
};

export default ReviewerRanking;
