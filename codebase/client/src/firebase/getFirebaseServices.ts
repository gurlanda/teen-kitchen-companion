import { initializeApp } from 'firebase/app';
import { getFunctions, httpsCallable } from 'firebase/functions';
import * as Auth from 'firebase/auth';
import firebaseConfig from './firebaseConfig';

function initializeFirebase() {
  const app = initializeApp(firebaseConfig);
  const authRef = Auth.getAuth();

  // Define the return type here for a better autocomplete experience and to keep the return type of createUserWithEmailAndPassword intentionally coupled to Auth.createUserWithEmailAndPassword
  type t = ReturnType<typeof Auth.createUserWithEmailAndPassword>;
  const createUserWithEmailAndPassword = (
    email: string,
    password: string
  ): t => {
    return Auth.createUserWithEmailAndPassword(authRef, email, password);
  };

  type s = ReturnType<typeof Auth.signInWithEmailAndPassword>;
  const signInWithEmailAndPassword = (email: string, password: string): s => {
    return Auth.signInWithEmailAndPassword(authRef, email, password);
  };

  type u = ReturnType<typeof Auth.signOut>;
  const signOut = (): u => {
    return Auth.signOut(authRef);
  };

  type v = ReturnType<typeof Auth.onAuthStateChanged>;
  type vParams = Parameters<typeof Auth.onAuthStateChanged>;
  const onAuthStateChanged = (
    nextOrObserver: vParams[1],
    error?: vParams[2],
    completed?: vParams[3]
  ): v => {
    return Auth.onAuthStateChanged(authRef, nextOrObserver, error, completed);
  };

  // Callable Cloud Functions
  const functions = getFunctions();
  const testMailer = httpsCallable(functions, 'testMailer');

  return {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    testMailer,
  };
}

export type FirebaseServices = ReturnType<typeof initializeFirebase>;
function getFirebaseServices(): FirebaseServices {
  const services = initializeFirebase();
  return services;
}

export default getFirebaseServices;
