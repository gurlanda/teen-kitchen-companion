import { useContext } from 'react';
import LanguageContext from 'src/context/Language/LanguageContext';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';

const Account = (): JSX.Element => {
  const { preferredLanguage } = useContext(LanguageContext);

  return (
    <div className="h-full">
      <div className="h-full w-fluid mx-auto flex flex-col gap-2">
        <h1 className="font-heading font-bold text-5xl">
          {
            {
              [SupportedLanguage.ENGLISH]: 'Account Settings',
              [SupportedLanguage.SPANISH]: 'Lorem ipsum',
            }[preferredLanguage]
          }
        </h1>
      </div>
    </div>
  );
};

export default Account;
