import React from 'react';

const Checkbox = ({ text, name, value, id, state, onStateChange }) => {
  const onChange = (e) => {
    const affectedOption = e.target.value;
    const newState = e.target.checked;

    if (onStateChange) {
      onStateChange(affectedOption, newState);
    }
  };

  return (
    <div className='mb-1 ml-1'>
      <label
        htmlFor={id ? id : undefined}
        className='text-gray-700 hover:text-gray-900 cursor-pointer flex'
      >
        <input
          type='checkbox'
          name={name ? name : undefined}
          value={value ? value : undefined}
          id={id ? id : undefined}
          checked={state ? state : undefined}
          onChange={onStateChange ? onStateChange : undefined}
          className='h-4 w-4 self-center'
        />
        <span className='ml-2'>{text}</span>
      </label>
    </div>
  );
};

export default Checkbox;
