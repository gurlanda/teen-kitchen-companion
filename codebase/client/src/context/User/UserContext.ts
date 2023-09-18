import { createContext } from 'react';

interface UserContext {
  firstName: string | undefined;
  lastName: string | undefined;
  setName: (
    firstName: string | undefined,
    lastName: string | undefined
  ) => void;
  clearUser: () => void;
}

const defaultUserContext: UserContext = {
  firstName: undefined,
  lastName: undefined,
  setName: () => {},
  clearUser: () => {},
};

const userContext = createContext<UserContext>(defaultUserContext);
export default userContext;
