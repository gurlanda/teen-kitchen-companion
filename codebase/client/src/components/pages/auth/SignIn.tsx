import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, useNavigate } from 'react-router-dom';
import { paths } from 'src';
import AuthContext from 'src/context/Auth/AuthContext';
import LanguageContext from 'src/context/Language/LanguageContext';
import SupportedLanguage from 'src/model/Language/SupportedLanguage';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Used to navigate to the admin page upon login
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { preferredLanguage } = useContext(LanguageContext);

  const onSubmit = async () => {
    try {
      await authContext.signIn(email, password);
      // window.alert('Signed in successfully!');
      navigate(paths.home);
    } catch (error) {
      // window.alert('Error.');
      console.log(error);
    }
  };

  return (
    <div className="h-full">
      <Form
        method="post"
        className="flex flex-col px-8 py-5 mt-10 gap-4 w-[min(90vw,75ch)] mx-auto border rounded-xl shadow shadow-gray-300"
      >
        <h1 className="font-heading font-bold text-4xl">
          {
            {
              [SupportedLanguage.ENGLISH]: 'Sign In',
              [SupportedLanguage.SPANISH]: 'Lorem ipsum',
            }[preferredLanguage]
          }
        </h1>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email address</label>
          <Input
            id="email"
            type="text"
            name="email"
            placeholder={
              {
                [SupportedLanguage.ENGLISH]: 'Email address',
                [SupportedLanguage.SPANISH]: 'Lorem ipsum',
              }[preferredLanguage]
            }
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Password</label>
          <Input
            id="password"
            type="password"
            name="password"
            placeholder={
              {
                [SupportedLanguage.ENGLISH]: 'Password',
                [SupportedLanguage.SPANISH]: 'Lorem ipsum',
              }[preferredLanguage]
            }
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        {/* Create account */}
        <div className="self-end">
          Are you a new user?{' '}
          <Link to={paths.auth.signUp} className=" text-blue-500">
            Create an account.
          </Link>
        </div>

        {/* Password reset */}
        <div className="self-end">
          <Link to={paths.auth.resetPassword} className=" text-blue-500">
            Forgot your password?
          </Link>
        </div>

        <Input
          id="submit"
          type="submit"
          name="submit"
          onClick={onSubmit}
          className="self-end"
        />
      </Form>
    </div>
  );
};

const Input = ({
  type,
  name,
  value,
  placeholder,
  required,
  onChange,
  onClick,
  className,
  children,
  id,
}: {
  type: React.HTMLInputTypeAttribute;
  name: React.InputHTMLAttributes<HTMLInputElement>['name'];
  value?: React.InputHTMLAttributes<HTMLInputElement>['value'];
  placeholder?: string;
  required?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  className?: string;
  children?: React.ReactNode;
  id: string;
}): JSX.Element => {
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      required={required}
      onChange={onChange}
      onClick={onClick}
      className={`border rounded-xl px-4 py-2 ${className}`}
    >
      {children}
    </input>
  );
};

export function action() {
  return null;
}

export default SignIn;
