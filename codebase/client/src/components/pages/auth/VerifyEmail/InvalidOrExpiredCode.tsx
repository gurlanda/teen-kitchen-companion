const InvalidOrExpiredCode = (): JSX.Element => {
  return (
    <>
      <h1 className="font-heading font-bold text-5xl">Link expired</h1>
      <p>
        The verification link is invalid or has expired. We've emailed you
        another verification link; please use it to verify your account.
      </p>
    </>
  );
};

export default InvalidOrExpiredCode;
