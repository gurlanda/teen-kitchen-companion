import React from 'react';

const OptionGroup = (props) => {
  const { title } = props;
  return (
    <div className='mb-5'>
      <label className='block font-bold mb-1 text-gray-800'>{title}</label>
      {props.children}
    </div>
  );
};

export default OptionGroup;
