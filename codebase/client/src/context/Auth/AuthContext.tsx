import { createContext } from 'react';

interface AuthContext {
  userId?: string;
  signUp(email: string, password: string): Promise<void>;
  signIn(email: string, password: string): Promise<void>;
  signOut(): Promise<void>;
  isSignedIn(): boolean;
}

const authContext = createContext<AuthContext | undefined>(undefined);
export default authContext;
