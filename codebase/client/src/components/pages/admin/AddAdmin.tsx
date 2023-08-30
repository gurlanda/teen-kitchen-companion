import { useContext, useEffect, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import AuthContext from 'src/context/Auth/AuthContext';
import getFirebaseServices from 'src/firebase/getFirebaseServices';

const AddAdmin = ({}: {}): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const { addAdmin } = getFirebaseServices();
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authContext.isSignedIn() || !authContext.isAdmin) {
      navigate('/');
    }
  }, []);

  return (
    <div>
      <Form method="post" className="w-fluid mx-auto flex flex-col gap-3">
        <h2 className="text-5xl font-heading font-bold">
          Give admin privilages to existing user
        </h2>
        <p className="font-body">
          Use this form to give admin privilages to an{' '}
          <strong className="font-bold">existing</strong> user. If the person
          you want to assign an admin role to does not have an account, please
          instruct them to do so. This form only adds privilages to existing
          accounts.
        </p>
        <fieldset className="font-body flex flex-col gap-3">
          <label htmlFor="targetEmail">Email of account to promote</label>
          <input
            type="email"
            name="targetEmail"
            id="targetEmail"
            className="px-4 py-2 border border-gray-400 rounded-md"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="self-end px-4 py-2 border font-heading text-3xl text-white bg-brand-teal rounded-md"
            onClick={async () => {
              window.alert(`Email: ${email}`);
              const response = (await addAdmin(email)).data as {
                message: string;
                error: any;
              };
              window.alert(response.message);
              if (response.error !== null) {
                console.log(response);
              }
            }}
          >
            Promote User
          </button>
        </fieldset>
      </Form>
    </div>
  );
};

export function action() {
  return null;
}

export default AddAdmin;
