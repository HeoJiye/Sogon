import { z } from 'zod';

export type AuthDTO = {
  email: string;
  password: string;
};

export const authDTOVaildation = z.object({
  email: z.string(),
  password: z.string(),
});
