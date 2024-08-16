export const FRIEND_RECORD = 'friends' as const;

export type Friend = {
  createdAt: Date;
};

export const FRIEND_REQUEST_RECORD = 'friendRequests' as const;

export type FriendRequest = {
  senderId: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
};
