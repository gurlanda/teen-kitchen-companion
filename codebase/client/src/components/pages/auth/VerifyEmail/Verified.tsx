import { useNavigate } from 'react-router-dom';

const Verified = ({ continuePath }: { continuePath: string }): JSX.Element => {
  const navigate = useNavigate();
  return (
    <>
      <h1 className="font-heading font-bold text-5xl">Verified!</h1>
      <p>Your account has been verified.</p>
      <button
        className="border border-gray-400 px-4 py-2 rounded-md hover:bg-slate-300 active:bg-slate-400"
        onClick={() => navigate(continuePath)}
      >
        Click here to go to the home page.
      </button>
    </>
  );
};

export default Verified;
