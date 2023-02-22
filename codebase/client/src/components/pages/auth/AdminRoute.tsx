import React, { ReactNode, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from 'src/context/Auth/AuthContext';
import UserType from 'src/model/User/UserType';

const AdminRoute: React.FC<{ component: ReactNode }> = ({ component }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (
      !authContext ||
      !authContext.state.isAuthenticated ||
      authContext.state.user?.type !== UserType.ADMIN
    ) {
      navigate('/login');
    }
  }, [authContext?.state.isAuthenticated, authContext?.state.user?.type]);

  return <div>{component}</div>;
};

export default AdminRoute;
