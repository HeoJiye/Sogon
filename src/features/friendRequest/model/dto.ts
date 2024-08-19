import { z } from 'zod';

import { UserSimpleDTO } from '@/entities/user/model';

import { FriendRequestStatus } from './schema';

export const sendFriendRequestSchema = z.object({
  message: z.string().max(200).optional(),
});

export type SendFriendRequestDTO = z.infer<typeof sendFriendRequestSchema>;

export type SendFriendResponseDTO = {
  requestId: string;
  senderId: string;
  receiverId: string;
  status: FriendRequestStatus;
  createdAt: Date;
};

export type FriendRequestResponseDTO = {
  requestId: string;
  sender: UserSimpleDTO;
  message: string;
  createdAt: Date;
};
