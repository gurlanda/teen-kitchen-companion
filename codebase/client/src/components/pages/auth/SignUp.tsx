import React, { useContext, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import AuthContext from 'src/context/Auth/AuthContext';
import LanguageContext from 'src/context/Language/LanguageContext';
import PreferredLanguage from 'src/model/User/PreferredLanguage';
import StorableUser from 'src/model/User/StorableUser';

const SignUp = ({}: {}): JSX.Element => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const languageContext = useContext(LanguageContext);
  const [preferredLanguage, setPreferredLanguage] = useState<string>(
    languageContext.preferredLanguage
  );

  // TODO
  // Checks if the current input fits constraints
  function isAllInputValid(): boolean {
    return true;
  }

  const onSubmit: React.MouseEventHandler<HTMLInputElement> = () => {
    if (!isAllInputValid()) {
      // TODO
      return;
    }

    const newUserData: StorableUser = {
      firstName,
      lastName,
      email,
      preferredLanguage: PreferredLanguage.isPreferredLanguage(
        preferredLanguage
      )
        ? (preferredLanguage as PreferredLanguage.Type)
        : PreferredLanguage.ENGLISH,
    };

    try {
      authContext.signUp(newUserData, password);
      window.alert('Signed up successfully!');
      navigate('/');
    } catch (error) {
      window.alert('Error.');
      console.log(error);
    }
  };

  return (
    <div>
      <Form
        className="flex flex-col gap-4 border rounded-xl shadow shadow-gray-300 px-8 py-5 mt-10 w-[min(90vw,75ch)] mx-auto"
        method="post"
      >
        <h1 className="font-heading font-bold text-4xl">Sign Up!</h1>
        <Input
          type="text"
          name="firstName"
          placeholder={
            preferredLanguage === PreferredLanguage.ENGLISH
              ? 'First name'
              : 'Lorem ipsum'
          }
          required
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
        <Input
          type="text"
          name="lastName"
          placeholder={
            preferredLanguage === PreferredLanguage.ENGLISH
              ? 'Last name'
              : 'Lorem ipsum'
          }
          required
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
        <fieldset className="flex flex-col gap-2">
          <span>What is your preferred language?</span>
          <div className="flex gap-2">
            <label htmlFor="english">
              <input
                type="radio"
                name="preferredLanguage"
                value={PreferredLanguage.ENGLISH}
                id="english"
                onChange={(e) => setPreferredLanguage(e.currentTarget.value)}
                checked={preferredLanguage === PreferredLanguage.ENGLISH}
              />{' '}
              English
            </label>
            <label htmlFor="spanish">
              <input
                type="radio"
                name="preferredLanguage"
                value={PreferredLanguage.SPANISH}
                id="spanish"
                onChange={(e) => setPreferredLanguage(e.currentTarget.value)}
                checked={preferredLanguage === PreferredLanguage.SPANISH}
              />{' '}
              Español
            </label>
          </div>
        </fieldset>
        {/* <fieldset className="flex flex-col gap-2">
          <span>User type</span>
          <div className="flex gap-2">
            <label htmlFor="user">
              <input
                type="radio"
                name="userType"
                value={UserType.USER}
                id="user"
                onChange={(e) => setUserType(e.currentTarget.value)}
                checked={userType === UserType.USER}
              />{' '}
              Regular user
            </label>
            <label htmlFor="admin">
              <input
                type="radio"
                name="userType"
                value={UserType.ADMIN}
                id="admin"
                onChange={(e) => setUserType(e.currentTarget.value)}
                checked={userType === UserType.ADMIN}
              />{' '}
              Admin
            </label>
          </div>
        </fieldset> */}
        <Input
          type="text"
          name="email"
          placeholder={
            preferredLanguage === PreferredLanguage.ENGLISH
              ? 'Preferred email address'
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
          type="password"
          name="confirmedPassword"
          placeholder={
            preferredLanguage === PreferredLanguage.ENGLISH
              ? 'Confirm password'
              : 'Lorem ipsum'
          }
          required
          onChange={(e) => setConfirmedPassword(e.target.value)}
          value={confirmedPassword}
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

export default SignUp;
