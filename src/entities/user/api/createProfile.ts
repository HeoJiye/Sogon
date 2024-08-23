import axios from 'axios';

import alert from '@/shared/lib/alert';

import { ProfileFormSchema } from '../lib';
import { EditProfileRequestDTO } from '../model';

export function createProfile({ nickname, bio }: ProfileFormSchema) {
  try {
    axios.post(
      '/api/users',
      {
        profileImage: undefined,
        nickname,
        bio,
      } satisfies EditProfileRequestDTO,
      { withCredentials: true }
    );
    return true;
  } catch (error) {
    alert({ type: 'error', message: JSON.stringify(error) });
    return false;
  }
}
