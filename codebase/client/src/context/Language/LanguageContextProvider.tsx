import { useContext, useEffect, useState } from 'react';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';
import LanguageContext from './LanguageContext';
import AuthContext from '../Auth/AuthContext';

const LanguageContextProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const [preferredLanguage, setPreferredLanguageState] =
    useState<SupportedLanguage.Type>(SupportedLanguage.ENGLISH);
  const authContext = useContext(AuthContext);

  // useEffect(() => {
  //   if (authContext.user === undefined) {
  //     return;
  //   }

  //   setPreferredLanguage(authContext.user.preferredLanguage);
  // }, [authContext.user]);

  function setPreferredLanguage(input: SupportedLanguage.Type) {
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
