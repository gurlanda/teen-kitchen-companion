import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from 'src/context/User/UserContext';

const UserInfo: React.FC = () => {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const user = userContext?.user!; // If user === undefined, this page won't be accessible

  useEffect(() => {
    if (!userContext) {
      navigate('/');
    }
  }, []);

  return (
    <div className="h-full">
      <div className="flex flex-col gap-5 mt-5 mx-auto w-[min(90vw,80ch)]">
        <h1 className="text-lg font-bold">User Info</h1>
        <span>Name: {`${user.firstName} ${user.lastName}`}</span>
        <span>Email: {user.email}</span>
        <span>User ID: {user.id}</span>
        <span>User type: {user.type}</span>
        <span>Preferred language: {user.preferredLanguage}</span>
      </div>
    </div>
  );
};

export default UserInfo;
