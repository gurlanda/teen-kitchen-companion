import React, { ReactNode, useEffect, useState } from 'react';
import getFirebaseServices from 'src/firebase/getFirebaseServices';
import AuthContext, { User } from './AuthContext';

const AuthContextState: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const firebaseServices = getFirebaseServices();
    // firebaseServices.onAuthStateChanged((changedUserData) => {
    //   if (changedUserData) {
    //     // User is logged in
    //     console.log('User signed in');
    //     onSignIn(changedUserData);
    //   } else {
    //     // User is logged out
    //     console.log('User signed out');
    //     onSignOut();
    //   }
    // });
  }, []);

  function onSignIn(changedUserData: User): void {
    setUser(changedUserData);
    setIsSignedIn(true);
  }

  function onSignOut(): void {
    setUser(undefined);
    setIsSignedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isSignedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextState;
