import { createContext } from 'react';
import Clonable from 'src/model/Interfaces/Clonable';
import User from 'src/model/User/User';
import UserType from 'src/model/User/UserType';

export class AuthState implements Clonable<AuthState> {
  isAuthenticated: boolean;
  user?: User;

  constructor(isAuthenticated: boolean, user?: User) {
    this.isAuthenticated = isAuthenticated;
    this.user = user;
  }

  clone(): AuthState {
    return new AuthState(this.isAuthenticated, this.user?.clone());
  }
}

export interface AuthContextInterface {
  state: AuthState;

  registerUser(
    name: string,
    email: string,
    userType: UserType.asUnion,
    password: string
  ): Promise<boolean>;
  login(email: string, password: string): Promise<boolean>;
  logout(): void;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

export default AuthContext;
