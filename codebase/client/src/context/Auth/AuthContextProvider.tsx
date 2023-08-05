import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import getFirebaseServices from 'src/firebase/getFirebaseServices';
import AuthContext from './AuthContext';
import { useState } from 'react';
import { FirebaseError } from 'firebase/app';

const AuthContextProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  function isSignedIn(): boolean {
    if (userId === undefined) {
      return false;
    } else {
      return true;
    }
  }

  async function signUp(email: string, password: string): Promise<void> {
    const { authRef } = getFirebaseServices();

    // Create the new user
    const userCredential = await createUserWithEmailAndPassword(
      authRef,
      email,
      password
    );

    const newUserId = userCredential.user.uid;
    // const initializationSuccessful = await initializeNewUser(newUserId);
    setUserId(newUserId);
  }

  async function signIn(email: string, password: string): Promise<void> {
    const { authRef } = getFirebaseServices();

    try {
      const userCredential = await signInWithEmailAndPassword(
        authRef,
        email,
        password
      );
      const loggedInUserId = userCredential.user.uid;
      setUserId(loggedInUserId);
      return;
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log({ ...error });
      }
      return;
    }
  }

  async function signOut(): Promise<void> {
    const { authRef } = getFirebaseServices();
    firebaseSignOut(authRef);
    setUserId(undefined);
  }

  const providedValues = { userId, signUp, signIn, signOut, isSignedIn };

  return (
    <AuthContext.Provider value={providedValues}>
      {/* <DataContextProvider userId={userId}>{children}</DataContextProvider> */}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
