import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { paths } from 'src';
import Button from 'src/components/layout/Button';
import sendPasswordResetRequestEmail from 'src/firebase/User/sendPasswordResetRequestEmail';

const SendPasswordResetLink = (): JSX.Element => {
  const [pageState, setPageState] = useState<
    'showResetForm' | 'emailSubmitted'
  >('showResetForm');
  const [email, setEmail] = useState<string>('');

  function onSubmitEmail() {
    // TODO: Prevent the user from submitting if the input isn't a valid email
    sendPasswordResetRequestEmail(email);
    setPageState('emailSubmitted');
  }

  return (
    <div className="h-full">
      <div className="h-full flex flex-col w-fluid mx-auto gap-2 font-body text-lg">
        {(function selectComponent() {
          switch (pageState) {
            case 'showResetForm':
              return (
                <PasswordResetForm
                  email={email}
                  setEmail={setEmail}
                  onSubmitEmail={onSubmitEmail}
                />
              );
            case 'emailSubmitted':
              return <EmailSubmitted />;
          }
        })()}
      </div>
    </div>
  );
};

const PasswordResetForm = ({
  email,
  setEmail,
  onSubmitEmail,
}: {
  email: string;
  setEmail: (email: string) => void;
  onSubmitEmail: () => void;
}): JSX.Element => {
  return (
    <>
      <h1 className="font-heading text-5xl">Forgot your password?</h1>

      <p>
        Enter your email address. If there's an account associated with that
        email, we'll send a link where you can reset your password.
      </p>

      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="font-bold">
          Email address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border border-gray-400 rounded-md"
        />
      </div>

      <Button className="self-end" onClick={() => onSubmitEmail()}>
        Send password reset link
      </Button>
    </>
  );
};

const EmailSubmitted = ({}: {}): JSX.Element => {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="font-heading text-5xl">Email sent!</h1>
      <p>
        Please check your email for your password reset link. If you haven't
        received an email, try re-entering your email address or trying a
        different email.
      </p>
      <Button className="self-end" onClick={() => navigate(paths.home)}>
        Go to home page
      </Button>
    </>
  );
};

export default SendPasswordResetLink;
