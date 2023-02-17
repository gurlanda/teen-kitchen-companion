import React from 'react';

const TextAreaInput = ({
  title,
  rows,
  value,
  placeholder,
  onStateChange,
  onBlur,
}) => {
  return (
    <div className='mb-5'>
      <label className='block font-bold mb-3 text-gray-800'>{title}</label>
      <div className='mb-3'>
        <textarea
          className='px-3 py-2 border border-gray-300 rounded-md w-full hover:border-gray-400 focus:outline-blue-400'
          rows={rows ? rows : '5'}
          value={value ? value : undefined}
          placeholder={placeholder ? placeholder : undefined}
          onChange={onStateChange}
          onBlur={onBlur}
        ></textarea>
      </div>
    </div>
  );
};

export default TextAreaInput;
