import Image from 'next/image';
import rilakkuma from '@/components/common/리락쿠마.jpg';
import { Reviewer } from '@/types/Reviewer';

// 단일 리뷰어 카드
const ReviewerCard = ({ nickname, reviewCount, followersCount }: Reviewer) => {
  return (
    <div className='h-9 flex gap-2.5'>
      {/* 프로필 이미지 */}
      <div className='relative w-9 h-9 aspect-square'>
        <div className='absolute inset-0 bg-zinc-300 rounded-full' />
        <Image src={rilakkuma} alt={nickname} fill className='object-cover rounded-full' />
      </div>

      {/* 정보 영역 */}
      <div className='flex flex-col gap-[5px]'>
        <div className='flex gap-[5px] items-center'>
          <div className='px-1.5 py-0.5 bg-pink-500/10 rounded-[50px] overflow-hidden'>
            <div className='text-center text-pink-500 text-[10px] font-normal'>1등</div>
          </div>
          <div className='text-[#F1F1F5] text-sm font-normal'>{nickname}</div>
        </div>

        <div className='flex flex-row gap-2.5'>
          <div className='flex gap-[5px]'>
            <div className='text-[#6E6E82] text-[10px] font-light'>팔로워</div>
            <div className='text-[#6E6E82] text-[10px] font-light'>{followersCount}</div>
          </div>
          <div className='flex gap-[5px]'>
            <div className='text-[#6E6E82] text-[10px] font-light'>리뷰</div>
            <div className='text-[#6E6E82] text-[10px] font-light'>{reviewCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewerCard;
