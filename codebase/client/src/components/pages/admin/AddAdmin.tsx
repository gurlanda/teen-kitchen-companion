import { useContext, useEffect, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import AuthContext from 'src/context/Auth/AuthContext';
import LanguageContext from 'src/context/Language/LanguageContext';
import PreferredLanguage from 'src/model/User/PreferredLanguage';
import getFirebaseServices from 'src/firebase/getFirebaseServices';

const AddAdmin = ({}: {}): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const { addAdmin } = getFirebaseServices();
  const authContext = useContext(AuthContext);
  const { preferredLanguage } = useContext(LanguageContext);
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
          {preferredLanguage === PreferredLanguage.ENGLISH
            ? 'Give admin privilages to existing user'
            : 'Lorem ipsum'}
        </h2>
        <p className="font-body">
          {preferredLanguage === PreferredLanguage.ENGLISH ? (
            <>
              Use this form to give admin privilages to an{' '}
              <strong className="font-bold">existing</strong> user. If the
              person you want to assign an admin role to does not have an
              account, please instruct them to do so. This form only adds
              privilages to existing accounts.
            </>
          ) : (
            'Lorem ipsum'
          )}
        </p>
        <fieldset className="font-body flex flex-col gap-3">
          <label htmlFor="targetEmail">
            {preferredLanguage === PreferredLanguage.ENGLISH
              ? 'Email of account to promote'
              : 'Lorem ipsum'}
          </label>
          <input
            type="email"
            name="targetEmail"
            id="targetEmail"
            className="px-4 py-2 border border-gray-400 rounded-md"
            placeholder={
              preferredLanguage === PreferredLanguage.ENGLISH
                ? 'Email'
                : 'Lorem'
            }
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
            {preferredLanguage === PreferredLanguage.ENGLISH
              ? 'Promote User'
              : 'Lorem ipsum'}
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
