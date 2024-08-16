export type FriendResponseDTO = {
  userId: string;
  nickname: string;
  profileImage: string | null;
};

export type AddFriendResponseDTO = {
  userId: string;
  friendId: string;
  createdAt: Date;
};
