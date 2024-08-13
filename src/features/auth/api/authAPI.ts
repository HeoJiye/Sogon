import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '@/shard/lib/firebase';

import { sessionLogin, sessionLogout } from '../lib/tokenManager';
import { AuthDTO } from '../model/dto';

export async function login({ email, password }: AuthDTO) {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  await sessionLogin(user);
}

export async function logout() {
  await sessionLogout();
}

export async function signup({ email, password }: AuthDTO) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await sessionLogin(user);
}
