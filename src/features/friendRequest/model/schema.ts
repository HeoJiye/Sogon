export const FRIEND_REQUEST_RECORD = 'friendRequests' as const;

export type FriendRequestStatus = 'pending' | 'accepted' | 'rejected';

export type FriendRequest = {
  senderId: string;
  message: string;
  status: FriendRequestStatus;
  createdAt: Date;
};
