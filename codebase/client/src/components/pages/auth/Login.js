import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import AuthContext from '../../../context/auth/authContext';
import Form from '../../layout/Form/Form';
import TextInput from '../../layout/Form/TextInput';
import Button from '../../layout/Form/Button';

const Login = () => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, login, logout, loadUser } = authContext;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Used to navigate to the admin page upon login
  const history = useHistory();

  const onSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
    if (isAuthenticated) {
      history.push('/survey/admin');
      // console.log('Login success');
    } else {
      // console.log('Login error');
      // console.log(`isAuthenticated: ${isAuthenticated}`);
    }
  };

  const onLoadUser = async (e) => {
    e.preventDefault();
    await loadUser();
  };

  const onCancel = () => {
    history.push('/');
  };

  const onLogout = async (e) => {
    e.preventDefault();
    await logout();
    if (!isAuthenticated) {
      console.log('Logout success');
    } else {
      console.log('Logout error');
    }
  };

  const changeEmail = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  };

  const changePassword = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };

  return isAuthenticated ? (
    <Redirect to='/survey/admin' />
  ) : (
    <div className='h-full max-w-screen-xs mx-auto pb-9 '>
      <Form title='Log In' description='' classNames='h-full w-full'>
        <TextInput title='Email' onStateChange={changeEmail} />
        <TextInput
          title='Password'
          type='password'
          onStateChange={changePassword}
        />
        <div className='flex justify-end mb-3'>
          <Button
            children='Submit'
            onClick={onSubmit}
            classNames='bg-cyan-600 hover:bg-cyan-700 text-white'
          />
          <Button children='Cancel' onClick={onCancel} />
        </div>
      </Form>
    </div>
  );
};

export default Login;
