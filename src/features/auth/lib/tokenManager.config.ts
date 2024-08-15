import { OptionsType } from 'cookies-next/lib/types';

export const TOKEN_COOKIE_NAME = 'idToken' as const;

export const TOKEN_COOKIE_OPTIONS: OptionsType = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  maxAge: 60 * 60,
  sameSite: 'strict',
} as const;
