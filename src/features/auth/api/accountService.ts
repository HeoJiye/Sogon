import { UserRecord } from 'firebase-admin/auth';

import { generateInitialUser } from '@/entities/user/model/schema';
import { auth, db } from '@/shard/lib/firebaseAdmin';

import { AuthDTO } from '../model/dto';
import { handleCreateAccountError } from './accountService.handleError';

export async function createAccount({ email, password }: AuthDTO): Promise<UserRecord> {
  try {
    const userRecord = await auth.createUser({ email, password });
    await db.collection('users').doc(userRecord.uid).set(generateInitialUser());

    return userRecord;
  } catch (error) {
    throw handleCreateAccountError(error);
  }
}

export function deleteAccount() {}
