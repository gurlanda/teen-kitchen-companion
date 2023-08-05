import { ReactNode } from 'react';
import UserContext from './UserContext';
import User from 'src/model/User/User';

const UserContextProvider = ({
  children,
  user,
}: {
  children?: ReactNode;
  user?: User;
}): JSX.Element => {
  const providedValues = { user };

  return (
    <UserContext.Provider value={providedValues}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
