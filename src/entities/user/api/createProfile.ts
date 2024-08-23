import alert from '@/shared/lib/alert';
import axiosClient from '@/shared/lib/axiosClient';
import { uploadImageFile } from '@/shared/lib/firebase.storage';

import { ProfileFormSchema } from '../lib';
import { EditProfileRequestDTO } from '../model';

export async function createProfile({ profileImage, nickname, bio }: ProfileFormSchema) {
  let profileURL;

  if (profileImage.length > 0) {
    const profileFile = profileImage[0];
    const profilePath = `profiles/${Date.now().toString()}_${profileFile.name}`;
    profileURL = await uploadImageFile(profilePath, profileFile);

    if (!profileURL) {
      return false;
    }
  }

  try {
    axiosClient.post('/api/users', {
      profileImage: profileURL,
      nickname,
      bio,
    } satisfies EditProfileRequestDTO);
    return true;
  } catch (error) {
    alert({ type: 'error', message: JSON.stringify(error) });
    return false;
  }
}
