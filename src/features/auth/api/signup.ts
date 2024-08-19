import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';

import { auth } from '@/shared/lib/firebase';

import type { AuthDTO } from '../model';
import { errorHandler } from './errorHandler';
import { sessionLogin } from './tokenManager';

export async function signup({ email, password }: AuthDTO): Promise<boolean> {
  try {
    const { user } = await createUserWithEmailAndPassword(auth, email, password);
    await sessionLogin(user);
    sendEmailVerification(user);
    return true;
  } catch (error) {
    errorHandler(error);
    return false;
  }
}
