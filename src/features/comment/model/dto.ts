import { UserSimpleDTO } from '@/entities/user/model';

export type CommentResponseDTO = {
  commentId: string;
  author: UserSimpleDTO;
  content: string;
  createdAt: Date;
  updatedAt: Date;
};
