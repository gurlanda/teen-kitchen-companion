import { useContext, useEffect, useState } from 'react';
import LanguageContext from 'src/context/Language/LanguageContext';
import UserContext from 'src/context/User/UserContext';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';

const Account = (): JSX.Element => {
  const { preferredLanguage } = useContext(LanguageContext);
  const userContext = useContext(UserContext);
  const [firstName, setFirstName] = useState<string>(
    userContext.firstName ?? ''
  );
  const [lastName, setLastName] = useState<string>(userContext.lastName ?? '');

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

        <div className="flex flex-col gap-2">Name: {getName()}</div>
        <div className="flex flex-col gap-2">
          <label htmlFor="first-name">Preferred First Name</label>
          <input
            type="text"
            id="first-name"
            className="border border-gray-400 px-4 py-2 rounded-md"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label htmlFor="last-name">Last Name</label>
          <input
            type="text"
            id="last-name"
            className="border border-gray-400 px-4 py-2 rounded-md"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <button
            className="border self-end hover:bg-slate-200 active:bg-slate-300 border-gray-400 px-4 py-2 rounded-md"
            onClick={() => {
              userContext.setName(firstName, lastName);
            }}
          >
            Change name
          </button>
        </div>
      </div>
    </div>
  );

  function getName(): string {
    const { firstName, lastName } = userContext;
    if (firstName === undefined && lastName === undefined) {
      return '';
    }

    return `${firstName} ${lastName}`;
  }
};

export default Account;
