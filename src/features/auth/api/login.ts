import { deleteCookie, setCookie } from 'cookies-next';
import {
  browserLocalPersistence,
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '@/shard/lib/firebase';

import type { AuthDTO } from '../model';
import { errorHandler } from './errorHandler';
import { sessionLogin } from './tokenManager';

type LoginOption = {
  rememberEmail?: boolean;
  keepLogin?: boolean;
};

export async function login({ email, password }: AuthDTO, option?: LoginOption): Promise<boolean> {
  try {
    if (option?.keepLogin) {
      await setPersistence(auth, browserLocalPersistence);
      setCookie('keepLogin', 'true');
    } else {
      await setPersistence(auth, browserSessionPersistence);
      deleteCookie('keepLogin');
    }

    const { user } = await signInWithEmailAndPassword(auth, email, password);
    await sessionLogin(user);

    if (option?.rememberEmail) {
      setCookie('email', email);
      setCookie('rememberEmail', 'true');
    } else {
      deleteCookie('email');
      deleteCookie('rememberEmail');
    }
    return true;
  } catch (error) {
    errorHandler(error);
    return false;
  }
}
