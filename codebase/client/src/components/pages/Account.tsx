import { reauthenticateWithCredential } from 'firebase/auth';
import { useContext, useState } from 'react';
import AuthContext from 'src/context/Auth/AuthContext';
import LanguageContext from 'src/context/Language/LanguageContext';
import UserContext from 'src/context/User/UserContext';
import sendVerificationEmail from 'src/firebase/User/sendVerificationEmail';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';

const Account = (): JSX.Element => {
  const authContext = useContext(AuthContext);
  const { preferredLanguage } = useContext(LanguageContext);
  const userContext = useContext(UserContext);
  const [firstName, setFirstName] = useState<string>(
    userContext.firstName ?? ''
  );
  const [lastName, setLastName] = useState<string>(userContext.lastName ?? '');
  const [isVerificationEmailSent, setIsVerificationEmailSent] =
    useState<boolean>(false);

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

        <div className="flex flex-col gap-[inherit]">Name: {getName()}</div>

        {/* Change name */}
        <div className="flex flex-col gap-[inherit]">
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

        {/* Send verification email */}
        {!authContext.isEmailVerified && (
          <div className="flex flex-col gap-[inherit]">
            <p>
              Your account email isn't verified, but email verification is
              needed for certain actions. Please verify your email.
            </p>
            <button
              className="border self-end enabled:hover:bg-slate-200 enabled:active:bg-slate-300 border-gray-400 px-4 py-2 rounded-md disabled:text-gray-500 disabled:bg-gray-100"
              disabled={isVerificationEmailSent}
              onClick={() => {
                sendVerificationEmail();
                setIsVerificationEmailSent(true);
              }}
            >
              {isVerificationEmailSent ? 'Sent' : 'Send verification email'}
            </button>
          </div>
        )}
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
