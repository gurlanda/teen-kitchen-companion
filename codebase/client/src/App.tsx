import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthContextProvider from './context/Auth/AuthContextProvider';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

const App: React.FC = () => {
  return (
    <div className="h-full">
      <AuthContextProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </AuthContextProvider>
    </div>
  );
};

export default App;
