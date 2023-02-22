import React, { ReactNode, useEffect, useState } from 'react';
import AuthContext, { AuthState } from './AuthContext';
import LocalDb from 'src/model/LocalDatabase/LocalDatabase';
import User from 'src/model/User/User';
import UserType from 'src/model/User/UserType';
import ServerAdapter from 'src/model/Server/ServerAdapter';
import createLogger from 'src/utils/createLogger';

const AuthContextState: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(new AuthState(false));
  const [log, end] = createLogger('AuthContextState');

  useEffect(() => {
    const loadUser = async () => {
      const localUser = await LocalDb.getUser();
      const initialState = new AuthState(
        localUser ? true : false,
        localUser ? localUser : undefined
      );

      log(localUser ? 'User fetch successful.' : 'User fetch unsuccessful');
      setState(initialState);
    };

    log('Setting the user.');
    loadUser();
  }, []);

  // Register a new user
  const registerUser = async (
    name: string,
    email: string,
    userType: UserType.asUnion,
    password: string
  ) => {
    // TODO: Make sure that email is an email
    // TODO: How strong should the password be?
    const success = await ServerAdapter.registerUser(
      new User(name, email, userType),
      password
    );
    if (!success) {
      return false;
    }

    const user = await ServerAdapter.login(email, password);
    if (!user) {
      return false;
    }

    await loadUser();
    return true;
  };

  // Load a user's data
  const loadUser = async () => {
    console.log('Loading user...');
    const user = await LocalDb.getUser();
    setState(new AuthState(user ? true : false, user ? user : undefined));
  };

  // Log in a user
  const login = async (email: string, password: string) => {
    console.log('Logging in...');
    // TODO: Make sure that email is an email
    // TODO: How strong should the password be?
    const user = await ServerAdapter.login(email, password);
    await loadUser();
    return user ? true : false;
  };

  // Log out a user
  const logout = () => {
    ServerAdapter.logout();
    setState(new AuthState(false));
  };

  const providedMethods = {
    registerUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={{ state, ...providedMethods }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextState;
