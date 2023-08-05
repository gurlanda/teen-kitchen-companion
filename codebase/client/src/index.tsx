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
import SignIn from './components/pages/auth/SignIn';
import Menu from './components/pages/Menu/Menu';
import TeenStories from './components/pages/TeenStories/TeenStories';
import Volunteer from './components/pages/Volunteer/Volunteer';
import NotFound from './components/pages/NotFound';
import SignUp, { action as signUpAction } from './components/pages/auth/SignUp';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/volunteer" element={<Volunteer />} />
      <Route path="/contact" element={<ContactUs />} />
      <Route path="/sign-up" element={<SignUp />} action={signUpAction} />
      <Route path="/stories" element={<TeenStories />} />
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
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
