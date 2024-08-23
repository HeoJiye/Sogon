import { UseQueryResult, useQuery } from '@tanstack/react-query';

import axiosClient from '@/shared/lib/axiosClient';

import { ProfileResponseDTO } from '../model';

export function getProfile(uid: string): Promise<ProfileResponseDTO> {
  return axiosClient.get<ProfileResponseDTO>(`/api/users/${uid}`).then((res) => res.data);
}

export function useGetProfileQuery(uid: string): UseQueryResult<ProfileResponseDTO> {
  return useQuery<ProfileResponseDTO>({
    queryKey: ['profile', uid],
    queryFn: () => getProfile(uid),
  });
}
