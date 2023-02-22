import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import tkpLogo from 'src/assets/img/tkp-logo-horiz.png';

const RouterLinkButton: React.FC<{
  to: string,
  children: ReactNode
}> = ({ to, children }) => {
  return (
    <Link
      className={`block px-4 py-4 rounded-lg text-center tk-acumin-pro-semi-condensed border-gray-400 hover:bg-slate-200 text-cyan-600 bg-white border w-fit`}
      to={to}
    >
      {children}
    </Link>
  );
};

const Volunteer: React.FC = () => {
  return (
    <div>
      {/* Hero */}
      <div className="bg-[url('/src/assets/img/cooks-hero.png')] bg-center bg-no-repeat bg-cover bg-gray-500 bg-blend-multiply h-64 flex flex-col justify-evenly items-center">
        <div className='w-60'>
          <img
            className='w-full h-auto'
            src={tkpLogo}
            alt='Teen Kitchen Project logo'
          />
        </div>
        <h1 className='px-4 w-fit tk-acumin-pro-condensed font-bold text-5xl ms:text-5xl text-white text-center'>
          Would you like to
          <br />
          volunteer?
        </h1>
      </div>
      {/* Content */}
      <div className='mx-4 mt-10 mb-32 sm:mx-auto space-y-6 sm:max-w-lg tk-acumin-pro-semi-condensed text-center'>
        <h1 className='tk-acumin-pro-condensed text-3xl '>
          Volunteering at the Teen Kitchen Project
        </h1>
        <div className=''>
          <p>Volunteers are the heart of our organization.</p>
          <p>
            We continue to be grateful for the myriad of volunteers who support
            our teens and clients.
          </p>
          <p className='font-bold'>
            All volunteers are required to provide proof of COVID 19 Vaccine
            before they may participate in our program.
          </p>
        </div>
        {/* Links */}
        <div className='flex flex-col items-center sm:flex-row sm:justify-around space-y-4 sm:space-y-0 max-w-2xl mx-auto'>
          <div className='space-y-2'>
            <h3 className='text-xl font-bold'>Teens</h3>
            <RouterLinkButton to='/sign-up/teen-cook'>
              Click Here to Learn More!
            </RouterLinkButton>
          </div>
          <div className='space-y-2'>
            <h3 className='text-xl font-bold'>Adults</h3>
            <RouterLinkButton to='/sign-up/delivery-angel'>
              Click Here to Learn More!
            </RouterLinkButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volunteer;
