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
import PromptToVerifyEmail from './components/pages/auth/PromptToVerifyEmail';
import EmailAction from './components/pages/auth/EmailAction';
import SendPasswordResetLink from './components/pages/auth/ResetPassword/SendPasswordResetLink';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const paths = {
  home: '/',
  about: '/about',
  menus: '/menus',
  volunteer: '/volunteer',
  contact: '/contact',
  stories: '/stories',
  surveys: '/surveys',

  admin: {
    editMenus: '/edit-menus',
    addAdmin: '/admin/add-admin',
  },

  userInfo: '/user-info',
  account: '/account',

  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
    afterSignUp: '/auth/sign-up/finished',

    // If you change any of these paths, be sure to change the corresponding links in the email templates.
    // This can be done by going to the Firebase console then navigating to Authentication > Templates
    emailActions: '/auth/action',
    resetPassword: '/auth/reset-password',
  },
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path={paths.about} element={<About />} />
      <Route path={paths.menus} element={<Menu />} />
      <Route
        path={paths.admin.editMenus}
        element={<MenuEdit />}
        action={menuEditAction}
      />
      <Route path={paths.volunteer} element={<Volunteer />} />
      <Route path={paths.contact} element={<ContactUs />} />
      <Route path={paths.stories} element={<TeenStories />} />
      <Route path={paths.surveys} element={<Surveys />} />

      <Route
        path={paths.admin.addAdmin}
        element={<AddAdmin />}
        action={addAdminAction}
      />

      <Route path={paths.userInfo} element={<UserInfo />} />
      <Route path={paths.account} element={<Account />} />

      <Route path={paths.auth.emailActions} element={<EmailAction />} />
      <Route
        path={paths.auth.signIn}
        element={<SignIn />}
        action={signInAction}
      />
      <Route
        path={paths.auth.signUp}
        element={<SignUp />}
        action={signUpAction}
      />
      <Route path={paths.auth.afterSignUp} element={<PromptToVerifyEmail />} />
      <Route
        path={paths.auth.resetPassword}
        element={<SendPasswordResetLink />}
      />

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
