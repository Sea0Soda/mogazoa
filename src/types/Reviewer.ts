export interface Reviewer {
  id: number;
  nickname: string;
  image: string;
  description: string;
  teamId: string;
  reviewCount: number;
  followersCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewersProps {
  reviewers: Reviewer[];
}
