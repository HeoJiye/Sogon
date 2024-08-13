export type FriendRequest = {
  senderId: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
};
