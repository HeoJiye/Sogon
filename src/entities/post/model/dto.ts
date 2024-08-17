import { z } from 'zod';

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

export type EditPostRequestDTO = {
  content: string;
  imageUrls: string[];
};

export const editPostRequestSchema = z.object({
  content: z.string(),
  imageUrls: z.array(z.string().url()),
});

export type EditPostResponseDTO = {
  postId: string;
  content: string;
  imageUrls: string[];
  createdAt: Date;
  updatedAt: Date;
};
