import { deleteCookie, setCookie } from 'cookies-next';
import { NextOrObserver, User, onIdTokenChanged } from 'firebase/auth';

import { auth } from '@/shard/lib/firebase';

import { TOKEN_COOKIE_NAME, TOKEN_COOKIE_OPTIONS } from './tokenManager.config';

let unsubscribeTokenChangedListener: (() => void) | undefined;

const saveIdToken = async (user: User | null) =>
  user && setCookie(TOKEN_COOKIE_NAME, await user.getIdToken(), TOKEN_COOKIE_OPTIONS);

export async function sessionLogin(user: User) {
  await saveIdToken(user);

  unsubscribeTokenChangedListener?.();
  unsubscribeTokenChangedListener = onIdTokenChanged(auth, saveIdToken as NextOrObserver<User>);
}

export async function sessionLogout() {
  await auth.signOut();

  unsubscribeTokenChangedListener?.();
  deleteCookie(TOKEN_COOKIE_NAME);
}
