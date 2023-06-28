import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthContextState from './context/Auth/AuthContextState';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

const App: React.FC = () => {
  return (
    <div className="h-full">
      <Navbar />
      <AuthContextState>
        <Outlet />
      </AuthContextState>
      <Footer />
    </div>
  );
};

export default App;
