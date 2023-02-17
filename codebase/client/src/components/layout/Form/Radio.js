import React from 'react';

const Radio = ({ name, text, value, state, id, onStateChange }) => {
  const onChange = (e) => {
    const affectedOption = e.target.value;

    if (onStateChange) {
      onStateChange(affectedOption);
    }
  };

  return (
    <label
      htmlFor={id ? id : undefined}
      className='text-gray-700 hover:text-gray-900 mb-1 ml-1 cursor-pointer flex'
    >
      <input
        type='radio'
        id={id ? id : undefined}
        name={name ? name : undefined}
        value={value ? value : undefined}
        checked={state ? state : undefined}
        onChange={onStateChange ? onStateChange : undefined}
        className='h-4 w-4 self-center'
      />
      <span className='ml-2'>{text}</span>
    </label>
  );
};

export default Radio;
