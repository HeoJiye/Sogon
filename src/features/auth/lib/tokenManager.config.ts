import { OptionsType } from 'cookies-next/lib/types';

export const TOKEN_COOKIE_NAME = 'token' as const;

export const TOKEN_COOKIE_OPTIONS: OptionsType = {
  httpOnly: process.env.NODE_ENV === 'production',
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60,
  sameSite: 'strict',
} as const;
