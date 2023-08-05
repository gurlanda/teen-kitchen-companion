import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from 'src/context/Auth/AuthContext';
import Form from '../../layout/Form/Form';
import TextInput from '../../layout/Form/TextInput';
import Button from '../../layout/Form/Button';
import createId from 'src/utils/createId';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Used to navigate to the admin page upon login
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    console.log(authContext);
    return <>Not loaded</>;
  }

  // const { login } = authContext;
  // const { isAuthenticated } = authContext?.state;
  // if (isAuthenticated) {
  //   navigate('/');
  // }

  const onSubmit = async () => {
    // await login(email, password);
    // if (isAuthenticated) {
    //   navigate('/');
    //   // console.log('Login success');
    // } else {
    //   // console.log('Login error');
    //   // console.log(`isAuthenticated: ${isAuthenticated}`);
    // }
  };

  const onCancel = () => {
    navigate('/');
  };

  // const onLogout = async () => {
  //   await logout();
  //   if (!isAuthenticated) {
  //     console.log('Logout success');
  //   } else {
  //     console.log('Logout error');
  //   }
  // };

  return (
    <div className="h-full max-w-screen-xs mx-auto pb-9 ">
      <Form title="Log In" description="" classNames="h-full w-full">
        <TextInput
          id={createId()}
          title="Email"
          type="email"
          placeholder="Enter your preferred email address"
          onStateChange={setEmail}
        />
        <TextInput
          id={createId()}
          title="Password"
          placeholder="Enter your password"
          type="password"
          onStateChange={setPassword}
        />
        <div className="flex justify-end mb-3">
          <Button
            children="Submit"
            onClick={onSubmit}
            preventDefault
            classNames="bg-cyan-600 hover:bg-cyan-700 text-white"
          />
          <Button children="Cancel" onClick={onCancel} />
        </div>
      </Form>
    </div>
  );
};

export default SignIn;
