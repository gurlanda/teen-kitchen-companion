import React from 'react';
import createId from '../../../utils/createId';

const SingleCheckboxInput = ({
  title,
  label,
  value,
  id,
  isOnEnd,
  onStateChange,
}) => {
  const iden = id ? id : createId();

  return (
    <div className={`mb-3 ${isOnEnd ? 'self-end' : ''}`}>
      <label className='block font-bold mb-1'>{title}</label>
      <label
        htmlFor={iden}
        className='text-gray-700 hover:text-gray-900 cursor-pointer flex'
      >
        <input
          type='checkbox'
          name=''
          id={iden}
          className='h-4 w-4 self-center cursor-pointer'
          onChange={onStateChange}
          value={id}
          checked={value}
        />
        <span className='ml-2'>{label}</span>
      </label>
    </div>
  );
};

export default SingleCheckboxInput;
