export const FRIEND_RECORD = 'friends' as const;

export type Friend = {
  createdAt: Date;
};

export const FRIEND_REQUEST_RECORD = 'friendRequests' as const;

export type FriendRequestStatus = 'pending' | 'accepted' | 'rejected';

export type FriendRequest = {
  senderId: string;
  message: string;
  status: FriendRequestStatus;
  createdAt: Date;
};
