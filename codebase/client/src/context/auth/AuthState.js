import React, { useReducer } from 'react';
import AuthContext from './authContext';
import AuthReducer from './authReducer';
import ServerAdapter from '../../model/database/ServerAdapter';
import * as ops from '../types';
import User from '../../model/user/User';
import * as UserTypes from '../../model/user/userTypes';

const AuthState = ({ children }) => {
  // Set the initial state
  const initialState = {
    isAuthenticated: false,
    user: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Register a new user
  const registerUser = async (name, email, userType, password) => {
    if (!(name instanceof String || typeof name === 'string')) {
      throw new TypeError(
        "In AuthState > registerUser(): Argument passed to parameter 'name' is not a String."
      );
    }

    if (!(email instanceof String || typeof email === 'string')) {
      throw new TypeError(
        "In AuthState > registerUser(): Argument passed to parameter 'email' is not a String."
      );
    }

    if (!UserTypes.asArray.includes(userType)) {
      throw new TypeError(
        "In AuthState > registerUser(): Argument passed to parameter 'userType' is not a UserType."
      );
    }

    if (!(password instanceof String || typeof password === 'string')) {
      throw new TypeError(
        "In AuthState > registerUser(): Argument passed to parameter 'password' is not a String."
      );
    }

    await ServerAdapter.registerUser(new User(name, email, userType), password);
    await login(email, password);
  };

  // Load a user's data
  const loadUser = async () => {
    console.log('Loading user...');
    const user = await ServerAdapter.getUserData();
    if (!user) {
      console.log('Error loading user');
      dispatch({
        type: ops.AUTH_ERROR,
      });
    } else {
      console.log('User loaded');
      dispatch({
        type: ops.LOAD_USER,
        payload: user,
      });
    }
  };

  // Log in a user
  const login = async (email, password) => {
    console.log('Logging in...');
    const errors = await ServerAdapter.login(email, password);
    if (errors.length === 0) {
      await loadUser();
    } else {
      dispatch({ type: ops.AUTH_ERROR });
    }
  };

  // Log out a user
  const logout = () => {
    dispatch({ type: ops.LOGOUT });
    ServerAdapter.logout();
  };

  const providedMethods = {
    registerUser,
    loadUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={{ ...state, ...providedMethods }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
