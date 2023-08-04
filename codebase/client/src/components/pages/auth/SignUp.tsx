import React, { useState } from 'react';
import getFirebaseServices, {
  FirebaseServices,
} from 'src/firebase/getFirebaseServices';

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

const SignUp = ({}: {}): JSX.Element => {
  const [firebaseServices, setFirebaseServices] = useState<FirebaseServices>(
    getFirebaseServices()
  );
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmedPassword, setConfirmedPassword] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  // const [preferredLanguage, setPreferredLanguage] =
  // useState<SupportedLanguage>();

  const onSubmit: React.MouseEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    // firebaseServices.createUserWithEmailAndPassword()
  };

  return (
    <div>
      <form className="flex flex-col gap-4 border rounded-xl shadow shadow-gray-300 p-4">
        <h1>Sign Up</h1>
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
          <Input
            type="radio"
            name="preferredLanguage"
            required
            // onChange={() => setPreferredLanguage('english')}
            value={'english'}
          >
            English
          </Input>
          <Input
            type="radio"
            name="preferredLanguage"
            required
            // onChange={() => setPreferredLanguage('spanish')}
            value={'spanish'}
          >
            Español
          </Input>
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
          value={confirmedPassword}
          className="self-end"
        />
      </form>
    </div>
  );
};

export default SignUp;
