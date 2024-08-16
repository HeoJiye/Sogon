import { z } from 'zod';

export type EditProfileRequestDTO = {
  nickname: string;
  profileImage: string;
  bio: string;
};

export const editProfileRequestSchema = z.object({
  nickname: z.string().max(20),
  profileImage: z.string().url().optional(),
  bio: z.string().max(50).nullable(),
});

export type EditProfileResponseDTO = {
  userId: string;
  nickname: string;
  profileImage: string | null;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
};

export const editProfileResponseSchema = z.object({
  userId: z.string(),
  nickname: z.string(),
  profileImage: z.string().url(),
  bio: z.string(),
});

export type UserReleationStatus = 'self' | 'friends' | 'pending' | 'none';

export type ProfileResponseDTO = {
  userId: string;
  nickname: string;
  profileImage: string | null;
  bio: string;
  status: UserReleationStatus;
};

export const profileResponseSchema = z.object({
  userId: z.string(),
  nickname: z.string(),
  profileImage: z.string().url().nullable(),
  bio: z.string(),
  status: z.union([z.literal('self'), z.literal('friends'), z.literal('pending'), z.literal('none')]),
});
