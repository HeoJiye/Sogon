import { z } from 'zod';

export const editProfileRequestSchema = z.object({
  nickname: z.string().max(20),
  profileImage: z.string().url().optional(),
  bio: z.string().max(50),
});

export type EditProfileRequestDTO = z.infer<typeof editProfileRequestSchema>;

export type EditProfileResponseDTO = {
  userId: string;
  nickname: string;
  profileImage: string | null;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserReleationStatus = 'self' | 'friends' | 'pending' | 'none';

export type ProfileResponseDTO = {
  userId: string;
  nickname: string;
  profileImage: string | null;
  bio: string;
  status: UserReleationStatus;
};

export type UserSimpleDTO = {
  userId: string;
  nickname: string;
  profileImage: string | null;
};
