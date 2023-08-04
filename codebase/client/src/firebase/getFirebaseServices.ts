import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

function initializeFirebase() {
  const app = initializeApp(firebaseConfig);
  return app;
}

function initializeAuth() {
  const authRef = getAuth();
  return authRef;
}

function initializeFirestore(app: FirebaseApp) {
  const firestoreRef = getFirestore(app);
  return firestoreRef;
}

export type FirebaseServices = ReturnType<typeof getFirebaseServices>;
function getFirebaseServices() {
  const app = initializeFirebase();
  const authRef = initializeAuth();
  const firestoreRef = initializeFirestore(app);
  return { authRef, firestoreRef };
}

export default getFirebaseServices;
