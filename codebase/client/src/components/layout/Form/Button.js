import React from 'react';

const Button = ({ children, classNames, type, value, onClick }) => {
  return (
    <div className='mr-3 last:mr-0'>
      <button
        className={`px-4 py-2 border-[1px] rounded-md ${classNames}`}
        type={type ? type : undefined}
        value={value ? value : undefined}
        onClick={onClick ? onClick : undefined}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
