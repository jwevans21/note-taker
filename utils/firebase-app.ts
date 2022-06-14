import { initializeApp, cert, applicationDefault } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

import serviceAccount from './serviceAccountKey.json';

export const config = {
   credential: cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
   }),
};

export const app = initializeApp(config);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
