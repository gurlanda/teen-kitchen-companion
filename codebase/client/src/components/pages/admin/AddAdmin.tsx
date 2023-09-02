import { useContext, useEffect, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import AuthContext from 'src/context/Auth/AuthContext';
import LanguageContext from 'src/context/Language/LanguageContext';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';
import getFirebaseServices from 'src/firebase/getFirebaseServices';

const AddAdmin = ({}: {}): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const { addAdmin } = getFirebaseServices();
  const authContext = useContext(AuthContext);
  const { preferredLanguage } = useContext(LanguageContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authContext.isSignedIn()) {
      navigate('/sign-in');
    }

    if (!authContext.isAdmin) {
      navigate('/');
    }
  }, []);

  return (
    <div>
      <Form method="post" className="w-fluid mx-auto flex flex-col gap-3">
        <h2 className="text-5xl font-heading font-bold">
          {
            {
              [SupportedLanguage.ENGLISH]:
                'Give admin privilages to existing user',
              [SupportedLanguage.SPANISH]: 'Lorem ipsum',
            }[preferredLanguage]
          }
        </h2>
        <p className="font-body">
          {
            {
              [SupportedLanguage.ENGLISH]: (
                <>
                  Use this form to give admin privilages to an{' '}
                  <strong className="font-bold">existing</strong> user. If the
                  person you want to assign an admin role to does not have an
                  account, please instruct them to do so. This form only adds
                  privilages to existing accounts.
                </>
              ),
              [SupportedLanguage.SPANISH]: 'Lorem ipsum',
            }[preferredLanguage]
          }
        </p>
        <fieldset className="font-body flex flex-col gap-3">
          <label htmlFor="targetEmail">
            {
              {
                [SupportedLanguage.ENGLISH]: 'Email of account to promote',
                [SupportedLanguage.SPANISH]: 'Lorem ipsum',
              }[preferredLanguage]
            }
          </label>
          <input
            type="email"
            name="targetEmail"
            id="targetEmail"
            className="px-4 py-2 border border-gray-400 rounded-md"
            placeholder={
              {
                [SupportedLanguage.ENGLISH]: 'Email',
                [SupportedLanguage.SPANISH]: 'Lorem ipsum',
              }[preferredLanguage]
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
            {
              {
                [SupportedLanguage.ENGLISH]: 'Promote User',
                [SupportedLanguage.SPANISH]: 'Lorem ipsum',
              }[preferredLanguage]
            }
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
