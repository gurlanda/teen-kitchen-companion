import React from 'react';

const TextInput = ({
  title,
  placeholder,
  value,
  onStateChange,
  onBlur,
  type,
  id,
}) => {
  return (
    <div className='mb-5'>
      <label className='block font-bold mb-3 text-gray-800'>{title}</label>
      <div className='mb-3'>
        <input
          type={type ? type : 'text'}
          name=''
          id={id ? id : undefined}
          className='px-3 py-2 border border-gray-300 hover:border-gray-400 rounded-md w-full focus:outline-blue-400'
          value={value}
          placeholder={placeholder ? placeholder : undefined}
          onChange={onStateChange}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
};

export default TextInput;
