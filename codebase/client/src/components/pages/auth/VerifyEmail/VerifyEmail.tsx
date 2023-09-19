import { applyActionCode } from 'firebase/auth';
import { useEffect, useState } from 'react';
import getFirebaseServices from 'src/firebase/getFirebaseServices';
import Verified from './Verified';
import sendVerificationEmail from 'src/firebase/User/sendVerificationEmail';
import InvalidOrExpiredCode from './InvalidOrExpiredCode';

const VerifyEmail = ({
  continueUrl,
  actionCode,
}: {
  continueUrl: URL;
  actionCode: string;
}): JSX.Element => {
  const [pageState, setPageState] = useState<'loading' | 'verified' | 'error'>(
    'loading'
  );

  useEffect(() => {
    (async function verifyEmail() {
      const { authRef } = getFirebaseServices();

      try {
        await applyActionCode(authRef, actionCode);

        // If execution reaches this point, then email address has been verified
        setPageState('verified');
      } catch (error) {
        // Code is invalid or expired
        setPageState('error');
        sendVerificationEmail();
      }
    })();
  }, []);

  switch (pageState) {
    case 'loading':
      return <>Loading...</>;
    case 'verified':
      return <Verified continuePath={continueUrl.pathname} />;
    case 'error':
      return <InvalidOrExpiredCode />;
    default:
      return <>Loading...</>;
  }
};

export default VerifyEmail;
