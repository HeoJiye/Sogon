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
