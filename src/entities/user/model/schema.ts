export const USER_RECORD = 'users' as const;

export type User = {
  nickname: string;
  profileImage: string | null;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
};
