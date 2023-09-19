import { useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth';
import getFirebaseServices from 'src/firebase/getFirebaseServices';
import AuthContext from './AuthContext';
import User from 'src/model/User/User';
import StorableUser from 'src/model/User/StorableUser';
import initializeUser from 'src/firebase/User/initializeUser';
import isCurrentUserAdmin from 'src/firebase/User/isCurrentUserAdmin';
import getCurrentUser from 'src/firebase/User/getCurrentUser';
import sendVerificationEmail from 'src/firebase/User/sendVerificationEmail';

const AuthContextProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const { authRef } = getFirebaseServices();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(authRef, async (user) => {
      if (user) {
        try {
          await setUpCurrentUser();
        } catch (error) {
          console.log(error);
          removeUserInfo();
        }
      } else {
        removeUserInfo();
      }
    });

    // (async () => {
    //   await setUpCurrentUser();
    // })();
  }, []);

  function isSignedIn(): boolean {
    if (user === undefined) {
      return false;
    } else {
      return true;
    }
  }

  async function signUp(
    newUser: StorableUser,
    password: string
  ): Promise<void> {
    try {
      // Create the new user
      const { authRef } = getFirebaseServices();
      await setPersistence(authRef, browserLocalPersistence);
      const userCredential = await createUserWithEmailAndPassword(
        authRef,
        newUser.email,
        password
      );

      // Initialize the user
      const userId = userCredential.user.uid;
      const storableUser: StorableUser = {
        ...newUser,
      };
      const user = User.fromStorable(storableUser, userId);

      await sendVerificationEmail();

      // Update the database
      await initializeUser(user);
    } catch (error) {
      removeUserInfo();
      console.log(error);
    }
  }

  async function signIn(email: string, password: string): Promise<void> {
    try {
      const { authRef } = getFirebaseServices();
      await setPersistence(authRef, browserLocalPersistence);
      await signInWithEmailAndPassword(authRef, email, password);
    } catch (error) {
      removeUserInfo();
      console.log(error);
    }
  }

  async function signOut(): Promise<void> {
    const { authRef } = getFirebaseServices();
    await firebaseSignOut(authRef);
  }

  const providedValues = {
    user,
    isAdmin,
    isEmailVerified,
    signUp,
    signIn,
    signOut,
    isSignedIn,
  };

  async function setUpCurrentUser() {
    const userData = await getCurrentUser();
    const currentUserIsAdmin = await isCurrentUserAdmin();
    const isEmailVerified: boolean =
      getFirebaseServices().authRef.currentUser?.emailVerified ?? false;

    setUser(userData);
    setIsAdmin(currentUserIsAdmin);
    setIsEmailVerified(isEmailVerified);
    // console.dir({ userData, currentUserIsAdmin });
  }

  function removeUserInfo() {
    setUser(undefined);
    setIsAdmin(false);
    setIsEmailVerified(false);
  }

  return (
    <AuthContext.Provider value={providedValues}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
