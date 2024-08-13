import { FriendRequest } from '@/features/friend/model/schema';

export type User = {
  nickname?: string;
  profileImage?: string;
  bio?: string;
  FriendRequests: FriendRequest[];
  createdAt: Date;
  updatedAt: Date;
};

export function generateInitialUser(): User {
  return {
    nickname: '',
    profileImage: '',
    bio: '',
    FriendRequests: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
