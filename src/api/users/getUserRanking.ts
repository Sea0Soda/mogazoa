// import { useQuery, queryOptions } from '@tanstack/react-query';
// import { apiClient } from '@/lib/apiClient';
// import { UserRanking } from '@/types/UserRanking';
// export const getUserRanking = async (): Promise<UserRanking[]> => {
//   try {
//     const response = await apiClient.get('/users/ranking');
//     return response.data;
//   } catch (error) {
//     throw new Error('유저 랭킹을 불러올 수 없습니다.');
//   }
// };
// export const userRankingQueryOptions = queryOptions({
//   queryKey: ['userRanking'],
//   queryFn: getUserRanking,
//   staleTime: 10 * 60 * 1000,
// });
// export const useGetUserRanking = () => useQuery(userRankingQueryOptions);
