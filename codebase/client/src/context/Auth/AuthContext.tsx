import { createContext } from 'react';
import StorableUser from 'src/model/User/StorableUser';
import User from 'src/model/User/User';

interface AuthContext {
  user: User | undefined;
  isAdmin: boolean;
  signUp(newUser: StorableUser, password: string): Promise<void>;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
  isSignedIn(): boolean;
}

const defaultAuthContext: AuthContext = {
  user: undefined,
  isAdmin: false,
  signUp: async () => {},
  signIn: async () => {},
  signOut: async () => {},
  isSignedIn: () => {
    return false;
  },
};

const authContext = createContext<AuthContext>(defaultAuthContext);
export default authContext;
