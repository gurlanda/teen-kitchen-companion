import React from 'react';

const LinkButton = ({ children, href }) => {
  return (
    <a
      className='block px-10 py-5 mx-auto tk-acumin-pro-semi-condensed bg-white border-[1px] border-gray-400 hover:bg-slate-200 text-cyan-600 rounded-lg text-center w-fit'
      href={href}
    >
      {children}
    </a>
  );
};

export default LinkButton;
