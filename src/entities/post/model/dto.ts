import { z } from 'zod';

import { UserSimpleDTO } from '@/entities/user/model';

export type PostResponseDTO = {
  postId: string;
  author: UserSimpleDTO;
  content: string;
  imageUrls: string[];
  likeCount: number;
  commentCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export const editPostRequestSchema = z.object({
  content: z.string(),
  imageUrls: z.array(z.string().url()),
});

export type EditPostRequestDTO = z.infer<typeof editPostRequestSchema>;

export type EditPostResponseDTO = {
  postId: string;
  content: string;
  imageUrls: string[];
  createdAt: Date;
  updatedAt: Date;
};

export type PostDetailsResponseDTO = {
  postId: string;
  author: UserSimpleDTO;
  content: string;
  imageUrls: string[];
  likes: UserSimpleDTO[];
  createdAt: Date;
  updatedAt: Date;
};

export type CommentResponseDTO = {
  commentId: string;
  author: {
    userId: string;
    nickname: string;
    profileImage: string;
  };
  content: string;
  createdAt: Date;
  updatedAt: Date;
};
