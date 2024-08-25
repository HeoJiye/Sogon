import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

import { storage } from './firebase';
import toast from './toast';

export async function uploadImageFile(path: string, file: File): Promise<string | undefined> {
  const storageRef = ref(storage, path);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    toast({ type: 'error', message: '파일 업로드에 실패했습니다.' });
    return undefined;
  }
}

export async function getImageFile(path: string): Promise<string | undefined> {
  const storageRef = ref(storage, path);

  try {
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  } catch (error) {
    toast({ type: 'error', message: '파일 업로드에 실패했습니다.' });
    return undefined;
  }
}
