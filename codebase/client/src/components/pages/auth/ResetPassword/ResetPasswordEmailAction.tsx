import { verifyPasswordResetCode } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { paths } from 'src';
import getFirebaseServices from 'src/firebase/getFirebaseServices';
import ResetPassword from './ResetPassword';

const ResetPasswordEmailAction = ({
  actionCode,
}: {
  actionCode: string;
}): JSX.Element => {
  const [pageState, setPageState] = useState<'loading' | 'verified' | 'error'>(
    'loading'
  );
  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    (async function verifyResetCode() {
      try {
        const { authRef } = getFirebaseServices();
        const userEmail = await verifyPasswordResetCode(authRef, actionCode);
        setUserEmail(userEmail);
        setPageState('verified');
      } catch (error) {
        setPageState('error');
      }
    })();
  }, []);

  switch (pageState) {
    case 'loading':
      return <Loading />;
    case 'verified':
      return <ResetPassword actionCode={actionCode} email={userEmail} />;
    case 'error':
      return <VerificationError />;
  }
};

const Loading = (): JSX.Element => {
  return <div>Loading...</div>;
};

const VerificationError = (): JSX.Element => {
  return (
    <>
      <h1 className="font-heading text-5xl">Link expired</h1>
      <p>
        This link has expired.{' '}
        <Link to={paths.auth.resetPassword} className="text-blue-500">
          Click here to send another password reset link.
        </Link>
      </p>
    </>
  );
};

export default ResetPasswordEmailAction;
