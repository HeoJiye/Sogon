export type Author = {
  userId: string;
  nickname: string;
  profileImage: string | null;
};

export type PostResponseDTO = {
  postId: string;
  author: Author;
  content: string;
  imageUrls: string[];
  likeCount: number;
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
};
