import React, { useContext, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import AuthContext from 'src/context/Auth/AuthContext';
import PreferredLanguage from 'src/model/User/PreferredLanguage';
import StorableUser from 'src/model/User/StorableUser';
import UserType from 'src/model/User/UserType';

const SignUp = ({}: {}): JSX.Element => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [preferredLanguage, setPreferredLanguage] =
    useState<PreferredLanguage.Type>(PreferredLanguage.ENGLISH);
  const [userType, setUserType] = useState<UserType.Type>(UserType.USER);

  // TODO
  // Checks if the current input fits constraints
  function isAllInputValid(): boolean {
    return true;
  }

  const onSubmit: React.MouseEventHandler<HTMLInputElement> = () => {
    if (!authContext) {
      return;
    }

    if (!isAllInputValid()) {
      // TODO
      return;
    }

    const newUserData: StorableUser = {
      firstName,
      lastName,
      email,
      type: userType,
      preferredLanguage,
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
        <h1 className="font-bold text-xl">Sign Up!</h1>
        <Input
          type="text"
          name="firstName"
          placeholder="First name"
          required
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last name"
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
        <fieldset className="flex flex-col gap-2">
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
        </fieldset>
        <Input
          type="text"
          name="email"
          placeholder="Preferred email address"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Input
          type="password"
          name="confirmedPassword"
          placeholder="Confirm password"
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
