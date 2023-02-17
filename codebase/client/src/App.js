import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import './App.css';
import AuthState from './context/auth/AuthState';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import TakeSurvey from './components/pages/TakeSurvey/TakeSurvey';
import SurveySelect from './components/pages/SurveySelect';
import SurveyAdmin from './components/pages/SurveyAdmin';
import SurveyAdminSelect from './components/pages/SurveyAdminSelect';
import NotFound from './components/pages/NotFound';
import Register from './components/pages/auth/Register';
import Login from './components/pages/auth/Login';
import Sandbox from './components/pages/Sandbox';

import Menu from './components/pages/Menu/Menu';
import MenuItem from './components/pages/Menu/MenuItem';
import ContactUs from './components/pages/ContactUs';
import Settings from './components/pages/Settings';
import Volunteer from './components/pages/SignUp/Volunteer';
import SignUp from './components/pages/SignUp/SignUp';
import JournalTemp from './components/pages/FoodJournal/Temp/JournalInputPage';
import JournalSelectTemp from './components/pages/FoodJournal/Temp/FoodJournalSelect';
import JournalTest from './components/pages/FoodJournal/FoodJournalTest';
import TeenStories from './components/pages/TeenStories/TeenStories';

function App() {
  return (
    <div className=''>
      <AuthState>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/survey' component={SurveySelect} />
            <Route exact path='/survey/id/:id' component={TakeSurvey} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/sandbox' component={Sandbox} />
            <Route exact path='/menu' component={Menu} />
            <Route exact path='/menu-item' component={MenuItem} />
            <Route exact path='/volunteer' component={Volunteer} />
            <Route exact path='/contact-us' component={ContactUs} />
            <Route exact path='/settings' component={Settings} />
            <Route exact path='/sign-up' component={SignUp} />
            <Route exact path='/sign-up/:tab' component={SignUp} />
            <Route exact path='/journal/:id' component={JournalTemp} />
            <Route exact path='/journal-select' component={JournalSelectTemp} />
            <Route exact path='/journal-test' component={JournalTest} />
            <Route exact path='/teen-stories' component={TeenStories} />
            <PrivateRoute
              exact
              path='/survey/admin'
              component={SurveyAdminSelect}
            />
            <PrivateRoute
              exact
              path='/survey/admin/id/:id'
              component={SurveyAdmin}
            />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </AuthState>
    </div>
  );
}

export default App;
