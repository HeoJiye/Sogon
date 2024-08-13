import firebaseAdmin from 'firebase-admin';

import serviceAccount from './firebase-adminsdk.json';

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount as firebaseAdmin.ServiceAccount),
  });
}

export const auth = firebaseAdmin.auth();
export const db = firebaseAdmin.firestore();
