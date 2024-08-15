import { z } from 'zod';

export type CreateProfileDTO = {
  nickname: string;
  profileImage: string;
  bio: string;
};

export const CreateProfileSchema = z.object({
  nickname: z.string().max(20),
  profileImage: z.string().url().optional(),
  bio: z.string().max(50).nullable(),
});
