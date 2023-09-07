import { useContext, useEffect, useState } from 'react';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';
import LanguageContext from './LanguageContext';
import AuthContext from '../Auth/AuthContext';
import updateCurrentUserPreferredLanguage from 'src/firebase/User/updateCurrentUserPreferredLanguage';

const LanguageContextProvider = ({
  children,
}: {
  children?: React.ReactNode;
}): JSX.Element => {
  const [preferredLanguage, setPreferredLanguageState] =
    useState<SupportedLanguage.Type>(SupportedLanguage.ENGLISH);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user === undefined) {
      return;
    }

    setPreferredLanguageState(user.preferredLanguage);
  }, [user]);

  async function setPreferredLanguage(
    newPreferredLanguage: SupportedLanguage.Type
  ) {
    setPreferredLanguageState(newPreferredLanguage);
    if (user === undefined) {
      return;
    }

    await updateCurrentUserPreferredLanguage(newPreferredLanguage);
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
