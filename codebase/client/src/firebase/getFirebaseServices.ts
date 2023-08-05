import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getFirestore } from 'firebase/firestore';
import * as Auth from 'firebase/auth';
import firebaseConfig from './firebaseConfig';

function initializeFirebase() {
  const app = initializeApp(firebaseConfig);

  return app;
}

function initializeCloudFunctions() {
  /* Callable Cloud Functions */
  const functions = getFunctions();
  const testMailer = httpsCallable(functions, 'testMailer');

  return {
    testMailer,
  };
}

function initializeAuthServices() {
  /* Authentication */
  const authRef = Auth.getAuth();

  return {
    authRef,
  };
}

function initializeFirestoreServices(app: FirebaseApp) {
  const firestoreRef = getFirestore(app);
  return {
    firestoreRef,
  };
}

export type FirebaseServices = ReturnType<typeof getFirebaseServices>;
function getFirebaseServices() {
  const app = initializeFirebase();
  const cloudFunctions = initializeCloudFunctions();
  const authServices = initializeAuthServices();
  const firestoreServices = initializeFirestoreServices(app);
  return { ...cloudFunctions, ...authServices, ...firestoreServices };
}

export default getFirebaseServices;
