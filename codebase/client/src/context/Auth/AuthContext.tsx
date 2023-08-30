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

const authContext = createContext<AuthContext | undefined>(undefined);
export default authContext;
