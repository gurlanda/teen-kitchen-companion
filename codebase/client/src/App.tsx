import React from 'react';
import { Outlet } from 'react-router-dom';
import AuthContextProvider from './context/Auth/AuthContextProvider';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LanguageContextProvider from './context/Language/LanguageContextProvider';
import UserContextProvider from './context/User/UserContextProvider';

const App: React.FC = () => {
  return (
    <div className="h-full text-gray-800">
      <AuthContextProvider>
        <UserContextProvider>
          <LanguageContextProvider>
            <Navbar />
            <Outlet />
            <Footer />
          </LanguageContextProvider>
        </UserContextProvider>
      </AuthContextProvider>
    </div>
  );
};

export default App;
