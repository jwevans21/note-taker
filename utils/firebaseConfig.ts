import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const config = {
   apiKey: 'AIzaSyDZJG4n5cGrJt4-PzGzT3kM_RoHtXTh2dY',
   authDomain: 'note-taker-61eb0.firebaseapp.com',
   projectId: 'note-taker-61eb0',
   storageBucket: 'note-taker-61eb0.appspot.com',
   messagingSenderId: '814767784471',
   appId: '1:814767784471:web:8b1de626cdc0951e83d252',
};

export const app = initializeApp(config);

export const auth = getAuth(app);
