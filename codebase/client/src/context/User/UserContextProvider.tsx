import { useContext, useEffect, useState } from 'react';
import UserContext from './UserContext';
import AuthContext from '../Auth/AuthContext';
import updateCurrentUserName from 'src/firebase/User/updateCurrentUserName';

const UserContextProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const [firstName, setFirstName] = useState<string | undefined>(undefined);
  const [lastName, setLastName] = useState<string | undefined>(undefined);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const { firstName, lastName } = user;
      setFirstName(firstName);
      setLastName(lastName);
    } else {
      setFirstName(undefined);
      setLastName(undefined);
    }
  }, [user]);

  // If a passed-in argument is undefined, then that part of the user's name will not be changed
  async function setName(
    newFirstName: string | undefined,
    newLastName: string | undefined
  ) {
    if (user === undefined) {
      return;
    }

    if (newFirstName !== undefined) {
      setFirstName(newFirstName);
    }

    if (newLastName !== undefined) {
      setLastName(newLastName);
    }

    await updateCurrentUserName(newFirstName, newLastName);
  }

  function clearUser() {
    setFirstName(undefined);
    setLastName(undefined);
  }

  const providedValues = {
    firstName,
    lastName,
    setName,
    clearUser,
  };

  return (
    <UserContext.Provider value={providedValues}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
