import ReviewerCard from './ReviewerCard';
import { ReviewersProps } from '@/types/Reviewer';

// 랭킹 전체 리스트
const ReviewerRanking = ({ reviewers }: ReviewersProps) => {
  return (
    <div className='flex lg:flex-col gap-4'>
      {reviewers.map((reviewer) => (
        <ReviewerCard key={reviewer.id} {...reviewer} />
      ))}
    </div>
  );
};

export default ReviewerRanking;
