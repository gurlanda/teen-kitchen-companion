import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from 'src/context/Auth/AuthContext';

const UserInfo: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!authContext.isSignedIn()) {
      navigate('/');
    }
  }, [authContext]);

  return (
    <div className="h-full">
      <div className="flex flex-col gap-5 mt-5 mx-auto w-[min(90vw,80ch)]">
        <h1 className="text-lg font-bold">User Info</h1>
        <span>
          Name:{' '}
          {`${authContext?.user?.firstName || 'undefined'} ${
            authContext?.user?.lastName || 'undefined'
          }`}
        </span>
        <span>Email: {authContext?.user?.email}</span>
        <span>User ID: {authContext?.user?.id}</span>
        <span>User type: {authContext?.isAdmin ? 'Admin' : 'User'}</span>
        <span>Preferred language: {authContext?.user?.preferredLanguage}</span>
      </div>
    </div>
  );
};

export default UserInfo;
