import React from 'react';
import Form from '../../layout/Form/Form';
import TextInput from '../../layout/Form/TextInput';

const Register = () => {
  return (
    <div>
      <Form title='Register' description='Register a new admin user.'>
        <TextInput title='Email' />
        <TextInput title='Password' />
        <TextInput title='Confirm password' />
      </Form>
    </div>
  );
};

export default Register;
