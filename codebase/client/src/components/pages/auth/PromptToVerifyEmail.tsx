const PromptToVerifyEmail = ({}: {}): JSX.Element => {
  return (
    <div className="h-full">
      <div className="w-fluid mx-auto flex flex-col gap-2 font-body text-lg">
        <h1 className="font-heading font-bold text-5xl">Verify your email</h1>
        <p>
          We've emailed you a verification link. Please check your email and
          click on the link to verify your account.
        </p>
      </div>
    </div>
  );
};

export default PromptToVerifyEmail;
