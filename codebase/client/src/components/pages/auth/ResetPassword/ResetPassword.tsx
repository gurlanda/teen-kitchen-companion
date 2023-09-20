import { confirmPasswordReset } from 'firebase/auth';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from 'src';
import AuthContext from 'src/context/Auth/AuthContext';
import getFirebaseServices from 'src/firebase/getFirebaseServices';

const ResetPassword = ({
  actionCode,
  email,
}: {
  actionCode: string;
  email: string;
}): JSX.Element => {
  const [pageState, setPageState] = useState<
    'resettingPassword' | 'resetSuccessful' | 'error'
  >('resettingPassword');
  const [password, setPassword] = useState<string>('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  async function submitPasswordReset() {
    try {
      const { authRef } = getFirebaseServices();
      await confirmPasswordReset(authRef, actionCode, password);
      setPageState('resetSuccessful');
      await authContext.signIn(email, password);
      setTimeout(() => navigate(paths.home), 1500);
    } catch (error) {
      setPageState('error');
    }
  }

  switch (pageState) {
    case 'resettingPassword':
      return (
        <ResetForm
          password={password}
          confirmedPassword={confirmedPassword}
          setPassword={setPassword}
          setConfirmedPassword={setConfirmedPassword}
          submitPasswordReset={submitPasswordReset}
        />
      );
    case 'resetSuccessful':
      return <ResetSuccessful />;
    case 'error':
      return <></>;
  }
};

const ResetForm = ({
  password,
  confirmedPassword,
  setPassword,
  setConfirmedPassword,
  submitPasswordReset,
}: {
  password: string;
  confirmedPassword: string;
  setPassword: (password: string) => void;
  setConfirmedPassword: (password: string) => void;
  submitPasswordReset: () => Promise<void>;
}): JSX.Element => {
  return (
    <>
      <h1 className="font-bold font-heading text-5xl">Reset password</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="password">New password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border border-gray-400 rounded-md"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="confirm-password">Confirm new password</label>
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
          value={confirmedPassword}
          onChange={(e) => setConfirmedPassword(e.target.value)}
          className="px-4 py-2 border border-gray-400 rounded-md"
        />
      </div>
      <button
        onClick={() => {
          // TODO: Confirm that the passwords match and meet the standards
          // If the passwords pass the checks then...
          submitPasswordReset();
        }}
        className="border self-end enabled:hover:bg-slate-200 enabled:active:bg-slate-300 border-gray-400 px-4 py-2 rounded-md disabled:text-gray-500 disabled:bg-gray-100"
      >
        Reset password
      </button>
    </>
  );
};

const ResetSuccessful = (): JSX.Element => {
  return (
    <>
      <h1 className="font-bold font-heading text-5xl">
        Password reset successful!
      </h1>
      <p>Redirecting to home page...</p>
    </>
  );
};

export default ResetPassword;
