import { deleteCookie, setCookie } from 'cookies-next';
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth';

import { auth } from '@/shard/lib/firebase';

import { sessionLogin, sessionLogout } from '../lib/tokenManager';
import { AuthDTO } from '../model/dto';

export async function signup({ email, password }: AuthDTO) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await sessionLogin(user);
  sendEmailVerification(user);
}

type LoginOption = {
  rememberEmail?: boolean;
  keepLogin?: boolean;
};

export async function login({ email, password }: AuthDTO, option?: LoginOption) {
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
}

export async function logout() {
  await sessionLogout();
}
