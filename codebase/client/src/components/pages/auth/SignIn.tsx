import React, { useContext, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import AuthContext from 'src/context/Auth/AuthContext';
import LanguageContext from 'src/context/Language/LanguageContext';
import PreferredLanguage from 'src/model/User/PreferredLanguage';

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
      window.alert('Signed in successfully!');
      navigate('/');
    } catch (error) {
      window.alert('Error.');
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
          {preferredLanguage === PreferredLanguage.ENGLISH
            ? 'Sign In'
            : 'Lorem ipsum'}
        </h1>
        <Input
          type="text"
          name="email"
          placeholder={
            preferredLanguage === PreferredLanguage.ENGLISH
              ? 'Email address'
              : 'Lorem ipsum'
          }
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          type="password"
          name="password"
          placeholder={
            preferredLanguage === PreferredLanguage.ENGLISH
              ? 'Password'
              : 'Lorem ipsum'
          }
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Input
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
}): JSX.Element => {
  return (
    <input
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
