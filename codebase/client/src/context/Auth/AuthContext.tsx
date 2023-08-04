import { createContext } from 'react';

interface AuthContext {
  signUp(email: string, password: string): Promise<void>;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
  isSignedIn(): boolean;
}

const authContext = createContext<AuthContext | undefined>(undefined);
export default authContext;
