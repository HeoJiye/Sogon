import { z } from 'zod';

export type CreateProfileDTO = {
  nickname: string;
  profileImage: string;
  bio: string;
};

export const createProfileSchema = z.object({
  nickname: z.string().max(20),
  profileImage: z.string().url().optional(),
  bio: z.string().max(50).nullable(),
});

export type ViewProfileDTO = {
  userId: string;
  nickname: string;
  profileImage: string;
  bio: string;
  status: 'self' | 'friends' | 'pending' | 'none';
};

export const viewProfileSchema = z.object({
  userId: z.string(),
  nickname: z.string(),
  profileImage: z.string().url(),
  bio: z.string(),
  status: z.union([z.literal('self'), z.literal('friends'), z.literal('pending'), z.literal('none')]),
});
