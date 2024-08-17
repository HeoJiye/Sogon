import { z } from 'zod';

import { UserSimpleDTO } from '@/entities/user/model';

export type CommentResponseDTO = {
  commentId: string;
  author: UserSimpleDTO;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};

export const editCommentRequestSchema = z.object({
  content: z.string().min(1),
});

export type EditCommentRequestDTO = z.infer<typeof editCommentRequestSchema>;

export interface EditCommentResponseDTO {
  postId: string;
  commentId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
