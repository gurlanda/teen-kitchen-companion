import React from 'react';

const Form = (props) => {
  const { children, title, description, onSubmit, classNames } = props;

  return (
    <form
      className={`px-6 w-full tk-acumin-pro xs:px-10 ${classNames}`}
      onSubmit={onSubmit ? onSubmit : undefined}
    >
      <h1 className='text-center font-bold text-4xl mb-3 text-gray-800'>
        {title}
      </h1>
      <p className='text-gray-600 mb-5 px-1'>{description}</p>

      {children}
    </form>
  );
};

export default Form;
