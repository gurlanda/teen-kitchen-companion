import { applyActionCode } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getFirebaseServices from 'src/firebase/getFirebaseServices';

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
  const navigate = useNavigate();

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

        // TODO: Email the user another verification link
      }
    })();
  }, []);

  return (
    <>
      <h1 className="font-heading font-bold text-5xl">Verified!</h1>
      <p>Your account has been verified.</p>
      <button
        className="border border-gray-400 px-4 py-2 rounded-md hover:bg-slate-300 active:bg-slate-400"
        onClick={() => navigate(continueUrl.pathname)}
      >
        Click here to go to the home page.
      </button>
    </>
  );
};

export default VerifyEmail;
