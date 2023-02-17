import React from 'react';
import { Link } from 'react-router-dom';

const RouterLinkButton = ({ children, classNames, to }) => {
  return (
    <div className='mr-3 last:mr-0'>
      <Link className={`px-4 py-2 block rounded-md ${classNames}`} to={to}>
        {children}
      </Link>
    </div>
  );
};

export default RouterLinkButton;
