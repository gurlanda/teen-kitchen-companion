import { createContext } from 'react';
import User from 'src/model/User/User';

interface UserContext {
  user: User | undefined;
}

const userContext = createContext<UserContext | undefined>(undefined);
export default userContext;
