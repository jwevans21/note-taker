import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';

export const config = {
   credential: cert({
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
   }),
};

export const app = initializeApp(config);

export const db = getFirestore(app);
export const storage = getStorage(app);
