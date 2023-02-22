import React, { ReactNode, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from 'src/context/Auth/AuthContext';

const PrivateRoute: React.FC<{ component: ReactNode }> = ({ component }) => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (!authContext || !authContext.state.isAuthenticated) {
      navigate('/login');
    }
  }, [authContext, navigate]);

  return <div>{component}</div>;
};

export default PrivateRoute;
