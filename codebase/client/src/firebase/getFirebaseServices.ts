import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
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
  const addAdmin = httpsCallable(functions, 'addAdmin');

  return {
    testMailer,
    addAdmin,
  };
}

function initializeAuthServices() {
  /* Authentication */
  const authRef = Auth.getAuth();

  return {
    authRef,
  };
}

function initializeCloudStorageServices(app: FirebaseApp) {
  const storageRef = getStorage(app);

  return { storageRef };
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
  const cloudStorageServices = initializeCloudStorageServices(app);

  return {
    ...cloudFunctions,
    ...authServices,
    ...firestoreServices,
    ...cloudStorageServices,
  };
}

export default getFirebaseServices;
