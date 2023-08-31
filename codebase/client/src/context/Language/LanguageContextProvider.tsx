import { useContext, useEffect, useState } from 'react';
import PreferredLanguage from 'src/model/User/PreferredLanguage';
import LanguageContext from './LanguageContext';
import AuthContext from '../Auth/AuthContext';

const LanguageContextProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const [preferredLanguage, setPreferredLanguageState] =
    useState<PreferredLanguage.Type>(PreferredLanguage.SPANISH);
  const authContext = useContext(AuthContext);

  // useEffect(() => {
  //   if (authContext.user === undefined) {
  //     return;
  //   }

  //   setPreferredLanguage(authContext.user.preferredLanguage);
  // }, [authContext.user]);

  function setPreferredLanguage(input: PreferredLanguage.Type) {
    setPreferredLanguageState(input);
  }

  return (
    <LanguageContext.Provider
      value={{ preferredLanguage, setPreferredLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContextProvider;
