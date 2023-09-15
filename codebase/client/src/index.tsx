import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App';
import About from './components/pages/About';
import ContactUs from './components/pages/ContactUs';
import Home from './components/pages/Home';
import SignIn, { action as signInAction } from './components/pages/auth/SignIn';
import Menu from './components/pages/Menu';
import TeenStories from './components/pages/TeenStories';
import Volunteer from './components/pages/Volunteer';
import NotFound from './components/pages/NotFound';
import SignUp, { action as signUpAction } from './components/pages/auth/SignUp';
import UserInfo from './components/pages/UserInfo';
import MenuEdit from './components/pages/admin/MenuEdit';
import { action as menuEditAction } from 'src/components/pages/admin/MenuEdit/MenuEditForm';
import AddAdmin, {
  action as addAdminAction,
} from './components/pages/admin/AddAdmin';
import Surveys from './components/pages/Surveys';
import Account from './components/pages/Account';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/menus" element={<Menu />} />
      <Route
        path="/edit-menus"
        element={<MenuEdit />}
        action={menuEditAction}
      />
      <Route path="/volunteer" element={<Volunteer />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/stories" element={<TeenStories />} />
      <Route path="/sign-in" element={<SignIn />} action={signInAction} />
      <Route path="/sign-up" element={<SignUp />} action={signUpAction} />
      <Route path="/add-admin" element={<AddAdmin />} action={addAdminAction} />
      <Route path="/user-info" element={<UserInfo />} />
      <Route path="/account" element={<Account />} />
      <Route path="/surveys" element={<Surveys />} />
      <Route errorElement={<NotFound />}></Route>
    </Route>
  )
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
