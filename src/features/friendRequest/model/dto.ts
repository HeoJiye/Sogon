import { z } from 'zod';

import { FriendRequestStatus } from './schema';

export type SendFriendRequestDTO = {
  message?: string;
};

export const sendFriendRequestSchema = z.object({
  message: z.string().max(200).optional(),
});

export type SendFriendResponseDTO = {
  requestId: string;
  senderId: string;
  receiverId: string;
  status: FriendRequestStatus;
  createdAt: Date;
};
