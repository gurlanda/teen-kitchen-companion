import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import './App.css';
import About from './components/pages/About';
import ContactUs from './components/pages/ContactUs';
import Menu from './components/pages/Menu/Menu';
import MenuItem from './components/pages/Menu/MenuItem';
import NotFound from './components/pages/NotFound';
import Settings from './components/pages/Settings';
import SignUp from './components/pages/SignUp/SignUp';
import Volunteer from './components/pages/SignUp/Volunteer';
import TeenStories from './components/pages/TeenStories/TeenStories';
import Login from './components/pages/auth/Login';
import AuthContextState from './context/Auth/AuthContextState';
import SurveySelect from './components/pages/SurveySelect';
import TakeSurvey from './components/pages/SurveySelect/TakeSurvey/TakeSurvey';
import PrivateRoute from './components/pages/auth/PrivateRoute';
import AdminRoute from './components/pages/auth/AdminRoute';
import SurveyEditLoader from './components/pages/SurveyEdit/SurveyEditLoader';
import SurveyEditSelect from './components/pages/SurveyEdit/SurveyEditSelect';
import JournalSelect from './components/pages/FoodJournal/JournalSelect';
import EntryCreate from './components/pages/FoodJournal/EntryCreate';
import EntryEdit from './components/pages/FoodJournal/EntryEdit';
import JournalAdmin from './components/pages/JournalTemplateEdit/JournalAdmin';
import JTemplateEditLoader from './components/pages/JournalTemplateEdit/JTemplateEditLoader';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <AuthContextState>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/menu-item" element={<MenuItem />} />
          <Route path="/volunteer" element={<Volunteer />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-up/:tab" element={<SignUp />} />
          <Route path="/teen-stories" element={<TeenStories />} />
          <Route
            path="/survey"
            element={<PrivateRoute component={<SurveySelect />} />}
          />
          <Route
            path="/survey/id/:id"
            element={<PrivateRoute component={<TakeSurvey />} />}
          />
          <Route
            path="/journal"
            element={<PrivateRoute component={<JournalSelect />} />}
          />
          <Route
            path="/journal/createEntry/:journalId"
            element={<PrivateRoute component={<EntryCreate />} />}
          />
          <Route
            path="/journal/entry/:entryId"
            element={<PrivateRoute component={<EntryEdit />} />}
          />
          <Route
            path="/journal/admin"
            element={<AdminRoute component={<JournalAdmin />} />}
          />
          <Route
            path="/journal/template"
            element={<AdminRoute component={<JTemplateEditLoader />} />}
          />
          <Route
            path="/survey/admin"
            element={<AdminRoute component={<SurveyEditSelect />} />}
          />
          <Route
            path="/survey/admin/id/:id"
            element={<AdminRoute component={<SurveyEditLoader />} />}
          />
          <Route element={<NotFound />} />
        </Routes>
      </AuthContextState>
    </>
  );
};

export default App;
