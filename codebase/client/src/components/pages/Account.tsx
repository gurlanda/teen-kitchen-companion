import { reauthenticateWithCredential } from 'firebase/auth';
import { useContext, useState } from 'react';
import AuthContext from 'src/context/Auth/AuthContext';
import LanguageContext from 'src/context/Language/LanguageContext';
import UserContext from 'src/context/User/UserContext';
import sendPasswordResetRequestEmail from 'src/firebase/User/sendPasswordResetRequestEmail';
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
  const [verificationEmailSent, setVerificationEmailSent] =
    useState<boolean>(false);
  const [passwordResetLinkSent, setPasswordResetLinkSent] =
    useState<boolean>(false);

  const buttonClassNames =
    'border self-end enabled:hover:bg-slate-200 enabled:active:bg-slate-300 border-gray-400 px-4 py-2 rounded-md disabled:text-gray-500 disabled:bg-gray-100';
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

        {/* Change name */}
        <div className="flex flex-col gap-[inherit]">
          <h2 className="font-bold font-heading text-3xl">
            Change account name
          </h2>
          <span>Current account name: {getName()}</span>
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
            className={buttonClassNames}
            onClick={() => {
              userContext.setName(firstName, lastName);
            }}
          >
            Change name
          </button>
        </div>

        {/* Reset password */}
        <div className="flex flex-col gap-[inherit]">
          <h2 className="font-bold font-heading text-3xl">Reset password</h2>
          <p>Email a link where you can reset your password.</p>
          <button
            className={buttonClassNames}
            disabled={passwordResetLinkSent}
            onClick={() => {
              const userEmail = authContext.user?.email;
              if (userEmail === undefined) {
                console.log('User is undefined.');
                return;
              }

              sendPasswordResetRequestEmail(userEmail);
              setPasswordResetLinkSent(true);
            }}
          >
            {passwordResetLinkSent
              ? 'Password reset link sent'
              : 'Send password reset email'}
          </button>
        </div>

        {/* Send verification email */}
        {!authContext.isEmailVerified && (
          <div className="flex flex-col gap-[inherit]">
            <h2 className="font-bold font-heading text-3xl">
              Please verify your account
            </h2>
            <p>
              Your account email isn't verified, but email verification is
              needed for certain actions. Please verify your email.
            </p>
            <button
              className={buttonClassNames}
              disabled={verificationEmailSent}
              onClick={() => {
                sendVerificationEmail();
                setVerificationEmailSent(true);
              }}
            >
              {verificationEmailSent ? 'Sent' : 'Send verification email'}
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
